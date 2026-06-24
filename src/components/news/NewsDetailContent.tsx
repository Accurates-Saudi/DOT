import type { ContentValue } from "@/types";

export interface NewsDetailContentProps {
  paragraphs: ContentValue<string>[];
}

export function NewsDetailContent({ paragraphs }: NewsDetailContentProps) {
  return (
    <div className="mt-6 space-y-4 sm:mt-7">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-[0.9375rem] leading-relaxed text-[#0c1524]/68 sm:text-base"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
