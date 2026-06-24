export function EngineerIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="40" cy="24" r="14" stroke="#0c1524" strokeWidth="1.5" />
      <path
        d="M28 20c2-6 8-8 12-8s10 2 12 8"
        stroke="#0c1524"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="24" y="12" width="32" height="8" rx="2" stroke="#0c1524" strokeWidth="1.5" />
      <path
        d="M30 24h20M34 28h12"
        stroke="#0c1524"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 52c0-10 8-16 18-16s18 6 18 16v18H22V52Z"
        stroke="#0c1524"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 70v18M48 70v18M26 88h28"
        stroke="#0c1524"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 58h8M56 58h8"
        stroke="#0c1524"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
