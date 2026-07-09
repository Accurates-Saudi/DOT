import { Form } from "react-router";
import { useEffect, useRef, useState } from "react";

import { AdminSurface } from "@/components/admin";
import { generateTemporaryPassword } from "@/lib/generate-temporary-password";
import type { CMSRole } from "@/types";

export type AdminUsersActionData =
  | {
      ok: true;
      intent: "create" | "reset-password";
      userEmail: string;
      userName: string;
      temporaryPassword: string;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: CMSRole;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: string;
}

export function AdminUsersPage({
  users,
  searchValue,
  currentUserId,
  actionData,
}: {
  users: AdminUserRow[];
  searchValue: string;
  currentUserId: string;
  actionData?: AdminUsersActionData;
}) {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData && "ok" in actionData && actionData.ok) {
      setGeneratedPassword("");
    }
  }, [actionData]);

  function handleGeneratePassword() {
    const password = generateTemporaryPassword();
    setGeneratedPassword(password);
    if (passwordInputRef.current) {
      passwordInputRef.current.value = password;
    }
  }

  async function copyTemporaryPassword(password: string) {
    try {
      await navigator.clipboard.writeText(password);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-[0.9375rem] text-[#666]">
        Add CMS users, share temporary passwords, and manage access to the admin dashboard.
      </p>

      {actionData && "ok" in actionData && actionData.ok ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          <p className="font-medium">{actionData.message}</p>
          <p className="mt-2">
            <span className="text-emerald-800">{actionData.userName}</span>{" "}
            <span className="text-emerald-700">({actionData.userEmail})</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code className="rounded bg-white px-3 py-2 font-mono text-[0.8125rem] text-[#111]">
              {actionData.temporaryPassword}
            </code>
            <button
              type="button"
              onClick={() => copyTemporaryPassword(actionData.temporaryPassword)}
              className="rounded-md border border-emerald-300 bg-white px-3 py-1.5 text-sm text-emerald-900"
            >
              Copy password
            </button>
          </div>
        </div>
      ) : null}

      {actionData && "ok" in actionData && !actionData.ok ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <AdminSurface title="Add User" contentClassName="space-y-4">
        <Form method="post" className="grid gap-4 lg:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Full name</span>
            <input
              name="name"
              required
              className="h-10 w-full rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Email</span>
            <input
              type="email"
              name="email"
              required
              className="h-10 w-full rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
          </label>
          <div className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Temporary password</span>
            <div className="flex gap-2">
              <input
                ref={passwordInputRef}
                type="text"
                name="password"
                required
                minLength={12}
                defaultValue={generatedPassword}
                key={generatedPassword || "empty"}
                className="h-10 min-w-0 flex-1 rounded-md border border-[#e5e5e5] px-3 font-mono text-sm outline-none focus:border-[var(--dot-orange)]"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="shrink-0 rounded-md border border-[#e5e5e5] px-3 text-sm text-[#333]"
              >
                Generate
              </button>
            </div>
            <p className="mt-1 text-xs text-[#888]">
              The user will be asked to replace this password on first login.
            </p>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Role</span>
            <select
              name="role"
              defaultValue="editor"
              className="h-10 w-full rounded-md border border-[#e5e5e5] bg-white px-3 text-sm"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div className="lg:col-span-2">
            <button
              type="submit"
              name="intent"
              value="create"
              className="rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white"
            >
              Create User
            </button>
          </div>
        </Form>
      </AdminSurface>

      <AdminSurface contentClassName="p-0">
        <Form method="get" className="border-b border-[#e5e5e5] px-6 py-4">
          <input
            type="search"
            name="q"
            defaultValue={searchValue}
            placeholder="Search users by name or email"
            className="h-10 w-full max-w-md rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
          />
        </Form>

        {users.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[#666]">No CMS users were found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[0.9375rem]">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-left text-sm font-medium text-[#888]">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#e5e5e5] last:border-b-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111]">{user.name}</p>
                      <p className="text-sm text-[#888]">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 capitalize text-[#555]">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex rounded border border-[#e5e5e5] px-2.5 py-1 text-sm capitalize text-[#555]">
                          {user.isActive ? "active" : "inactive"}
                        </span>
                        {user.mustChangePassword ? (
                          <span className="inline-flex rounded border border-amber-200 bg-amber-50 px-2.5 py-1 text-sm text-amber-800">
                            password pending
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#666]">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.id !== currentUserId ? (
                        <div className="flex flex-wrap justify-end gap-2">
                          <Form method="post" className="inline">
                            <input type="hidden" name="userId" value={user.id} />
                            <button
                              type="submit"
                              name="intent"
                              value={user.isActive ? "deactivate" : "activate"}
                              className="rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333]"
                            >
                              {user.isActive ? "Deactivate" : "Activate"}
                            </button>
                          </Form>
                          <Form
                            method="post"
                            className="inline"
                            onSubmit={(event) => {
                              if (
                                !window.confirm(
                                  `Reset the password for ${user.name}? They will need to set a new personal password on next login.`,
                                )
                              ) {
                                event.preventDefault();
                              }
                            }}
                          >
                            <input type="hidden" name="userId" value={user.id} />
                            <button
                              type="submit"
                              name="intent"
                              value="reset-password"
                              className="rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333]"
                            >
                              Reset password
                            </button>
                          </Form>
                          <Form
                            method="post"
                            className="inline"
                            onSubmit={(event) => {
                              if (
                                !window.confirm(
                                  `Delete ${user.name}? This cannot be undone.`,
                                )
                              ) {
                                event.preventDefault();
                              }
                            }}
                          >
                            <input type="hidden" name="userId" value={user.id} />
                            <button
                              type="submit"
                              name="intent"
                              value="delete"
                              className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700"
                            >
                              Delete
                            </button>
                          </Form>
                        </div>
                      ) : (
                        <span className="text-sm text-[#888]">Current user</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminSurface>
    </div>
  );
}
