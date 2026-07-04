import { ArrowRight, LockKeyhole } from "lucide-react";
import { Form, useActionData, useNavigation, useSearchParams } from "react-router";

import {
  AdminAuthLayout,
  AdminCheckboxField,
  AdminPasswordField,
  AdminTextField,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { sanitizeAdminRedirect } from "@/utils/admin-routing";

export function AdminLoginPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<{
    formError?: string;
    email?: string;
    rememberMe?: boolean;
    redirectTo?: string;
    fieldErrors?: {
      email?: string;
      password?: string;
    };
  }>();
  const navigation = useNavigation();
  const redirectTo = sanitizeAdminRedirect(
    actionData?.redirectTo ?? searchParams.get("redirectTo"),
  );
  const isSubmitting =
    navigation.state === "submitting" && navigation.formMethod === "POST";

  return (
    <AdminAuthLayout
      badge="Secure CMS Access"
      title="Sign in to the Dynamic Oil Tools CMS"
      description="Use your database-backed CMS account to access the protected admin workspace."
      asideTitle="Industrial content operations, secured for production."
      asideDescription="The CMS authentication flow uses hashed passwords, signed HTTP-only sessions, and server-side route protection across the entire admin area."
      helperItems={[
        "Password hashes are stored in the database, never plain text.",
        "Admin routes automatically re-check the session on every server request.",
        "The first-time setup flow is locked after the initial administrator is created.",
      ]}
    >
      <Form method="post" className="space-y-5">
            <input type="hidden" name="redirectTo" value={redirectTo} />
        <AdminTextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="admin@dynamicoiltools.com"
          defaultValue={actionData?.email ?? ""}
          error={actionData?.fieldErrors?.email}
          tone="light"
          required
        />

        <AdminPasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={actionData?.fieldErrors?.password}
          tone="light"
          required
        />

        <AdminCheckboxField
          name="rememberMe"
          value="true"
          defaultChecked={actionData?.rememberMe ?? false}
          label="Remember me"
          hint="Keep this device signed in for longer using an extended secure session."
        />

        {actionData?.formError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionData.formError}
          </div>
        ) : null}

        <Button
          type="submit"
          variant="accent"
          size="xl"
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl"
        >
          <LockKeyhole className="size-4" />
          {isSubmitting ? "Signing in..." : "Sign in"}
          <ArrowRight className="size-4" />
        </Button>
      </Form>
    </AdminAuthLayout>
  );
}
