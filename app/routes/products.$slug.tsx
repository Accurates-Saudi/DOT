import type { Route } from "./+types/products.$slug";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { getProductBySlug } from "@/lib/products";
import { seoDefaults } from "@/data/site";

export function loader({ params }: Route.LoaderArgs) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return { product };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const product = loaderData?.product;

  if (!product) {
    return [{ title: "Product Not Found" }];
  }

  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", product.meta.title),
    },
    { name: "description", content: product.meta.description },
  ];
}

export default function ProductDetail() {
  return <ProductDetailPage />;
}
