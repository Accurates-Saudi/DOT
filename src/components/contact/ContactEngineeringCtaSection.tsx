import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ContactEngineeringCtaContent } from "@/types";

export interface ContactEngineeringCtaSectionProps {
  content: ContactEngineeringCtaContent;
}

export function ContactEngineeringCtaSection({
  content,
}: ContactEngineeringCtaSectionProps) {
  const isHashLink = content.ctaPrimary.href.startsWith("#");

  return (
    <Section
      id="contact-engineering-cta"
      padding="none"
      aria-label="Engineering support call to action"
      className="bg-white"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14">
          <div className="flex gap-5 lg:max-w-2xl lg:gap-6">
            <span
              className="w-1 shrink-0 self-stretch bg-[#F68E05]"
              aria-hidden
            />
            <div>
              <h2 className="text-xl font-bold leading-snug text-[#0c1524] sm:text-[1.35rem] lg:text-2xl">
                {content.heading}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#0c1524]/68 sm:text-base">
                {content.body}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="h-12 shrink-0 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)]"
            asChild
          >
            {isHashLink ? (
              <a href={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </a>
            ) : (
              <Link to={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Link>
            )}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
