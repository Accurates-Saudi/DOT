import type {
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
      id: "certificates",
      title: "Certificates",
      description:
        "Refine the supporting copy for the certificate carousel while leaving the carousel behavior untouched.",
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
          {page.certificates.items.map((item, index) => (
            <CmsPanelImageFields
              key={item.id}
              label={`Certificate ${index + 1}`}
              src={item.image.src}
              alt={item.image.alt}
              onSrcChange={(value) =>
                setValueAtPath(
                  ["certificates", "items", index, "image", "src"],
                  value,
                )
              }
              onAltChange={(value) =>
                setValueAtPath(
                  ["certificates", "items", index, "image", "alt"],
                  value,
                )
              }
            />
          ))}
        </>
      ),
    },
  ];
}

export function createContactPageSectionEditors(): CmsVisualSectionDefinition<ContactPageContent>[] {
  return [
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
  ];
}
