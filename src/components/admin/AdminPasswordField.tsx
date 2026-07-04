import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, useState } from "react";

import { cn } from "@/lib/utils";

import { AdminTextField } from "./AdminTextField";

interface AdminPasswordFieldProps extends Omit<
  ComponentProps<typeof AdminTextField>,
  "type" | "inputClassName"
> {}

export function AdminPasswordField(props: AdminPasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <AdminTextField
        {...props}
        type={visible ? "text" : "password"}
        inputClassName="pr-12"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className={cn(
          "absolute top-[2.15rem] right-3 inline-flex size-7 items-center justify-center rounded-full text-[#0c1524]/45 transition hover:bg-[#0c1524]/5 hover:text-[#0c1524]",
          props.tone === "dark" &&
            "text-white/45 hover:bg-white/10 hover:text-white",
        )}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
