import { FeedbackForm } from "./FeedbackForm";
import { Container, Section } from "@/components/shared";
import type { ContactFeedbackSectionContent } from "@/types";

export interface ContactFeedbackSectionProps {
  content: ContactFeedbackSectionContent;
}

export function ContactFeedbackSection({ content }: ContactFeedbackSectionProps) {
  return (
    <Section
      id="contact-feedback"
      padding="lg"
      aria-label="Website feedback"
      className="border-b border-[#0c1524]/8 bg-[#fafafa]"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#0c1524] sm:text-2xl">
            {content.heading}
          </h2>

          <div className="mt-8">
            <FeedbackForm content={content.form} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
