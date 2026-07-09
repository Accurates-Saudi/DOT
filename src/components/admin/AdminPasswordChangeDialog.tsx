import { Form, useActionData, useNavigation } from "react-router";
import { useId, useState } from "react";

import { AdminPasswordField } from "./AdminPasswordField";

interface AdminPasswordChangeDialogProps {
  userEmail: string;
}

export function AdminPasswordChangeDialog({ userEmail }: AdminPasswordChangeDialogProps) {
  const titleId = useId();
  const navigation = useNavigation();
  const actionData = useActionData<{
    formError?: string;
    fieldErrors?: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    };
  }>();
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#111]/45" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg rounded-md border border-[#e5e5e5] bg-white shadow-xl"
      >
        <div className="border-b border-[#e5e5e5] px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-[#111]">
            Set your personal password
          </h2>
          <p className="mt-1 text-sm text-[#666]">
            You signed in with a temporary password for <span className="font-medium">{userEmail}</span>.
            Choose your own password to continue using the CMS.
          </p>
        </div>

        <Form method="post" action="/admin" className="space-y-4 px-5 py-4">
          <input type="hidden" name="intent" value="change-password" />

          <AdminPasswordField
            name="currentPassword"
            label="Current password"
            required
            autoComplete="current-password"
            error={actionData?.fieldErrors?.currentPassword}
          />

          <AdminPasswordField
            name="newPassword"
            label="New password"
            required
            minLength={12}
            autoComplete="new-password"
            error={actionData?.fieldErrors?.newPassword}
          />

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#333]">Confirm new password</span>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={12}
              autoComplete="new-password"
              className="h-10 w-full rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
            {actionData?.fieldErrors?.confirmPassword ? (
              <span className="mt-1 block text-sm text-red-600">
                {actionData.fieldErrors.confirmPassword}
              </span>
            ) : null}
          </label>

          {actionData?.formError ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {actionData.formError}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 border-t border-[#e5e5e5] pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save password"}
            </button>
          </div>
        </Form>

        <div className="border-t border-[#e5e5e5] px-5 py-3">
          <Form method="post" action="/admin/logout">
            <button
              type="submit"
              className="text-sm text-[#666] underline-offset-2 hover:underline"
            >
              Sign out instead
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
