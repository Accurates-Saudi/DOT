import type { SpecificationRow } from "@/types";
import { cn } from "@/lib/utils";

export interface SpecificationTableProps {
  rows: SpecificationRow[];
  className?: string;
}

export function SpecificationTable({ rows, className }: SpecificationTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={cn(
                index !== rows.length - 1 && "border-b border-[#0c1524]/8",
              )}
            >
              <th
                scope="row"
                className="w-[38%] px-5 py-4 text-[0.8125rem] font-semibold text-[#0c1524] sm:px-6 sm:py-4"
              >
                {row.label}
              </th>
              <td className="px-5 py-4 text-[0.8125rem] leading-relaxed text-[#0c1524]/68 sm:px-6 sm:py-4">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
