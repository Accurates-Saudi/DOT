import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient } from "@/generated/prisma/client";

type PrismaGlobal = typeof globalThis & {
  __cmsPrisma__?: PrismaClient;
  __cmsPgPool__?: pg.Pool;
};

const globalForPrisma = globalThis as PrismaGlobal;

function getConnectionString(): string {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for CMS database access.");
  }

  return connectionString;
}

function getOrCreatePgPool(): pg.Pool {
  if (!globalForPrisma.__cmsPgPool__) {
    globalForPrisma.__cmsPgPool__ = new pg.Pool({
      connectionString: getConnectionString(),
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return globalForPrisma.__cmsPgPool__;
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg(getOrCreatePgPool());
  return new PrismaClient({ adapter });
}

function getOrCreatePrismaClient(): PrismaClient {
  if (!globalForPrisma.__cmsPrisma__) {
    globalForPrisma.__cmsPrisma__ = createPrismaClient();
  }

  return globalForPrisma.__cmsPrisma__;
}

/** Shared Prisma client for the entire Node process. */
export const prisma = getOrCreatePrismaClient();

/** @deprecated Import `prisma` instead. */
export function getPrismaClient(): PrismaClient {
  return prisma;
}
