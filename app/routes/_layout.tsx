import { isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "./+types/_layout";
import { MainLayout } from "@/components/layout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { FallbackI18nProvider } from "@/i18n/fallback-provider";

export default function SiteLayout() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <FallbackI18nProvider>
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      </FallbackI18nProvider>
    );
  }

  throw error;
}
