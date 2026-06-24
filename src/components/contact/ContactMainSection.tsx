import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { Container, Section } from "@/components/shared";
import type { ContactMainSectionContent } from "@/types";

export interface ContactMainSectionProps {
  content: ContactMainSectionContent;
}

export function ContactMainSection({ content }: ContactMainSectionProps) {
  return (
    <Section
      id="contact-main"
      padding="lg"
      aria-label="Contact information and inquiry form"
      className="border-b border-[#0c1524]/8 bg-white"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-5">
            <ContactInfo content={content.info} />
          </div>
          <div className="lg:col-span-7">
            <ContactForm content={content.form} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
