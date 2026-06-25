import { Container, Section } from "@/components/shared";
import { useScrollReveal } from "@/hooks";
import type { TrustedPartnersSectionContent } from "@/types";

import { ClientLogoMarquee } from "./ClientLogoMarquee";

export interface TrustedPartnersSectionProps {
  content: TrustedPartnersSectionContent;
}

export function TrustedPartnersSection({
  content,
}: TrustedPartnersSectionProps) {
  const { ref: sectionRef, isVisible, revealProps } = useScrollReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <Section
      id="trusted-partners"
      padding="section80"
      variant="default"
      aria-label="Trusted partners"
      className="relative overflow-hidden border-t border-[#0c1524]/[0.06] bg-[#f9f8f7]"
    >
      <TrustedPartnersBackground />

      <Container size="wide" className="relative">
        <p className="sr-only">
          Partners include {content.logos.map((logo) => logo.name).join(", ")}.
        </p>

        <div ref={sectionRef} className="mx-auto max-w-3xl text-center">
          <div {...revealProps(0, "flex items-center justify-center gap-3")}>
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          </div>

          <h2
            {...revealProps(
              80,
              "mt-5 text-[1.75rem] font-semibold tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.35rem] lg:leading-[1.12]",
            )}
          >
            {content.heading}
          </h2>

          <p
            {...revealProps(
              160,
              "mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-[#0c1524]/68 sm:mt-5 sm:text-base lg:text-[1.0625rem]",
            )}
          >
            {content.description}
          </p>
        </div>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <ClientLogoMarquee
            logos={content.logos}
            isVisible={isVisible}
            durationMs={content.marqueeDurationMs}
          />
        </div>
      </Container>
    </Section>
  );
}

function TrustedPartnersBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f9f8f7_42%,#f7f6f4_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(12,21,36,0.028),transparent_68%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,21,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,21,36,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
