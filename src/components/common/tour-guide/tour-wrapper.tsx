"use client";

import { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { toast } from "sonner";

import CustomButton from "../common-button/common-button";

interface TourWrapperProperties {
  steps: Step[];
  children: React.ReactNode;
}

export const TourWrapper = ({ steps, children }: TourWrapperProperties) => {
  const [isTourRunning, setIsTourRunning] = useState(false);

  const handleTourStart = () => {
    setIsTourRunning(true);
    toast.dismiss();
  };

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setIsTourRunning(false);
    }
  };

  useEffect(() => {
    toast(
      <div className="flex flex-col gap-2">
        <p>Would you like to take a guided tour of this page?</p>
        <div className="flex justify-end gap-2">
          <CustomButton variant="outline" onClick={() => toast.dismiss()}>
            Not Now
          </CustomButton>
          <CustomButton variant="primary" onClick={handleTourStart}>
            Start Tour
          </CustomButton>
        </div>
      </div>,
      {
        duration: Infinity,
        position: "bottom-right",
      },
    );
  }, []);

  return (
    <>
      {/* Joyride Tour */}
      <Joyride
        steps={steps}
        run={isTourRunning}
        callback={handleTourCallback}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            primaryColor: "#3b82f6",
            textColor: "#1e293b",
          },
        }}
      />

      {children}
    </>
  );
};
