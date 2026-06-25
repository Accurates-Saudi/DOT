import { FormattedNumericText } from "@/components/i18n";
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
        "overflow-x-auto rounded-sm border border-[#0c1524]/10",
        className,
      )}
    >
      <table className="w-full min-w-[16rem] border-collapse text-left text-[0.75rem] sm:text-[0.8125rem]">
        <thead>
          <tr className="bg-[#F68E05]">
            <th
              scope="col"
              className="px-4 py-2.5 font-bold tracking-wide text-white uppercase sm:px-5 sm:py-3"
            >
              Specification
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 font-bold tracking-wide text-white uppercase sm:px-5 sm:py-3"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={cn(
                index % 2 === 0 ? "bg-white" : "bg-[#0c1524]/[0.03]",
              )}
            >
              <th
                scope="row"
                className="border-t border-[#0c1524]/8 px-4 py-2.5 font-semibold text-[#0c1524] sm:px-5 sm:py-3"
              >
                <FormattedNumericText value={row.label} />
              </th>
              <td className="border-t border-[#0c1524]/8 px-4 py-2.5 leading-relaxed text-[#0c1524]/70 sm:px-5 sm:py-3">
                <FormattedNumericText value={row.value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
