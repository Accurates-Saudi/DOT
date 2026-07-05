import type { ReactNode } from "react";

export function CmsPanelField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#0c1524]/52 uppercase">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#0c1524]/10 bg-white px-3.5 text-sm text-[#0c1524] shadow-[0_10px_24px_-18px_rgba(12,21,36,0.18)] outline-none transition focus:border-[var(--dot-orange)] focus:ring-4 focus:ring-[color:rgba(246,142,5,0.12)]"
      />
    </label>
  );
}

export function CmsPanelTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#0c1524]/52 uppercase">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#0c1524]/10 bg-white px-3.5 py-3 text-sm leading-6 text-[#0c1524] shadow-[0_10px_24px_-18px_rgba(12,21,36,0.18)] outline-none transition focus:border-[var(--dot-orange)] focus:ring-4 focus:ring-[color:rgba(246,142,5,0.12)]"
      />
    </label>
  );
}

export function CmsPanelCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] p-4">
      <p className="text-sm font-semibold text-[#0c1524]">{title}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export function CmsPanelStringList({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <CmsPanelCard title={label}>
      {values.map((value, index) => (
        <CmsPanelTextarea
          key={`${label}-${index}`}
          label={`${label} ${index + 1}`}
          value={value}
          onChange={(nextValue) => {
            const next = [...values];
            next[index] = nextValue;
            onChange(next);
          }}
          rows={3}
        />
      ))}
    </CmsPanelCard>
  );
}
