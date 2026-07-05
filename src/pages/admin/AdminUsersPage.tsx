import { Form } from "react-router";

import { AdminSurface } from "@/components/admin";
import type { CMSRole } from "@/types";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: CMSRole;
  isActive: boolean;
  createdAt: string;
}

export function AdminUsersPage({
  users,
  searchValue,
  currentUserId,
}: {
  users: AdminUserRow[];
  searchValue: string;
  currentUserId: string;
}) {
  return (
    <div className="space-y-5">
      <p className="text-[0.9375rem] text-[#666]">
        Add CMS users and manage who can access the admin dashboard.
      </p>

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
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Password</span>
            <input
              type="password"
              name="password"
              required
              minLength={12}
              className="h-10 w-full rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
          </label>
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
                  <th className="px-6 py-4 text-right">Action</th>
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
                      <span className="inline-flex rounded border border-[#e5e5e5] px-2.5 py-1 text-sm capitalize text-[#555]">
                        {user.isActive ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#666]">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.id !== currentUserId ? (
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
