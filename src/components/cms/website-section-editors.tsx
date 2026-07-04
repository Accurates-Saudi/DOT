import type {
  AboutPageContent,
  CertificatesSectionContent,
  ContactPageContent,
  HomePageContent,
} from "@/types";

import {
  CmsPanelCard,
  CmsPanelField,
  CmsPanelImageFields,
  CmsPanelStringList,
  CmsPanelTextarea,
  type CmsVisualSectionDefinition,
} from "./CmsVisualEditor";

export function createHomePageSectionEditors(): CmsVisualSectionDefinition<HomePageContent>[] {
  return [
    {
      id: "hero",
      title: "Hero Section",
      description:
        "Control hero slides, calls to action, and background imagery while the live website remains visible.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          {page.hero.slides.map((slide, index) => (
            <CmsPanelCard key={`hero-slide-${index}`} title={`Slide ${index + 1}`}>
              <CmsPanelField
                label="Eyebrow"
                value={slide.label}
                onChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "label"], value)
                }
              />
              <CmsPanelField
                label="Title"
                value={slide.headline}
                onChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "headline"], value)
                }
              />
              <CmsPanelField
                label="Accent"
                value={slide.headlineAccent}
                onChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "headlineAccent"], value)
                }
              />
              <CmsPanelTextarea
                label="Subtitle"
                value={slide.subheadline}
                onChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "subheadline"], value)
                }
                rows={3}
              />
              <CmsPanelField
                label="Primary button text"
                value={slide.ctaPrimary.label}
                onChange={(value) =>
                  setValueAtPath(
                    ["hero", "slides", index, "ctaPrimary", "label"],
                    value,
                  )
                }
              />
              <CmsPanelField
                label="Primary button link"
                value={slide.ctaPrimary.href}
                onChange={(value) =>
                  setValueAtPath(
                    ["hero", "slides", index, "ctaPrimary", "href"],
                    value,
                  )
                }
              />
              <CmsPanelImageFields
                label="Background image"
                src={slide.background.src}
                alt={slide.background.alt}
                onSrcChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "background", "src"], value)
                }
                onAltChange={(value) =>
                  setValueAtPath(["hero", "slides", index, "background", "alt"], value)
                }
              />
            </CmsPanelCard>
          ))}
        </>
      ),
    },
    {
      id: "about",
      title: "Who We Are",
      description:
        "Update the positioning copy, supporting narrative, and primary CTA for the company introduction section.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Section label"
            value={page.about.label}
            onChange={(value) => setValueAtPath(["about", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.about.heading}
            onChange={(value) => setValueAtPath(["about", "heading"], value)}
          />
          <CmsPanelField
            label="Heading accent"
            value={page.about.headingAccent}
            onChange={(value) => setValueAtPath(["about", "headingAccent"], value)}
          />
          <CmsPanelStringList
            label="Body paragraph"
            values={page.about.body}
            onChange={(values) => setValueAtPath(["about", "body"], values)}
          />
          <CmsPanelField
            label="Primary CTA text"
            value={page.about.ctaPrimary.label}
            onChange={(value) =>
              setValueAtPath(["about", "ctaPrimary", "label"], value)
            }
          />
          <CmsPanelField
            label="Primary CTA link"
            value={page.about.ctaPrimary.href}
            onChange={(value) =>
              setValueAtPath(["about", "ctaPrimary", "href"], value)
            }
          />
          {page.about.media.image ? (
            <CmsPanelImageFields
              label="Section image"
              src={page.about.media.image.src}
              alt={page.about.media.image.alt}
              onSrcChange={(value) =>
                setValueAtPath(["about", "media", "image", "src"], value)
              }
              onAltChange={(value) =>
                setValueAtPath(["about", "media", "image", "alt"], value)
              }
            />
          ) : null}
        </>
      ),
    },
    {
      id: "company-statistics",
      title: "Company Statistics",
      description:
        "Update the supporting statistics and background image used in the company metrics section.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelImageFields
            label="Background image"
            src={page.companyStatistics.backgroundImage.src}
            alt={page.companyStatistics.backgroundImage.alt}
            onSrcChange={(value) =>
              setValueAtPath(["companyStatistics", "backgroundImage", "src"], value)
            }
            onAltChange={(value) =>
              setValueAtPath(["companyStatistics", "backgroundImage", "alt"], value)
            }
          />
          {page.companyStatistics.items.map((item, index) => (
            <CmsPanelCard key={item.id} title={`Statistic ${index + 1}`}>
              <CmsPanelField
                label="Value"
                value={String(item.value)}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyStatistics", "items", index, "value"],
                    Number(value) || 0,
                  )
                }
              />
              <CmsPanelField
                label="Suffix"
                value={item.suffix ?? ""}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyStatistics", "items", index, "suffix"],
                    value,
                  )
                }
              />
              <CmsPanelField
                label="Label"
                value={item.label}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyStatistics", "items", index, "label"],
                    value,
                  )
                }
              />
            </CmsPanelCard>
          ))}
        </>
      ),
    },
    {
      id: "services",
      title: "Services",
      description:
        "Manage the section headline and CTA while keeping service collection details anchored to the visual page layout.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Heading"
            value={page.services.heading}
            onChange={(value) => setValueAtPath(["services", "heading"], value)}
          />
          <CmsPanelField
            label="Heading accent"
            value={page.services.headingAccent}
            onChange={(value) =>
              setValueAtPath(["services", "headingAccent"], value)
            }
          />
          <CmsPanelField
            label="CTA text"
            value={page.services.ctaPrimary.label}
            onChange={(value) =>
              setValueAtPath(["services", "ctaPrimary", "label"], value)
            }
          />
          <CmsPanelField
            label="CTA link"
            value={page.services.ctaPrimary.href}
            onChange={(value) =>
              setValueAtPath(["services", "ctaPrimary", "href"], value)
            }
          />
        </>
      ),
    },
    {
      id: "why-choose-us",
      title: "Why Choose Us",
      description:
        "Edit the headline, featured copy, mission, and vision content for the trust-building section.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.whyChooseUs.label}
            onChange={(value) => setValueAtPath(["whyChooseUs", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.whyChooseUs.heading}
            onChange={(value) => setValueAtPath(["whyChooseUs", "heading"], value)}
          />
          <CmsPanelTextarea
            label="Subheading"
            value={page.whyChooseUs.subheading}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "subheading"], value)
            }
            rows={3}
          />
          <CmsPanelImageFields
            label="Featured image"
            src={page.whyChooseUs.featuredImage.src}
            alt={page.whyChooseUs.featuredImage.alt}
            onSrcChange={(value) =>
              setValueAtPath(["whyChooseUs", "featuredImage", "src"], value)
            }
            onAltChange={(value) =>
              setValueAtPath(["whyChooseUs", "featuredImage", "alt"], value)
            }
          />
          <CmsPanelTextarea
            label="Mission body"
            value={page.whyChooseUs.mission.body}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "mission", "body"], value)
            }
            rows={4}
          />
          <CmsPanelTextarea
            label="Vision body"
            value={page.whyChooseUs.vision.body}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "vision", "body"], value)
            }
            rows={4}
          />
        </>
      ),
    },
    {
      id: "engineering",
      title: "Engineering",
      description:
        "Adjust the engineering story, intro copy, and supporting bullets without disrupting the live section animation.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.engineering.label}
            onChange={(value) => setValueAtPath(["engineering", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.engineering.heading}
            onChange={(value) => setValueAtPath(["engineering", "heading"], value)}
          />
          <CmsPanelField
            label="Heading accent"
            value={page.engineering.headingAccent}
            onChange={(value) =>
              setValueAtPath(["engineering", "headingAccent"], value)
            }
          />
          <CmsPanelField
            label="Heading suffix"
            value={page.engineering.headingSuffix}
            onChange={(value) =>
              setValueAtPath(["engineering", "headingSuffix"], value)
            }
          />
          <CmsPanelTextarea
            label="Introduction"
            value={page.engineering.intro}
            onChange={(value) => setValueAtPath(["engineering", "intro"], value)}
            rows={4}
          />
          <CmsPanelStringList
            label="Bullet"
            values={page.engineering.bullets}
            onChange={(values) =>
              setValueAtPath(["engineering", "bullets"], values)
            }
          />
        </>
      ),
    },
    {
      id: "featured-products",
      title: "Products Section",
      description:
        "Control the framing copy for featured products while the product records themselves remain dashboard-managed.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.featuredProducts.label}
            onChange={(value) =>
              setValueAtPath(["featuredProducts", "label"], value)
            }
          />
          <CmsPanelField
            label="Heading"
            value={page.featuredProducts.heading}
            onChange={(value) =>
              setValueAtPath(["featuredProducts", "heading"], value)
            }
          />
          <CmsPanelTextarea
            label="Description"
            value={page.featuredProducts.description}
            onChange={(value) =>
              setValueAtPath(["featuredProducts", "description"], value)
            }
            rows={4}
          />
          <CmsPanelField
            label="Explore all text"
            value={page.featuredProducts.exploreAll.label}
            onChange={(value) =>
              setValueAtPath(["featuredProducts", "exploreAll", "label"], value)
            }
          />
          <CmsPanelField
            label="Explore all link"
            value={page.featuredProducts.exploreAll.href}
            onChange={(value) =>
              setValueAtPath(["featuredProducts", "exploreAll", "href"], value)
            }
          />
        </>
      ),
    },
    {
      id: "news",
      title: "News Section",
      description:
        "Keep the homepage news framing simple here. Article management belongs in the dashboard.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.news.label}
            onChange={(value) => setValueAtPath(["news", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.news.heading}
            onChange={(value) => setValueAtPath(["news", "heading"], value)}
          />
          <CmsPanelField
            label="Heading accent"
            value={page.news.headingAccent}
            onChange={(value) => setValueAtPath(["news", "headingAccent"], value)}
          />
          <CmsPanelTextarea
            label="Description"
            value={page.news.description}
            onChange={(value) => setValueAtPath(["news", "description"], value)}
            rows={4}
          />
          <CmsPanelField
            label="View all text"
            value={page.news.viewAll.label}
            onChange={(value) =>
              setValueAtPath(["news", "viewAll", "label"], value)
            }
          />
          <CmsPanelField
            label="View all link"
            value={page.news.viewAll.href}
            onChange={(value) =>
              setValueAtPath(["news", "viewAll", "href"], value)
            }
          />
        </>
      ),
    },
    {
      id: "certificates",
      title: "Certificates",
      description:
        "Update only the section framing copy here. Certificate records and images remain dashboard-managed.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Heading"
            value={page.certificates.heading}
            onChange={(value) => setValueAtPath(["certificates", "heading"], value)}
          />
          <CmsPanelField
            label="Heading accent"
            value={page.certificates.headingAccent}
            onChange={(value) =>
              setValueAtPath(["certificates", "headingAccent"], value)
            }
          />
          <CmsPanelTextarea
            label="Subheading"
            value={page.certificates.subheading}
            onChange={(value) =>
              setValueAtPath(["certificates", "subheading"], value)
            }
            rows={3}
          />
        </>
      ),
    },
  ];
}

export function createAboutPageSectionEditors(): CmsVisualSectionDefinition<AboutPageContent>[] {
  return [
    {
      id: "about-hero",
      title: "About Hero",
      description:
        "Edit the introductory hero copy for the About page while the live hero remains visible.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Title"
            value={page.hero.title}
            onChange={(value) => setValueAtPath(["hero", "title"], value)}
          />
          <CmsPanelTextarea
            label="Introduction"
            value={page.hero.introduction}
            onChange={(value) => setValueAtPath(["hero", "introduction"], value)}
            rows={4}
          />
          {page.hero.backgroundImage ? (
            <CmsPanelImageFields
              label="Background image"
              src={page.hero.backgroundImage.src}
              alt={page.hero.backgroundImage.alt}
              onSrcChange={(value) =>
                setValueAtPath(["hero", "backgroundImage", "src"], value)
              }
              onAltChange={(value) =>
                setValueAtPath(["hero", "backgroundImage", "alt"], value)
              }
            />
          ) : null}
        </>
      ),
    },
    {
      id: "company-overview",
      title: "Who We Are",
      description:
        "Maintain the overview narrative, feature copy, and visual framing for the company story section.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.companyOverview.label}
            onChange={(value) => setValueAtPath(["companyOverview", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.companyOverview.heading}
            onChange={(value) =>
              setValueAtPath(["companyOverview", "heading"], value)
            }
          />
          <CmsPanelStringList
            label="Body paragraph"
            values={page.companyOverview.body}
            onChange={(values) =>
              setValueAtPath(["companyOverview", "body"], values)
            }
          />
          <CmsPanelImageFields
            label="Overview image"
            src={page.companyOverview.image.src}
            alt={page.companyOverview.image.alt}
            onSrcChange={(value) =>
              setValueAtPath(["companyOverview", "image", "src"], value)
            }
            onAltChange={(value) =>
              setValueAtPath(["companyOverview", "image", "alt"], value)
            }
          />
        </>
      ),
    },
    {
      id: "engineering-manufacturing",
      title: "Engineering & Manufacturing",
      description:
        "Update the supporting section copy and CTA messaging for the capabilities page section.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.engineeringManufacturing.label}
            onChange={(value) =>
              setValueAtPath(["engineeringManufacturing", "label"], value)
            }
          />
          <CmsPanelField
            label="Heading"
            value={page.engineeringManufacturing.heading}
            onChange={(value) =>
              setValueAtPath(["engineeringManufacturing", "heading"], value)
            }
          />
          <CmsPanelTextarea
            label="Subheading"
            value={page.engineeringManufacturing.subheading}
            onChange={(value) =>
              setValueAtPath(["engineeringManufacturing", "subheading"], value)
            }
            rows={4}
          />
          <CmsPanelField
            label="Primary CTA text"
            value={page.engineeringManufacturing.cta.ctaPrimary.label}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "ctaPrimary", "label"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Primary CTA link"
            value={page.engineeringManufacturing.cta.ctaPrimary.href}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "ctaPrimary", "href"],
                value,
              )
            }
          />
        </>
      ),
    },
  ];
}

export function createContactPageSectionEditors(): CmsVisualSectionDefinition<ContactPageContent>[] {
  return [
    {
      id: "contact-hero",
      title: "Contact Hero",
      description:
        "Edit the hero heading and introduction for the Contact page from the side panel.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.hero.label}
            onChange={(value) => setValueAtPath(["hero", "label"], value)}
          />
          <CmsPanelField
            label="Title"
            value={page.hero.title}
            onChange={(value) => setValueAtPath(["hero", "title"], value)}
          />
          <CmsPanelTextarea
            label="Introduction"
            value={page.hero.introduction}
            onChange={(value) => setValueAtPath(["hero", "introduction"], value)}
            rows={4}
          />
        </>
      ),
    },
    {
      id: "contact-main",
      title: "Contact Section",
      description:
        "Edit the contact information and inquiry form copy from a single properties panel while previewing the live layout.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Info label"
            value={page.main.info.label}
            onChange={(value) =>
              setValueAtPath(["main", "info", "label"], value)
            }
          />
          <CmsPanelField
            label="Info heading"
            value={page.main.info.heading}
            onChange={(value) =>
              setValueAtPath(["main", "info", "heading"], value)
            }
          />

          {page.main.info.items.map((item, index) => (
            <CmsPanelCard key={item.id} title={`Contact item ${index + 1}`}>
              <CmsPanelField
                label="Label"
                value={item.label}
                onChange={(value) =>
                  setValueAtPath(["main", "info", "items", index, "label"], value)
                }
              />
              <CmsPanelField
                label="Value"
                value={item.value}
                onChange={(value) =>
                  setValueAtPath(["main", "info", "items", index, "value"], value)
                }
              />
              <CmsPanelField
                label="Link"
                value={item.href ?? ""}
                onChange={(value) =>
                  setValueAtPath(
                    ["main", "info", "items", index, "href"],
                    value,
                  )
                }
              />
            </CmsPanelCard>
          ))}

          <CmsPanelCard title="Inquiry form">
            <CmsPanelField
              label="Form heading"
              value={page.main.form.heading}
              onChange={(value) =>
                setValueAtPath(["main", "form", "heading"], value)
              }
            />
            <CmsPanelTextarea
              label="Form description"
              value={page.main.form.description ?? ""}
              onChange={(value) =>
                setValueAtPath(["main", "form", "description"], value)
              }
              rows={3}
            />
            <CmsPanelField
              label="Submit button"
              value={page.main.form.submitLabel}
              onChange={(value) =>
                setValueAtPath(["main", "form", "submitLabel"], value)
              }
            />
          </CmsPanelCard>
        </>
      ),
    },
    {
      id: "contact-location",
      title: "Contact Location",
      description:
        "Maintain the location section heading, address, and supporting map labels here.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.location.label}
            onChange={(value) => setValueAtPath(["location", "label"], value)}
          />
          <CmsPanelField
            label="Heading"
            value={page.location.heading}
            onChange={(value) => setValueAtPath(["location", "heading"], value)}
          />
          <CmsPanelTextarea
            label="Address"
            value={page.location.address}
            onChange={(value) => setValueAtPath(["location", "address"], value)}
            rows={3}
          />
        </>
      ),
    },
    {
      id: "contact-engineering-cta",
      title: "Contact CTA",
      description:
        "Edit the closing contact call to action from the dashboard-style properties panel.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Heading"
            value={page.engineeringCta.heading}
            onChange={(value) =>
              setValueAtPath(["engineeringCta", "heading"], value)
            }
          />
          <CmsPanelTextarea
            label="Body"
            value={page.engineeringCta.body}
            onChange={(value) => setValueAtPath(["engineeringCta", "body"], value)}
            rows={3}
          />
          <CmsPanelField
            label="Button text"
            value={page.engineeringCta.ctaPrimary.label}
            onChange={(value) =>
              setValueAtPath(["engineeringCta", "ctaPrimary", "label"], value)
            }
          />
          <CmsPanelField
            label="Button link"
            value={page.engineeringCta.ctaPrimary.href}
            onChange={(value) =>
              setValueAtPath(["engineeringCta", "ctaPrimary", "href"], value)
            }
          />
        </>
      ),
    },
  ];
}
