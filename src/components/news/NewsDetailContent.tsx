import type { ContentValue } from "@/types";

export interface NewsDetailContentProps {
  paragraphs: ContentValue<string>[];
}

export function NewsDetailContent({ paragraphs }: NewsDetailContentProps) {
  return (
    <div className="mt-7 space-y-4 sm:mt-8">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-[0.9375rem] leading-[1.75] text-[#0c1524]/72 sm:text-base"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
