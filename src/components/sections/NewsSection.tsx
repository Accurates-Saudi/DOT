import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { NewsCarousel } from "@/components/news/NewsCarousel";
import { Container, MapEmbed, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsSectionContent } from "@/types";

export interface NewsSectionProps {
  content: NewsSectionContent;
}

export function NewsSection({ content }: NewsSectionProps) {
  return (
    <Section
      id="news"
      padding="section72"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]">
            {content.heading}{" "}
            <span className="text-[#F68E05]">{content.headingAccent}</span>
          </h2>

          <span
            className="mx-auto mt-4 block h-px w-10 bg-[#F68E05]"
            aria-hidden
          />

          <p className="mx-auto mt-4 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/62 sm:text-sm">
            {content.description}
          </p>
        </header>

        <NewsCarousel
          articles={content.articles}
          className="mt-8 sm:mt-10"
        />

        <div className="mt-9 flex justify-center sm:mt-10">
          <Button
            size="lg"
            className="group h-12 rounded-full border-transparent bg-[#F68E05] px-8 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-[3.25rem] sm:px-10"
            asChild
          >
            <Link to={content.viewAll.href}>
              {content.viewAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {content.locationMap && (
          <div className="mt-12 sm:mt-14">
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
            />

            <p className="mt-4 text-center">
              <a
                href={content.locationMap.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] font-medium text-[#0c1524]/65 transition-colors duration-200 hover:text-[#F68E05] sm:text-sm"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
