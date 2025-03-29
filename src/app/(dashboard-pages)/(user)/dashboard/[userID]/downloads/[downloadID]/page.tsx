"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { WithDependency } from "~/HOC/withDependencies";
import { DownloadService } from "~/services/download.service";
import { dependencies } from "~/utils/dependencies";
import { ReviewModal } from "../_components/review-modal";
import { SkillsellingCard } from "../_components/skillselling-card";

const BaseDownloadDetailPage = ({
  params,
  downloadService,
}: {
  params: { downloadID: string };
  downloadService: DownloadService;
}) => {
  const [isPending, startTransition] = useTransition();
  const [download, setDownload] = useState<IDownload[]>([]);
  const [skillSellingContent, setSkillSellingContent] = useState<ISkillSellingDownload | null>(null);
  const searchParameters = useSearchParams();
  const productType = searchParameters.get("product_type");

  useEffect(() => {
    const fetchProductData = async () => {
      startTransition(async () => {
        let downloadData;

        if (productType === "skill_selling") {
          downloadData = await downloadService.getDownloadById(params.downloadID, true);
          setSkillSellingContent((downloadData?.data as unknown as ISkillSellingDownload) || null);
        } else {
          downloadData = await downloadService.getDownloadById(params.downloadID);
          setDownload((downloadData?.data as IDownload[]) || []);
        }
      });
    };

    fetchProductData();
  }, [downloadService, params.downloadID, productType]);

  if (isPending) {
    return <Loading text={`Loading download details...`} className={`w-fill h-fit p-20`} />;
  }

  if ((!download || download.length === 0) && productType === "skill_selling" && !skillSellingContent) {
    return (
      <EmptyState
        title="Download Not Found"
        description="The downloaded asset you are looking for does not exist."
        images={[]}
        className="h-full"
      />
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-col items-end justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-5">
          <BackNavigator />
          <div>
            <p className="text-sm font-semibold">{download[0]?.name || `Skill Selling Product`}</p>
            <p className="text-xs text-mid-grey-III">By {download[0]?.publisher || skillSellingContent?.link}</p>
          </div>
        </div>
        <div className="my-4 sm:my-0">
          <ReviewModal downloadedProductID={params.downloadID} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 rounded-lg bg-mid-grey-I p-4 py-10 lg:h-[70vh] lg:grid-cols-2 xl:grid-cols-3">
        {productType === "skill_selling" && skillSellingContent
          ? skillSellingContent?.resource_link.map((resource, index) => {
              return <SkillsellingCard key={index} title={`Module ${index + 1}`} link={resource} />;
            })
          : download?.map((item) => (
              <iframe
                key={item.id}
                id={`downloadIframe-${item.id}`}
                className="h-[500px] w-full bg-mid-grey-I"
                title={`Downloaded Content ${item.id + 1}`}
                src={item.url}
                frameBorder="0"
                allowFullScreen
              />
            ))}
      </div>
    </>
  );
};

const DownloadDetailPage = WithDependency(BaseDownloadDetailPage, {
  downloadService: dependencies.DOWNLOAD_SERVICE,
});

export default DownloadDetailPage;
