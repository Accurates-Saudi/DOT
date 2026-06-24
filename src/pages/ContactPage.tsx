import { Container, Section, SectionHeading } from "@/components/shared";
import { contactPageMeta } from "@/data/pages";
import { siteSettings } from "@/data/site";

export function ContactPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={contactPageMeta.title}
          description={contactPageMeta.description}
        />
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-foreground">Email</dt>
            <dd className="text-muted-foreground">{siteSettings.contact.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Phone</dt>
            <dd className="text-muted-foreground">{siteSettings.contact.phone}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Location</dt>
            <dd className="text-muted-foreground">
              {siteSettings.contact.address}, {siteSettings.contact.city},{" "}
              {siteSettings.contact.country}
            </dd>
          </div>
        </dl>
      </Container>
    </Section>
  );
}
