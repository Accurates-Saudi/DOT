import { LogOut } from "lucide-react";
import { Form, useNavigation } from "react-router";

import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formAction?.endsWith("/admin/logout");

  return (
    <Form method="post" action="/admin/logout">
      <Button
        type="submit"
        variant="ghost"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full justify-start rounded-2xl border border-[#0c1524]/8 bg-white px-4 text-[#0c1524] hover:bg-[#f5f6f8]"
      >
        <LogOut className="size-4" />
        {isSubmitting ? "Signing out..." : "Logout"}
      </Button>
    </Form>
  );
}
