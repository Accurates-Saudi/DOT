import { LogOut } from "lucide-react";
import { Form, useNavigation } from "react-router";

export function AdminLogoutButton() {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" &&
    navigation.formAction?.endsWith("/admin/logout");

  return (
    <Form method="post" action="/admin/logout">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-[#555] transition hover:bg-[#f8f8f8] hover:text-[#111] disabled:opacity-60"
      >
        <LogOut className="size-4 shrink-0" />
        {isSubmitting ? "Signing out..." : "Logout"}
      </button>
    </Form>
  );
}
