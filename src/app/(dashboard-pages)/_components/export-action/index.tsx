"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import { format } from "date-fns";
import Image from "next/image";
import React, { useTransition } from "react";

import CustomButton from "~/components/common/common-button/common-button";

interface ExportActionProperties {
  service: any;
  currentPage: number;
  dateRange: { from?: Date; to?: Date } | undefined;
  status: string;
  onDownloadComplete: () => void;
  buttonText?: string;
}

const ExportAction: React.FC<ExportActionProperties> = ({
  service,
  currentPage,
  dateRange,
  status,
  onDownloadComplete,
  buttonText = "Export",
}) => {
  const [isPending, startTransition] = useTransition();
  const handleDownloadProducts = async () => {
    startTransition(async () => {
      const parameters: IProductFilters = {
        page: currentPage,
        ...(dateRange?.from && { start_date: format(dateRange.from, "yyyy-MM-dd") }),
        ...(dateRange?.to && { end_date: format(dateRange.to, "yyyy-MM-dd") }),
        ...(status !== "all" && {
          status: status as "draft" | "deleted" | "published",
        }),
      };

      await service.downloadProducts(parameters);
      onDownloadComplete();
    });
  };

  return (
    <CustomButton
      variant={`outline`}
      className={`w-full border-primary lg:w-auto`}
      size={`lg`}
      isLeftIconVisible
      icon={<Image src={uploadIcon} width={16} height={16} alt="export" />}
      onClick={handleDownloadProducts}
      isLoading={isPending}
    >
      {buttonText}
    </CustomButton>
  );
};

export default ExportAction;
