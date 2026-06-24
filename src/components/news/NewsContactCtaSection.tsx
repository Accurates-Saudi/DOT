import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsDetailCtaContent } from "@/types";

export interface NewsContactCtaSectionProps {
  content: NewsDetailCtaContent;
}

export function NewsContactCtaSection({ content }: NewsContactCtaSectionProps) {
  return (
    <Section
      id="news-contact-cta"
      padding="none"
      aria-label="Contact call to action"
      className="border-t border-[#0c1524]/8 bg-white"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-9 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-11">
          <div className="flex gap-4 lg:max-w-2xl lg:gap-5">
            <span
              className="w-1 shrink-0 self-stretch bg-[#F68E05]"
              aria-hidden
            />
            <div>
              <h2 className="text-lg font-bold leading-snug text-[#0c1524] sm:text-xl">
                {content.heading}
              </h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-[#0c1524]/65 sm:text-[0.9375rem]">
                {content.body}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="h-11 shrink-0 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-12"
            asChild
          >
            <Link to={content.ctaPrimary.href}>
              {content.ctaPrimary.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
