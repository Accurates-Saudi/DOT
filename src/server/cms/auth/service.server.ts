import type { CmsRole } from "@/generated/prisma/client";
import { generateTemporaryPassword } from "@/lib/generate-temporary-password";

import type { CMSAuthSession, CMSRole as CMSRoleDto } from "@/types";

import { prisma } from "../db.server";
import { CmsHttpError } from "../http.server";
import { toCmsUser } from "../serializers.server";
import { hashPassword, verifyPassword } from "./password.server";
import {
  createSessionCookie,
  createSessionToken,
  destroySessionCookie,
  getSessionTokenFromRequest,
  hashSessionToken,
} from "./session.server";

const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const REMEMBER_ME_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

function toPrismaRole(role: CMSRoleDto): CmsRole {
  return role.toUpperCase() as CmsRole;
}

function roleRank(role: CMSRoleDto): number {
  return role === "admin" ? 2 : 1;
}

function hasRequiredRole(userRole: CMSRoleDto, requiredRoles: CMSRoleDto[]): boolean {
  return requiredRoles.some((role) => roleRank(userRole) >= roleRank(role));
}

function resolveSessionTtlMs(rememberMe?: boolean): number {
  return rememberMe ? REMEMBER_ME_SESSION_TTL_MS : DEFAULT_SESSION_TTL_MS;
}

async function countActiveAdmins(excludeUserId?: string): Promise<number> {
  return prisma.cmsUser.count({
    where: {
      role: "ADMIN",
      isActive: true,
      ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
    },
  });
}

async function assertCanDeleteAdmin(userId: string): Promise<void> {
  const user = await prisma.cmsUser.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return;
  }

  const remainingAdmins = await prisma.cmsUser.count({
    where: {
      role: "ADMIN",
      id: { not: userId },
    },
  });

  if (remainingAdmins === 0) {
    throw new CmsHttpError(
      409,
      "last_admin",
      "At least one admin account must remain.",
    );
  }
}

async function assertCanDeactivateAdmin(userId: string): Promise<void> {
  const user = await prisma.cmsUser.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return;
  }

  const remainingAdmins = await countActiveAdmins(userId);
  if (remainingAdmins === 0) {
    throw new CmsHttpError(
      409,
      "last_admin",
      "At least one active admin account must remain.",
    );
  }
}

async function invalidateCmsUserSessions(userId: string): Promise<void> {
  await prisma.cmsSession.deleteMany({ where: { userId } });
}

async function createCmsSessionForUser(input: {
  userId: string;
  user: Parameters<typeof toCmsUser>[0];
  rememberMe?: boolean;
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<{ session: CMSAuthSession; setCookie: string }> {
  const rawToken = createSessionToken();
  const expiresAt = new Date(Date.now() + resolveSessionTtlMs(input.rememberMe));

  await prisma.cmsSession.create({
    data: {
      userId: input.userId,
      tokenHash: hashSessionToken(rawToken),
      expiresAt,
      lastSeenAt: new Date(),
      ...(input.ipAddress ? { ipAddress: input.ipAddress } : {}),
      ...(input.userAgent ? { userAgent: input.userAgent } : {}),
    },
  });

  return {
    session: {
      user: toCmsUser(input.user),
      expiresAt: expiresAt.toISOString(),
    },
    setCookie: createSessionCookie(rawToken, expiresAt),
  };
}

export async function getCmsUserCount(): Promise<number> {
  return prisma.cmsUser.count();
}

export async function hasCmsUsers(): Promise<boolean> {
  return (await getCmsUserCount()) > 0;
}

export async function getCmsAuthSession(
  request: Request,
): Promise<CMSAuthSession | null> {
  const rawToken = getSessionTokenFromRequest(request);
  if (!rawToken) return null;

  const session = await prisma.cmsSession.findUnique({
    where: { tokenHash: hashSessionToken(rawToken) },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.cmsSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  if (!session.user.isActive) {
    return null;
  }

  void prisma.cmsSession.update({
    where: { id: session.id },
    data: { lastSeenAt: new Date() },
  });

  return {
    user: toCmsUser(session.user),
    expiresAt: session.expiresAt.toISOString(),
  };
}

export async function requireCmsAuthSession(
  request: Request,
  allowedRoles: CMSRoleDto[] = ["editor"],
): Promise<CMSAuthSession> {
  const session = await getCmsAuthSession(request);

  if (!session) {
    throw new CmsHttpError(401, "unauthorized", "CMS authentication is required.");
  }

  if (!hasRequiredRole(session.user.role, allowedRoles)) {
    throw new CmsHttpError(
      403,
      "forbidden",
      "You do not have permission to perform this CMS action.",
    );
  }

  return session;
}

export async function loginCmsUser(input: {
  email: string;
  password: string;
  rememberMe?: boolean;
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<{ session: CMSAuthSession; setCookie: string }> {
  const email = input.email.trim().toLowerCase();

  const user = await prisma.cmsUser.findUnique({ where: { email } });

  if (!user || !user.isActive || !verifyPassword(input.password, user.passwordHash)) {
    throw new CmsHttpError(401, "invalid_credentials", "Invalid email or password.");
  }

  return createCmsSessionForUser({
    userId: user.id,
    user,
    rememberMe: input.rememberMe,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });
}

export async function logoutCmsUser(request: Request): Promise<string> {
  const rawToken = getSessionTokenFromRequest(request);

  if (rawToken) {
    await prisma.cmsSession
      .deleteMany({ where: { tokenHash: hashSessionToken(rawToken) } })
      .catch(() => undefined);
  }

  return destroySessionCookie();
}

export async function bootstrapCmsAdmin(input: {
  email: string;
  password: string;
  name: string;
  rememberMe?: boolean;
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<{ session: CMSAuthSession; setCookie: string }> {
  const existingUsers = await getCmsUserCount();

  if (existingUsers > 0) {
    throw new CmsHttpError(
      409,
      "bootstrap_unavailable",
      "Bootstrap admin can only be created when the CMS has no users.",
    );
  }

  if (input.password.length < 12) {
    throw new CmsHttpError(
      400,
      "weak_password",
      "Admin password must be at least 12 characters long.",
    );
  }

  const email = input.email.trim().toLowerCase();
  const user = await prisma.cmsUser.create({
    data: {
      email,
      passwordHash: hashPassword(input.password),
      name: input.name.trim(),
      role: toPrismaRole("admin"),
      isActive: true,
    },
  });

  return loginCmsUser({
    email: user.email,
    password: input.password,
    rememberMe: input.rememberMe,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });
}

export async function createCmsUser(input: {
  email: string;
  password: string;
  name: string;
  role: CMSRoleDto;
}): Promise<ReturnType<typeof toCmsUser>> {
  if (input.password.length < 12) {
    throw new CmsHttpError(
      400,
      "weak_password",
      "Password must be at least 12 characters long.",
    );
  }

  const email = input.email.trim().toLowerCase();
  const existing = await prisma.cmsUser.findUnique({ where: { email } });

  if (existing) {
    throw new CmsHttpError(409, "user_exists", "A CMS user with this email already exists.");
  }

  const user = await prisma.cmsUser.create({
    data: {
      email,
      passwordHash: hashPassword(input.password),
      name: input.name.trim(),
      role: toPrismaRole(input.role),
      isActive: true,
      mustChangePassword: true,
    },
  });

  return toCmsUser(user);
}

export async function changeOwnCmsPassword(input: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}): Promise<ReturnType<typeof toCmsUser>> {
  if (input.newPassword.length < 12) {
    throw new CmsHttpError(
      400,
      "weak_password",
      "Password must be at least 12 characters long.",
    );
  }

  if (input.currentPassword === input.newPassword) {
    throw new CmsHttpError(
      400,
      "same_password",
      "Choose a new password that is different from your current one.",
    );
  }

  const user = await prisma.cmsUser.findUnique({ where: { id: input.userId } });

  if (!user || !user.isActive) {
    throw new CmsHttpError(401, "unauthorized", "CMS authentication is required.");
  }

  if (!verifyPassword(input.currentPassword, user.passwordHash)) {
    throw new CmsHttpError(400, "invalid_password", "Current password is incorrect.");
  }

  const updated = await prisma.cmsUser.update({
    where: { id: input.userId },
    data: {
      passwordHash: hashPassword(input.newPassword),
      mustChangePassword: false,
    },
  });

  return toCmsUser(updated);
}

export async function resetCmsUserPasswordByAdmin(input: {
  userId: string;
  password?: string;
}): Promise<{ user: ReturnType<typeof toCmsUser>; temporaryPassword: string }> {
  const temporaryPassword = input.password?.trim() || generateTemporaryPassword();
  if (temporaryPassword.length < 12) {
    throw new CmsHttpError(
      400,
      "weak_password",
      "Password must be at least 12 characters long.",
    );
  }

  const user = await prisma.cmsUser.update({
    where: { id: input.userId },
    data: {
      passwordHash: hashPassword(temporaryPassword),
      mustChangePassword: true,
    },
  });

  await invalidateCmsUserSessions(input.userId);

  return {
    user: toCmsUser(user),
    temporaryPassword,
  };
}

export async function deleteCmsUser(input: {
  userId: string;
  actorId: string;
}): Promise<void> {
  if (input.userId === input.actorId) {
    throw new CmsHttpError(400, "self_delete", "You cannot delete your own account.");
  }

  await assertCanDeleteAdmin(input.userId);

  await prisma.cmsUser.delete({ where: { id: input.userId } });
}

export async function setCmsUserActive(input: {
  userId: string;
  isActive: boolean;
}): Promise<ReturnType<typeof toCmsUser>> {
  if (!input.isActive) {
    await assertCanDeactivateAdmin(input.userId);
  }

  const user = await prisma.cmsUser.update({
    where: { id: input.userId },
    data: { isActive: input.isActive },
  });

  if (!input.isActive) {
    await invalidateCmsUserSessions(input.userId);
  }

  return toCmsUser(user);
}
