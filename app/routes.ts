import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  layout("routes/_layout.tsx", [
    index("routes/locale-redirect.tsx"),
    route(":locale", "routes/_locale.tsx", [
      index("routes/home.tsx"),
      route("about", "routes/about.tsx"),
      route("services", "routes/services.tsx"),
      route("products", "routes/products.tsx"),
      route("products/:slug", "routes/products.$slug.tsx"),
      route("catalogs", "routes/catalogs.tsx"),
      route("news", "routes/news.tsx"),
      route("news/:slug", "routes/news.$slug.tsx"),
      route("contact", "routes/contact.tsx"),
      route("*", "routes/$.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
