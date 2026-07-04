import { ArrowRight, ShieldCheck } from "lucide-react";
import { Form, useActionData, useNavigation } from "react-router";

import {
  AdminAuthLayout,
  AdminPasswordField,
  AdminTextField,
} from "@/components/admin";
import { Button } from "@/components/ui/button";

export function AdminSetupPage({
  isDevelopment,
}: {
  isDevelopment: boolean;
}) {
  const actionData = useActionData<{
    formError?: string;
    values?: {
      name?: string;
      email?: string;
    };
    fieldErrors?: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    };
  }>();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" && navigation.formMethod === "POST";

  return (
    <AdminAuthLayout
      badge="Initial Administrator Setup"
      title="Create the first CMS administrator"
      description="This setup screen is only available while the CMS users table is empty."
      helperItems={[
        "Only shown when the CMS has no users.",
        "The first account is always created with the Admin role.",
      ]}
      notice={
        isDevelopment ? (
          <div className="rounded-2xl border border-[var(--dot-orange)]/20 bg-[var(--dot-orange)]/[0.08] px-4 py-3 text-sm leading-6 text-[#8a4a00]">
            Development mode detected. This is the initial administrator setup
            screen because the CMS users table is currently empty.
          </div>
        ) : undefined
      }
    >
      <Form method="post" className="space-y-5">
        <AdminTextField
          label="Full name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Enter administrator name"
          defaultValue={actionData?.values?.name ?? ""}
          error={actionData?.fieldErrors?.name}
          tone="light"
          required
        />

        <AdminTextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="admin@dynamicoiltools.com"
          defaultValue={actionData?.values?.email ?? ""}
          error={actionData?.fieldErrors?.email}
          tone="light"
          required
        />

        <AdminPasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a secure password"
          hint="Use at least 12 characters for the first administrator account."
          error={actionData?.fieldErrors?.password}
          tone="light"
          required
        />

        <AdminPasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter the password"
          error={actionData?.fieldErrors?.confirmPassword}
          tone="light"
          required
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
          <ShieldCheck className="size-4" />
          {isSubmitting ? "Creating administrator..." : "Create administrator"}
          <ArrowRight className="size-4" />
        </Button>
      </Form>
    </AdminAuthLayout>
  );
}
