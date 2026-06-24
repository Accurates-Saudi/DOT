import { NotFoundSection } from "@/components/not-found";
import { notFoundPageContent } from "@/data/pages/not-found";

export function NotFoundPage() {
  return <NotFoundSection content={notFoundPageContent} />;
}
