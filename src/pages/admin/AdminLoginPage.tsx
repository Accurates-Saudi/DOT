import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Form, useActionData, useNavigation, useSearchParams } from "react-router";

import { AdminSurface, AdminTextField } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { siteSettings } from "@/data/site";
import { sanitizeAdminRedirect } from "@/utils/admin-routing";

export function AdminLoginPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<{
    formError?: string;
    email?: string;
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(246,142,5,0.12),_transparent_28%),linear-gradient(180deg,#07111d_0%,#0c1524_52%,#101c2e_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.8)] sm:p-10 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(246,142,5,0.9),transparent)]" />
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--dot-orange)]/30 bg-[var(--dot-orange)]/12 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.18em] text-[var(--dot-orange)] uppercase">
            <ShieldCheck className="size-3.5" />
            Secure admin access
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-sm font-medium tracking-[0.28em] text-white/44 uppercase">
              {siteSettings.companyName}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Industrial-grade CMS control for your next editing workflow.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/64 sm:text-lg">
              This is the first protected CMS surface. Authentication, route guards,
              and the dashboard shell are ready for future products, news,
              certificates, and settings modules.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Secure cookie sessions",
              "Draft and publish ready",
              "Reusable CMS SDK integration",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/12 p-4 text-sm text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <AdminSurface
          className="self-center"
          title="Admin login"
          description="Use your CMS account to access the protected dashboard shell."
          contentClassName="space-y-6"
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
              required
            />

            <AdminTextField
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={actionData?.fieldErrors?.password}
              required
            />

            {actionData?.formError ? (
              <div className="rounded-2xl border border-red-400/30 bg-red-400/8 px-4 py-3 text-sm text-red-200">
                {actionData.formError}
              </div>
            ) : null}

            <Button
              type="submit"
              variant="accent"
              size="xl"
              disabled={isSubmitting}
              className="w-full rounded-2xl"
            >
              <LockKeyhole className="size-4" />
              {isSubmitting ? "Signing in..." : "Sign in"}
              <ArrowRight className="size-4" />
            </Button>
          </Form>
        </AdminSurface>
      </div>
    </main>
  );
}
