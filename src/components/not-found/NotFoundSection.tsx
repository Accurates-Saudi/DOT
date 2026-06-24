import {
  ArrowRight,
  BookOpen,
  Building2,
  Mail,
  Package,
  Phone,
} from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NotFoundPageContent, NotFoundQuickLink } from "@/types";
import { cn } from "@/lib/utils";

const quickLinkIcons = {
  products: Package,
  about: Building2,
  catalogs: BookOpen,
  contact: Mail,
} as const;

export interface NotFoundSectionProps {
  content: NotFoundPageContent;
}

function QuickLinkCard({ link }: { link: NotFoundQuickLink }) {
  const Icon = quickLinkIcons[link.icon];

  return (
    <Link
      to={link.href}
      className="group flex h-full flex-col rounded-sm border border-[#0c1524]/10 bg-white p-5 shadow-[0_1px_3px_rgba(12,21,36,0.04)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#F68E05]/30 hover:shadow-[0_8px_24px_-12px_rgba(12,21,36,0.12)] sm:p-6"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-sm bg-[#0c1524]/5 text-[#0c1524] transition-colors duration-300 group-hover:bg-[#F68E05]/10 group-hover:text-[#F68E05]">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-base font-bold text-[#0c1524] sm:text-[1.0625rem]">
        {link.label}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#0c1524]/60">
        {link.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.08em] text-[#F68E05] uppercase">
        View
        <ArrowRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function NotFoundSection({ content }: NotFoundSectionProps) {
  return (
    <>
      <Section
        id="not-found-hero"
        padding="none"
        aria-label="Page not found"
        className="relative overflow-hidden border-b border-[#0c1524]/10 bg-[#0c1524]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F68E05]/8 via-transparent to-[#0c1524]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[clamp(8rem,22vw,16rem)] font-bold leading-none tracking-tighter text-white/[0.03]"
          aria-hidden
        >
          404
        </div>

        <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-16 sm:py-20 lg:py-24">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <p
              className="mt-6 text-[clamp(4.5rem,14vw,7.5rem)] font-bold leading-none tracking-tight text-white/90"
              aria-hidden
            >
              404
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)]"
                asChild
              >
                <Link to={content.ctaPrimary.href}>
                  {content.ctaPrimary.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "h-12 rounded-sm border-white/20 bg-transparent px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase",
                  "hover:border-white/35 hover:bg-white/8 hover:text-white",
                )}
                asChild
              >
                <Link to={content.ctaSecondary.href}>
                  {content.ctaSecondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="not-found-links"
        variant="muted"
        padding="md"
        aria-label="Helpful links"
        className="border-b border-border"
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <h2 className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
                {content.quickLinksHeading}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.quickLinks.map((link) => (
                <QuickLinkCard key={link.id} link={link} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="not-found-support"
        padding="none"
        aria-label="Support contact"
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
                  {content.supportHeading}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#0c1524]/68 sm:text-base">
                  {content.supportBody}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-[#0c1524]/15 bg-white px-6 text-[0.8125rem] font-bold tracking-[0.06em] text-[#0c1524] uppercase hover:border-[#0c1524]/25 hover:bg-[#0c1524]/[0.03]"
                asChild
              >
                <a href={content.supportPhone.href}>
                  <Phone className="size-4" aria-hidden />
                  {content.supportPhone.label}
                </a>
              </Button>
              <Button
                size="lg"
                className="h-12 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)]"
                asChild
              >
                <a href={content.supportEmail.href}>
                  <Mail className="size-4" aria-hidden />
                  {content.supportEmail.label}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
