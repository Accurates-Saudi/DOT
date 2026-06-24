import { isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "./+types/_layout";
import { MainLayout } from "@/components/layout";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function SiteLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    );
  }

  throw error;
}
