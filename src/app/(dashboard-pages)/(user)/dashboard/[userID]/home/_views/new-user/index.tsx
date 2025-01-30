"use client";

import productImage from "@/images/empty_product.svg";
import onboardingImage from "@/images/home_banner_illustration.svg";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { ActionBanner } from "../../_components/action-banner";
import { DashboardBanner } from "../../_components/home-banner";
import { OnboardingHeader } from "../onboarding/onboarding-header";

interface NewUserProperties {
  steps: OnboardingStep[];
  completedSteps: number;
}

export const NewUser = ({ steps, completedSteps }: NewUserProperties) => {
  // Find the first incomplete step
  const nextStep = steps.find((step) => !step.isCompleted);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row">
        <DashboardBanner
          img={onboardingImage.src}
          title="Welcome to Byte Alley"
          desc="Complete your profile to start getting your products published."
        />
        <div className="space-y-6">
          <OnboardingHeader completedSteps={completedSteps} totalSteps={steps.length} />
          {nextStep && (
            <ActionBanner
              title={nextStep.title}
              description={nextStep.description}
              button={{
                label: nextStep.buttonLabel,
                onClick: nextStep.action,
              }}
              icon={nextStep.icon}
              isCompleted={nextStep.isCompleted}
            />
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h6 className="text-lg font-semibold">Activity</h6>
        <EmptyState
          images={[
            {
              src: productImage.src,
              alt: "Empty state illustration",
            },
          ]}
          description="You do not have any sales activities yet."
          button={{
            text: "Create your first product",
            onClick: () => {},
          }}
        />
      </div>
    </section>
  );
};
