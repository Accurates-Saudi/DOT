import { data, redirect } from "react-router";

import type { Route } from "./+types/admin.setup";
import { AdminSetupPage } from "@/pages/admin";
import { getCmsAdminAccessState } from "@/server/cms/auth/admin-access.server";
import {
  bootstrapCmsAdmin,
} from "@/server/cms/auth/service.server";
import { CmsHttpError } from "@/server/cms/http.server";
import { getRequestMetadata } from "@/server/cms/request.server";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function loader({ request }: Route.LoaderArgs) {
  const { requiresSetup, session } = await getCmsAdminAccessState(request);

  if (!requiresSetup) {
    throw redirect(session ? "/admin" : "/admin/login");
  }

  return {
    isDevelopment: process.env.NODE_ENV !== "production",
  };
}

export async function action({ request }: Route.ActionArgs) {
  const { requiresSetup } = await getCmsAdminAccessState(request);

  if (!requiresSetup) {
    return redirect("/admin/login");
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldErrors = {
    ...(name ? {} : { name: "Full name is required." }),
    ...(email ? {} : { email: "Email is required." }),
    ...(email && isValidEmail(email) ? {} : email ? { email: "Enter a valid email address." } : {}),
    ...(password ? {} : { password: "Password is required." }),
    ...(password.length >= 12
      ? {}
      : password
        ? { password: "Password must be at least 12 characters long." }
        : {}),
    ...(confirmPassword ? {} : { confirmPassword: "Please confirm the password." }),
    ...(password === confirmPassword
      ? {}
      : confirmPassword
        ? { confirmPassword: "Passwords do not match." }
        : {}),
  };

  if (Object.keys(fieldErrors).length > 0) {
    return data(
      {
        fieldErrors,
        values: {
          name,
          email,
        },
      },
      { status: 400 },
    );
  }

  try {
    const metadata = getRequestMetadata(request);
    const result = await bootstrapCmsAdmin({
      name,
      email,
      password,
      rememberMe: true,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });

    return redirect("/admin", {
      status: 303,
      headers: { "Set-Cookie": result.setCookie },
    });
  } catch (error) {
    if (error instanceof CmsHttpError) {
      if (error.status === 409) {
        return redirect("/admin/login");
      }

      return data(
        {
          formError: error.message,
          values: {
            name,
            email,
          },
        },
        { status: error.status },
      );
    }

    throw error;
  }
}

export default function AdminSetupRoute({ loaderData }: Route.ComponentProps) {
  return <AdminSetupPage isDevelopment={loaderData.isDevelopment} />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Setup | Dynamic Oil Tools" },
];
