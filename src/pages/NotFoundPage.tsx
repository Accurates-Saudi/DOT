import { NotFoundSection } from "@/components/not-found";
import { useNotFoundPageContent } from "@/i18n/content/hooks";

export function NotFoundPage() {
  const notFoundPageContent = useNotFoundPageContent();

  return <NotFoundSection content={notFoundPageContent} />;
}
