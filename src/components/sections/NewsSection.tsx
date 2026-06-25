import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { NewsCarousel } from "@/components/news/NewsCarousel";
import { Container, MapEmbed, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { useScrollReveal } from "@/hooks";
import type { NewsSectionContent } from "@/types";

export interface NewsSectionProps {
  content: NewsSectionContent;
}

export function NewsSection({ content }: NewsSectionProps) {
  const { ref: sectionRef, revealProps } = useScrollReveal();

  return (
    <Section
      id="news"
      padding="section72"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <header ref={sectionRef} className="mx-auto max-w-2xl text-center">
          <h2 {...revealProps(0, "text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]")}>
            {content.heading}{" "}
            <span className="text-[#F68E05]">{content.headingAccent}</span>
          </h2>

          <span
            {...revealProps(80, "mx-auto mt-4 block h-px w-10 bg-[#F68E05]")}
            aria-hidden
          />

          <p {...revealProps(140, "mx-auto mt-4 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/62 sm:text-sm")}>
            {content.description}
          </p>
        </header>

        <div {...revealProps(220)}>
          <NewsCarousel
            articles={content.articles}
            className="mt-8 sm:mt-10"
          />
        </div>

        <div {...revealProps(300, "mt-9 flex justify-center sm:mt-10")}>
          <Button
            variant="accent"
            size="lg"
            className="group h-12 rounded-full px-8 text-[0.9375rem] font-medium sm:h-[3.25rem] sm:px-10"
            asChild
          >
            <Link to={content.viewAll.href}>
              {content.viewAll.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {content.locationMap && (
          <div {...revealProps(380, "mt-12 sm:mt-14")}>
            {content.locationMap.title && (
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[#0c1524]/55 uppercase sm:text-xs">
                  {content.locationMap.title}
                </p>
              </div>
            )}

            <MapEmbed
              embedUrl={content.locationMap.embedUrl}
              title="Dynamic Oil Tools location"
              variant="banner"
              info={content.locationMap}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
