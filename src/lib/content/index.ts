import { createStaticLoader } from "./loader";
import { homePageContent } from "@/data/pages/home";
import { siteSettings } from "@/data/site";
import { mainNavigation } from "@/data/navigation";

export const loadSiteSettings = createStaticLoader(siteSettings);
export const loadMainNavigation = createStaticLoader(mainNavigation);
export const loadHomePageContent = createStaticLoader(homePageContent);

export { createStaticLoader, resolveContent } from "./loader";
export type { ContentLoader } from "./loader";
