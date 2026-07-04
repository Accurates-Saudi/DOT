import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AdminFieldGroup({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-[#e5e5e5] bg-white">
      <header className="border-b border-[#e5e5e5] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#111]">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-[#666]">{description}</p>
        ) : null}
      </header>
      <div className="space-y-4 px-5 py-4">{children}</div>
    </section>
  );
}

export function AdminField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="block text-sm font-medium text-[#333]">{label}</span>
      {children}
      {hint ? <span className="block text-sm text-[#888]">{hint}</span> : null}
    </label>
  );
}

export function AdminInput(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-[#e5e5e5] bg-white px-3 text-sm text-[#111] outline-none transition placeholder:text-[#aaa] focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]",
        props.className,
      )}
    />
  );
}

export function AdminTextarea(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#111] outline-none transition placeholder:text-[#aaa] focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]",
        props.className,
      )}
    />
  );
}

export function AdminStringListEditor({
  label,
  values,
  onChange,
  addLabel = "Add item",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#333]">{label}</p>
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <AdminInput
            value={value}
            onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className="shrink-0 rounded-md border border-[#e5e5e5] px-3 text-sm text-[#666] hover:border-[#d4d4d4]"
            onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
        onClick={() => onChange([...values, ""])}
      >
        {addLabel}
      </button>
    </div>
  );
}
