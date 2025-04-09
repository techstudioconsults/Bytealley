/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LucidePlusCircle } from "lucide-react";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/dialog/Dialog";
import { FunnelForm } from "./funnel-form";

export const FunnelFormModal = ({ editor }: { editor: any }) => {
  //   const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <ReusableDialog
      trigger={
        <CustomButton
          size={`xl`}
          isLeftIconVisible
          icon={<LucidePlusCircle />}
          variant="primary"
          className="SE w-full sm:w-auto"
        >
          Save and Continue
        </CustomButton>
      }
      className={`lg:min-w-[600px] lg:p-8`}
      headerClassName={`text-2xl`}
      title={`Final Steps Before Publishing...`}
      description={`Fill the form below to complete your funnel creation`}
    >
      <FunnelForm editor={editor} />
    </ReusableDialog>
  );
};
