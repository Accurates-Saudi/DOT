import { useNumberFormat } from "@/i18n/hooks";
import { requiresLtrNumericIsolation } from "@/i18n/format-numbers";

import { LocalizedNumeric } from "./LocalizedNumeric";

export interface FormattedNumericTextProps {
  value: string;
  className?: string;
}

/** Localizes digits / phone "+" placement and preserves visual order in RTL. */
export function FormattedNumericText({
  value,
  className,
}: FormattedNumericTextProps) {
  const { formatNumericText } = useNumberFormat();
  const text = formatNumericText(value);

  return (
    <LocalizedNumeric
      className={className}
      isolateLtr={requiresLtrNumericIsolation(text)}
    >
      {text}
    </LocalizedNumeric>
  );
}
