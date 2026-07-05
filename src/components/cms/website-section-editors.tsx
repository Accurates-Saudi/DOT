import { buildServicesPageContent } from "@/i18n/content";
import type {
  AboutPageContent,
  CatalogsPageContent,
  ContactPageContent,
  FooterContent,
  HomePageContent,
  NewsPageContent,
  NotFoundPageContent,
  ProductsPageContent,
} from "@/types";

import {
  CmsPanelCard,
  CmsPanelField,
  CmsPanelImageField,
  CmsPanelStringList,
  CmsPanelTextarea,
  cloneValue,
  restorePageSection,
  type CmsVisualSectionDefinition,
} from "./CmsVisualEditor";

type ServicesPageEditorContent = ReturnType<typeof buildServicesPageContent>;

function withSectionRestore<TPage, K extends keyof TPage>(
  key: K,
  section: CmsVisualSectionDefinition<TPage>,
): CmsVisualSectionDefinition<TPage> {
  return {
    ...section,
    restoreFromPublished: (draft, published) =>
      restorePageSection(draft, published, key),
  };
}

function attachSectionRestores<TPage extends object>(
  sections: CmsVisualSectionDefinition<TPage>[],
  keys: Record<string, keyof TPage>,
): CmsVisualSectionDefinition<TPage>[] {
  return sections.map((section) => {
    const pageKey = keys[section.id];
    if (!pageKey) return section;
    return withSectionRestore(pageKey, section);
  });
}

export function createHomePageSectionEditors(): CmsVisualSectionDefinition<HomePageContent>[] {
  return attachSectionRestores<HomePageContent>(
    [
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
              <CmsPanelImageField
                label="Background image"
                image={slide.background}
                mediaKey={`home.hero.slide-${index + 1}.background`}
                onImageChange={(next) =>
                  setValueAtPath(["hero", "slides", index, "background"], next)
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
        "Edit the services banner card, both images, video area, body copy, and calls to action.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          {page.about.servicesBanner ? (
            <CmsPanelCard title="Services banner card">
              <CmsPanelField
                label="Banner title"
                value={page.about.servicesBanner.title}
                onChange={(value) =>
                  setValueAtPath(["about", "servicesBanner", "title"], value)
                }
              />
              {page.about.servicesBanner.items.map((item, index) => (
                <CmsPanelField
                  key={`about-service-${index}`}
                  label={`Service label ${index + 1}`}
                  value={item.label}
                  onChange={(value) =>
                    setValueAtPath(
                      ["about", "servicesBanner", "items", index, "label"],
                      value,
                    )
                  }
                />
              ))}
              {page.about.servicesBanner.thumbnail ? (
                <CmsPanelImageField
                  label="Banner thumbnail image"
                  image={page.about.servicesBanner.thumbnail}
                  mediaKey="home.about.services-banner.thumbnail"
                  onImageChange={(next) =>
                    setValueAtPath(
                      ["about", "servicesBanner", "thumbnail"],
                      next,
                    )
                  }
                />
              ) : null}
            </CmsPanelCard>
          ) : null}

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

          <CmsPanelCard title="Video area">
            {page.about.media.image ? (
              <CmsPanelImageField
                label="Video fallback image"
                image={page.about.media.image}
                mediaKey="home.about.media.image"
                onImageChange={(next) =>
                  setValueAtPath(["about", "media", "image"], next)
                }
              />
            ) : null}
            <CmsPanelField
              label="YouTube video ID"
              value={page.about.media.videoId ?? ""}
              onChange={(value) =>
                setValueAtPath(["about", "media", "videoId"], value)
              }
            />
            <CmsPanelField
              label="YouTube video URL"
              value={page.about.media.videoUrl ?? ""}
              onChange={(value) =>
                setValueAtPath(["about", "media", "videoUrl"], value)
              }
            />
          </CmsPanelCard>

          {page.about.ctaVideo ? (
            <CmsPanelCard title="Video CTA">
              <CmsPanelField
                label="Video CTA text"
                value={page.about.ctaVideo.label}
                onChange={(value) =>
                  setValueAtPath(["about", "ctaVideo", "label"], value)
                }
              />
              <CmsPanelField
                label="Video CTA link"
                value={page.about.ctaVideo.href}
                onChange={(value) =>
                  setValueAtPath(["about", "ctaVideo", "href"], value)
                }
              />
            </CmsPanelCard>
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
          <CmsPanelImageField
            label="Background image"
            image={page.companyStatistics.backgroundImage}
            mediaKey="home.company-statistics.background"
            onImageChange={(next) =>
              setValueAtPath(["companyStatistics", "backgroundImage"], next)
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
          {page.services.items.map((item, index) => (
            <CmsPanelCard key={item.id} title={`Service card ${index + 1}`}>
              <CmsPanelField
                label="Title"
                value={item.title}
                onChange={(value) =>
                  setValueAtPath(["services", "items", index, "title"], value)
                }
              />
              <CmsPanelTextarea
                label="Description"
                value={item.description}
                onChange={(value) =>
                  setValueAtPath(
                    ["services", "items", index, "description"],
                    value,
                  )
                }
                rows={3}
              />
              <CmsPanelField
                label="Link"
                value={item.href ?? ""}
                onChange={(value) =>
                  setValueAtPath(["services", "items", index, "href"], value)
                }
              />
            </CmsPanelCard>
          ))}
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
          <CmsPanelImageField
            label="Featured image"
            image={page.whyChooseUs.featuredImage}
            mediaKey="home.why-choose-us.featured-image"
            onImageChange={(next) =>
              setValueAtPath(["whyChooseUs", "featuredImage"], next)
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
          <CmsPanelField
            label="Mission title"
            value={page.whyChooseUs.mission.title}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "mission", "title"], value)
            }
          />
          <CmsPanelField
            label="Vision title"
            value={page.whyChooseUs.vision.title}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "vision", "title"], value)
            }
          />
          <CmsPanelField
            label="CTA panel heading"
            value={page.whyChooseUs.ctaPanel.heading}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "ctaPanel", "heading"], value)
            }
          />
          <CmsPanelField
            label="Primary CTA text"
            value={page.whyChooseUs.ctaPanel.ctaPrimary.label}
            onChange={(value) =>
              setValueAtPath(
                ["whyChooseUs", "ctaPanel", "ctaPrimary", "label"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Primary CTA link"
            value={page.whyChooseUs.ctaPanel.ctaPrimary.href}
            onChange={(value) =>
              setValueAtPath(
                ["whyChooseUs", "ctaPanel", "ctaPrimary", "href"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Secondary CTA text"
            value={page.whyChooseUs.ctaPanel.ctaSecondary.label}
            onChange={(value) =>
              setValueAtPath(
                ["whyChooseUs", "ctaPanel", "ctaSecondary", "label"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Secondary CTA link"
            value={page.whyChooseUs.ctaPanel.ctaSecondary.href}
            onChange={(value) =>
              setValueAtPath(
                ["whyChooseUs", "ctaPanel", "ctaSecondary", "href"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Tagline"
            value={page.whyChooseUs.tagline}
            onChange={(value) =>
              setValueAtPath(["whyChooseUs", "tagline"], value)
            }
          />
          {page.whyChooseUs.mission.backgroundImage ? (
            <CmsPanelImageField
              label="Mission background image"
              image={page.whyChooseUs.mission.backgroundImage}
              mediaKey="home.why-choose-us.mission.background"
              onImageChange={(next) =>
                setValueAtPath(["whyChooseUs", "mission", "backgroundImage"], next)
              }
            />
          ) : null}
          {page.whyChooseUs.vision.backgroundImage ? (
            <CmsPanelImageField
              label="Vision background image"
              image={page.whyChooseUs.vision.backgroundImage}
              mediaKey="home.why-choose-us.vision.background"
              onImageChange={(next) =>
                setValueAtPath(["whyChooseUs", "vision", "backgroundImage"], next)
              }
            />
          ) : null}
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
          {page.engineering.steps.map((step, index) => (
            <CmsPanelCard key={`engineering-step-${index}`} title={`Step ${index + 1}`}>
              <CmsPanelField
                label="Step label"
                value={step.step}
                onChange={(value) =>
                  setValueAtPath(["engineering", "steps", index, "step"], value)
                }
              />
              <CmsPanelField
                label="Title"
                value={step.title}
                onChange={(value) =>
                  setValueAtPath(["engineering", "steps", index, "title"], value)
                }
              />
              <CmsPanelTextarea
                label="Description"
                value={step.description}
                onChange={(value) =>
                  setValueAtPath(
                    ["engineering", "steps", index, "description"],
                    value,
                  )
                }
                rows={3}
              />
              <CmsPanelField
                label="Tag"
                value={step.tag}
                onChange={(value) =>
                  setValueAtPath(["engineering", "steps", index, "tag"], value)
                }
              />
            </CmsPanelCard>
          ))}
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
    {
      id: "trusted-partners",
      title: "Trusted Partners",
      description:
        "Edit the trusted partners headline, description, and partner logo cards.",
      renderPanel: ({ page, setValueAtPath }) => (
        <>
          <CmsPanelField
            label="Label"
            value={page.trustedPartners.label}
            onChange={(value) =>
              setValueAtPath(["trustedPartners", "label"], value)
            }
          />
          <CmsPanelField
            label="Heading"
            value={page.trustedPartners.heading}
            onChange={(value) =>
              setValueAtPath(["trustedPartners", "heading"], value)
            }
          />
          <CmsPanelTextarea
            label="Description"
            value={page.trustedPartners.description}
            onChange={(value) =>
              setValueAtPath(["trustedPartners", "description"], value)
            }
            rows={3}
          />
          {page.trustedPartners.logos.map((logo, index) => (
            <CmsPanelCard key={logo.id} title={`Partner ${index + 1}`}>
              <CmsPanelField
                label="Name"
                value={logo.name}
                onChange={(value) =>
                  setValueAtPath(
                    ["trustedPartners", "logos", index, "name"],
                    value,
                  )
                }
              />
              <CmsPanelImageField
                label="Logo"
                image={logo.logo}
                mediaKey={`home.trusted-partners.logo-${index + 1}`}
                onImageChange={(next) =>
                  setValueAtPath(
                    ["trustedPartners", "logos", index, "logo"],
                    next,
                  )
                }
              />
              <CmsPanelField
                label="Link"
                value={logo.href ?? ""}
                onChange={(value) =>
                  setValueAtPath(
                    ["trustedPartners", "logos", index, "href"],
                    value,
                  )
                }
              />
            </CmsPanelCard>
          ))}
        </>
      ),
    },
  ],
    {
      hero: "hero",
      about: "about",
      "company-statistics": "companyStatistics",
      services: "services",
      "why-choose-us": "whyChooseUs",
      engineering: "engineering",
      "featured-products": "featuredProducts",
      news: "news",
      certificates: "certificates",
      "trusted-partners": "trustedPartners",
    },
  );
}

export function createAboutPageSectionEditors(): CmsVisualSectionDefinition<AboutPageContent>[] {
  return attachSectionRestores<AboutPageContent>(
    [
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
            <CmsPanelImageField
              label="Background image"
              image={page.hero.backgroundImage}
              mediaKey="about.hero.background"
              onImageChange={(next) =>
                setValueAtPath(["hero", "backgroundImage"], next)
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
          <CmsPanelImageField
            label="Overview image"
            image={page.companyOverview.image}
            mediaKey="about.company-overview.image"
            onImageChange={(next) =>
              setValueAtPath(["companyOverview", "image"], next)
            }
          />
          {page.companyOverview.features.map((feature, index) => (
            <CmsPanelCard key={feature.id} title={`Feature ${index + 1}`}>
              <CmsPanelField
                label="Title"
                value={feature.title}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyOverview", "features", index, "title"],
                    value,
                  )
                }
              />
              <CmsPanelTextarea
                label="Description"
                value={feature.description}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyOverview", "features", index, "description"],
                    value,
                  )
                }
                rows={3}
              />
            </CmsPanelCard>
          ))}
          {page.companyOverview.stats.map((stat, index) => (
            <CmsPanelCard key={stat.id} title={`Stat ${index + 1}`}>
              <CmsPanelField
                label="Value"
                value={String(stat.value)}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyOverview", "stats", index, "value"],
                    Number(value) || 0,
                  )
                }
              />
              <CmsPanelField
                label="Suffix"
                value={stat.suffix ?? ""}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyOverview", "stats", index, "suffix"],
                    value,
                  )
                }
              />
              <CmsPanelField
                label="Label"
                value={stat.label}
                onChange={(value) =>
                  setValueAtPath(
                    ["companyOverview", "stats", index, "label"],
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
          <CmsPanelField
            label="CTA heading"
            value={page.engineeringManufacturing.cta.heading}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "heading"],
                value,
              )
            }
          />
          <CmsPanelTextarea
            label="CTA body"
            value={page.engineeringManufacturing.cta.body}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "body"],
                value,
              )
            }
            rows={3}
          />
          <CmsPanelField
            label="Secondary CTA text"
            value={page.engineeringManufacturing.cta.ctaSecondary.label}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "ctaSecondary", "label"],
                value,
              )
            }
          />
          <CmsPanelField
            label="Secondary CTA link"
            value={page.engineeringManufacturing.cta.ctaSecondary.href}
            onChange={(value) =>
              setValueAtPath(
                ["engineeringManufacturing", "cta", "ctaSecondary", "href"],
                value,
              )
            }
          />
          {page.engineeringManufacturing.capabilities.map((capability, index) => (
            <CmsPanelCard key={capability.id} title={`Capability ${index + 1}`}>
              <CmsPanelField
                label="Title"
                value={capability.title}
                onChange={(value) =>
                  setValueAtPath(
                    ["engineeringManufacturing", "capabilities", index, "title"],
                    value,
                  )
                }
              />
              <CmsPanelTextarea
                label="Description"
                value={capability.description}
                onChange={(value) =>
                  setValueAtPath(
                    [
                      "engineeringManufacturing",
                      "capabilities",
                      index,
                      "description",
                    ],
                    value,
                  )
                }
                rows={3}
              />
              <CmsPanelImageField
                label="Image"
                image={capability.image}
                mediaKey={`about.engineering-manufacturing.capability-${index + 1}`}
                onImageChange={(next) =>
                  setValueAtPath(
                    ["engineeringManufacturing", "capabilities", index, "image"],
                    next,
                  )
                }
              />
            </CmsPanelCard>
          ))}
        </>
      ),
    },
  ],
    {
      "about-hero": "hero",
      "company-overview": "companyOverview",
      "engineering-manufacturing": "engineeringManufacturing",
    },
  );
}

export function createContactPageSectionEditors(): CmsVisualSectionDefinition<ContactPageContent>[] {
  return attachSectionRestores<ContactPageContent>(
    [
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
  ],
    {
      "contact-hero": "hero",
      "contact-main": "main",
      "contact-location": "location",
      "contact-engineering-cta": "engineeringCta",
    },
  );
}

export function createProductsPageSectionEditors(): CmsVisualSectionDefinition<ProductsPageContent>[] {
  return attachSectionRestores<ProductsPageContent>(
    [
      {
        id: "products-hero",
        title: "Products Hero",
        description: "Edit the products listing page hero copy and background.",
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
              <CmsPanelImageField
                label="Background image"
                image={page.hero.backgroundImage}
                mediaKey="products.hero.background"
                onImageChange={(next) =>
                  setValueAtPath(["hero", "backgroundImage"], next)
                }
              />
            ) : null}
          </>
        ),
      },
      {
        id: "products-listing",
        title: "Products Listing",
        description:
          "Update listing framing copy. Individual products remain dashboard-managed.",
        renderPanel: ({ page, setValueAtPath }) => (
          <>
            <CmsPanelField
              label="Search placeholder"
              value={page.listing.searchPlaceholder}
              onChange={(value) =>
                setValueAtPath(["listing", "searchPlaceholder"], value)
              }
            />
            <CmsPanelField
              label="Empty state message"
              value={page.listing.emptyStateMessage}
              onChange={(value) =>
                setValueAtPath(["listing", "emptyStateMessage"], value)
              }
            />
            <CmsPanelField
              label="View product label"
              value={page.listing.viewProductLabel}
              onChange={(value) =>
                setValueAtPath(["listing", "viewProductLabel"], value)
              }
            />
          </>
        ),
      },
      {
        id: "products-cta",
        title: "Products CTA",
        description: "Edit the closing call to action on the products page.",
        renderPanel: ({ page, setValueAtPath }) => (
          <>
            <CmsPanelField
              label="Heading"
              value={page.cta.heading}
              onChange={(value) => setValueAtPath(["cta", "heading"], value)}
            />
            <CmsPanelTextarea
              label="Body"
              value={page.cta.body}
              onChange={(value) => setValueAtPath(["cta", "body"], value)}
              rows={3}
            />
            <CmsPanelField
              label="Button text"
              value={page.cta.ctaPrimary.label}
              onChange={(value) =>
                setValueAtPath(["cta", "ctaPrimary", "label"], value)
              }
            />
            <CmsPanelField
              label="Button link"
              value={page.cta.ctaPrimary.href}
              onChange={(value) =>
                setValueAtPath(["cta", "ctaPrimary", "href"], value)
              }
            />
          </>
        ),
      },
    ],
    {
      "products-hero": "hero",
      "products-listing": "listing",
      "products-cta": "cta",
    },
  );
}

export function createNewsPageSectionEditors(): CmsVisualSectionDefinition<NewsPageContent>[] {
  return attachSectionRestores<NewsPageContent>(
    [
      {
        id: "news-hero",
        title: "News Hero",
        description: "Edit the news listing page hero section.",
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
            {page.hero.backgroundImage ? (
              <CmsPanelImageField
                label="Background image"
                image={page.hero.backgroundImage}
                mediaKey="news.hero.background"
                onImageChange={(next) =>
                  setValueAtPath(["hero", "backgroundImage"], next)
                }
              />
            ) : null}
          </>
        ),
      },
      {
        id: "news-featured",
        title: "Featured News",
        description: "Update featured article framing labels.",
        renderPanel: ({ page, setValueAtPath }) => (
          <CmsPanelField
            label="Read more label"
            value={page.featured.readMoreLabel}
            onChange={(value) =>
              setValueAtPath(["featured", "readMoreLabel"], value)
            }
          />
        ),
      },
      {
        id: "news-grid",
        title: "News Grid",
        description: "Edit grid section labels. Articles remain dashboard-managed.",
        renderPanel: ({ page, setValueAtPath }) => (
          <>
            <CmsPanelField
              label="Label"
              value={page.grid.label}
              onChange={(value) => setValueAtPath(["grid", "label"], value)}
            />
            <CmsPanelField
              label="Read more label"
              value={page.grid.readMoreLabel}
              onChange={(value) =>
                setValueAtPath(["grid", "readMoreLabel"], value)
              }
            />
            <CmsPanelField
              label="View more label"
              value={page.grid.viewMoreLabel}
              onChange={(value) =>
                setValueAtPath(["grid", "viewMoreLabel"], value)
              }
            />
          </>
        ),
      },
    ],
    {
      "news-hero": "hero",
      "news-featured": "featured",
      "news-grid": "grid",
    },
  );
}

export function createServicesPageSectionEditors(): CmsVisualSectionDefinition<ServicesPageEditorContent>[] {
  return attachSectionRestores<ServicesPageEditorContent>(
    [
      {
        id: "services-hero",
        title: "Services Hero",
        description: "Edit the services page hero copy and background image.",
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
            <CmsPanelImageField
              label="Background image"
              image={page.hero.backgroundImage}
              mediaKey="services.hero.background"
              onImageChange={(next) =>
                setValueAtPath(["hero", "backgroundImage"], next)
              }
            />
          </>
        ),
      },
    ],
    {
      "services-hero": "hero",
    },
  );
}

export function createCatalogsPageSectionEditors(): CmsVisualSectionDefinition<CatalogsPageContent>[] {
  return attachSectionRestores<CatalogsPageContent>(
    [
      {
        id: "catalogs-hero",
        title: "Catalogs Hero",
        description: "Edit the catalogs page hero section.",
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
              <CmsPanelImageField
                label="Background image"
                image={page.hero.backgroundImage}
                mediaKey="catalogs.hero.background"
                onImageChange={(next) =>
                  setValueAtPath(["hero", "backgroundImage"], next)
                }
              />
            ) : null}
          </>
        ),
      },
      {
        id: "catalogs-library",
        title: "Catalog Library",
        description:
          "Update library framing labels. Catalog PDFs remain dashboard-managed.",
        renderPanel: ({ page, setValueAtPath }) => (
          <>
            <CmsPanelField
              label="Label"
              value={page.library.label}
              onChange={(value) => setValueAtPath(["library", "label"], value)}
            />
            <CmsPanelField
              label="Download label"
              value={page.library.downloadLabel}
              onChange={(value) =>
                setValueAtPath(["library", "downloadLabel"], value)
              }
            />
            <CmsPanelField
              label="PDF label"
              value={page.library.pdfLabel}
              onChange={(value) => setValueAtPath(["library", "pdfLabel"], value)}
            />
          </>
        ),
      },
    ],
    {
      "catalogs-hero": "hero",
      "catalogs-library": "library",
    },
  );
}

export function createFooterSectionEditors(): CmsVisualSectionDefinition<FooterContent>[] {
  return [
    {
      id: "footer",
      title: "Footer",
      description:
        "Edit footer description, logos, link groups, and contact details.",
      restoreFromPublished: (_draft, published) => cloneValue(published),
      renderPanel: ({ page, setValueAtPath, updatePage }) => (
        <>
          <CmsPanelTextarea
            label="Description"
            value={page.description}
            onChange={(value) => setValueAtPath(["description"], value)}
            rows={3}
          />
          <CmsPanelImageField
            label="DOT logo"
            image={page.logos.dot}
            mediaKey="footer.logo.dot"
            onImageChange={(next) => setValueAtPath(["logos", "dot"], next)}
          />
          <CmsPanelImageField
            label="Saudi Made logo"
            image={page.logos.saudiMade}
            mediaKey="footer.logo.saudi-made"
            onImageChange={(next) => setValueAtPath(["logos", "saudiMade"], next)}
          />
          <CmsPanelCard title="Quick links">
            <CmsPanelField
              label="Section title"
              value={page.quickLinks.title}
              onChange={(value) =>
                setValueAtPath(["quickLinks", "title"], value)
              }
            />
            {page.quickLinks.items.map((item, index) => (
              <CmsPanelField
                key={`quick-link-${index}`}
                label={`Link ${index + 1}`}
                value={item.label}
                onChange={(value) =>
                  updatePage((current) => ({
                    ...current,
                    quickLinks: {
                      ...current.quickLinks,
                      items: current.quickLinks.items.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, label: value } : entry,
                      ),
                    },
                  }))
                }
              />
            ))}
          </CmsPanelCard>
          <CmsPanelCard title="Services links">
            <CmsPanelField
              label="Section title"
              value={page.services.title}
              onChange={(value) => setValueAtPath(["services", "title"], value)}
            />
            {page.services.items.map((item, index) => (
              <CmsPanelField
                key={`service-link-${index}`}
                label={`Link ${index + 1}`}
                value={item.label}
                onChange={(value) =>
                  updatePage((current) => ({
                    ...current,
                    services: {
                      ...current.services,
                      items: current.services.items.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, label: value } : entry,
                      ),
                    },
                  }))
                }
              />
            ))}
          </CmsPanelCard>
          <CmsPanelField
            label="Contact section title"
            value={page.contact.title}
            onChange={(value) => setValueAtPath(["contact", "title"], value)}
          />
          {page.contact.items.map((item, index) => (
            <CmsPanelCard key={`${item.type}-${index}`} title={`Contact ${item.type}`}>
              <CmsPanelField
                label="Label"
                value={item.label}
                onChange={(value) =>
                  setValueAtPath(["contact", "items", index, "label"], value)
                }
              />
              <CmsPanelField
                label="Value"
                value={item.value}
                onChange={(value) =>
                  setValueAtPath(["contact", "items", index, "value"], value)
                }
              />
            </CmsPanelCard>
          ))}
        </>
      ),
    },
  ];
}

export function createNotFoundPageSectionEditors(): CmsVisualSectionDefinition<NotFoundPageContent>[] {
  return [
    {
      id: "not-found",
      title: "Not Found Page",
      description: "Edit the 404 page messaging, CTAs, and quick links.",
      restoreFromPublished: (_draft, published) => cloneValue(published),
      renderPanel: ({ page, setValueAtPath }) => (
          <>
            <CmsPanelField
              label="Label"
              value={page.label}
              onChange={(value) => setValueAtPath(["label"], value)}
            />
            <CmsPanelField
              label="Title"
              value={page.title}
              onChange={(value) => setValueAtPath(["title"], value)}
            />
            <CmsPanelTextarea
              label="Description"
              value={page.description}
              onChange={(value) => setValueAtPath(["description"], value)}
              rows={3}
            />
            <CmsPanelField
              label="Primary CTA text"
              value={page.ctaPrimary.label}
              onChange={(value) =>
                setValueAtPath(["ctaPrimary", "label"], value)
              }
            />
            <CmsPanelField
              label="Primary CTA link"
              value={page.ctaPrimary.href}
              onChange={(value) => setValueAtPath(["ctaPrimary", "href"], value)}
            />
            <CmsPanelField
              label="Secondary CTA text"
              value={page.ctaSecondary.label}
              onChange={(value) =>
                setValueAtPath(["ctaSecondary", "label"], value)
              }
            />
            <CmsPanelField
              label="Secondary CTA link"
              value={page.ctaSecondary.href}
              onChange={(value) =>
                setValueAtPath(["ctaSecondary", "href"], value)
              }
            />
            <CmsPanelField
              label="Quick links heading"
              value={page.quickLinksHeading}
              onChange={(value) =>
                setValueAtPath(["quickLinksHeading"], value)
              }
            />
            {page.quickLinks.map((link, index) => (
              <CmsPanelCard key={link.id} title={`Quick link ${index + 1}`}>
                <CmsPanelField
                  label="Label"
                  value={link.label}
                  onChange={(value) =>
                    setValueAtPath(["quickLinks", index, "label"], value)
                  }
                />
                <CmsPanelTextarea
                  label="Description"
                  value={link.description}
                  onChange={(value) =>
                    setValueAtPath(["quickLinks", index, "description"], value)
                  }
                  rows={2}
                />
              </CmsPanelCard>
            ))}
            <CmsPanelField
              label="Support heading"
              value={page.supportHeading}
              onChange={(value) => setValueAtPath(["supportHeading"], value)}
            />
            <CmsPanelTextarea
              label="Support body"
              value={page.supportBody}
              onChange={(value) => setValueAtPath(["supportBody"], value)}
              rows={3}
            />
          </>
        ),
    },
  ];
}
