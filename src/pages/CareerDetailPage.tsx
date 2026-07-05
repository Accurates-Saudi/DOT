import { useLoaderData } from "react-router";

import { CareerDetailView } from "@/components/careers";
import { useCareersPageContent } from "@/i18n/content/hooks";
import type { CareerJobDetail } from "@/types";

interface CareerDetailLoaderData {
  job: CareerJobDetail;
}

export function CareerDetailPage() {
  const { job } = useLoaderData() as CareerDetailLoaderData;
  const careersPageContent = useCareersPageContent();

  return (
    <CareerDetailView
      job={job}
      detailHero={careersPageContent.detailHero}
      detailSidebar={careersPageContent.detailSidebar}
    />
  );
}
