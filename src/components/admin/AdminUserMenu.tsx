import { ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Form, useNavigation } from "react-router";

import type { CMSUser } from "@/types";
import { cn } from "@/lib/utils";

interface AdminUserMenuProps {
  user: CMSUser;
}

export function AdminUserMenu({ user }: AdminUserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const navigation = useNavigation();
  const isLoggingOut =
    navigation.state === "submitting" &&
    navigation.formAction?.endsWith("/admin/logout");

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3.5 text-sm text-[#333] transition hover:border-[#d4d4d4]"
      >
        <User className="size-3.5 shrink-0 text-[#666]" aria-hidden />
        <span className="max-w-[8rem] truncate">{user.name.split(" ")[0]}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-[#666] transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        id={menuId}
        role="menu"
        className={cn(
          "absolute top-[calc(100%+0.25rem)] right-0 z-50 w-56 overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm transition",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="border-b border-[#e5e5e5] px-3 py-3">
          <p className="truncate text-sm font-medium text-[#111]">{user.name}</p>
          <p className="truncate text-xs text-[#666]">{user.email}</p>
          <p className="mt-1 text-xs capitalize text-[#888]">{user.role}</p>
        </div>
        <Form method="post" action="/admin/logout" role="none">
          <button
            type="submit"
            role="menuitem"
            disabled={isLoggingOut}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-[#555] transition hover:bg-[#f8f8f8] disabled:opacity-60"
          >
            <LogOut className="size-3.5 shrink-0" aria-hidden />
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </Form>
      </div>
    </div>
  );
}
