import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("services", "routes/services.tsx"),
    route("products", "routes/products.tsx"),
    route("catalogs", "routes/catalogs.tsx"),
    route("news", "routes/news.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
