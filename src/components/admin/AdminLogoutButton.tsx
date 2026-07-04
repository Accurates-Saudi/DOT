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
        className="h-12 w-full justify-start rounded-2xl border border-white/10 bg-white/5 px-4 text-white hover:bg-white/10"
      >
        <LogOut className="size-4" />
        {isSubmitting ? "Signing out..." : "Logout"}
      </Button>
    </Form>
  );
}
