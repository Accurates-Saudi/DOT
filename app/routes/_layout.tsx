import { Outlet } from "react-router";

import { MainLayout } from "@/components/layout";

export default function SiteLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
