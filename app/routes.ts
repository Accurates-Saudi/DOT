import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("api/cms/auth/bootstrap", "routes/api.cms.auth.bootstrap.ts"),
  route("api/cms/auth/login", "routes/api.cms.auth.login.ts"),
  route("api/cms/auth/logout", "routes/api.cms.auth.logout.ts"),
  route("api/cms/auth/me", "routes/api.cms.auth.me.ts"),
  route("api/cms/content", "routes/api.cms.content.ts"),
  route("api/cms/content/:key", "routes/api.cms.content.$key.ts"),
  route("api/cms/media", "routes/api.cms.media.ts"),
  route("api/cms/media/:id", "routes/api.cms.media.$id.ts"),
  route("api/cms/media/:id/file", "routes/api.cms.media.$id.file.ts"),
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
