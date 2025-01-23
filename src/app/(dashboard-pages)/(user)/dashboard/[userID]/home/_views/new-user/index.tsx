import productImage from "@/images/empty_product.svg";
import onboardingImage from "@/images/home_banner_illustration.svg";

import { ActionBanner } from "../../_components/action-banner";
import { DashboardBanner } from "../../_components/home-banner";
import { EmptyState } from "../empty-state";
import { OnboardingHeader } from "../onboarding/onboarding-header";

interface NewUserProps {
  steps: OnboardingStep[];
  completedSteps: number;
}

export const NewUser = ({ steps, completedSteps }: NewUserProps) => {
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
          image={{
            src: productImage.src,
            alt: "Empty state illustration",
          }}
          title="You do not have any sales activities yet."
          buttonText="Create your first product"
          onButtonClick={() => {
            /* handle click */
          }}
        />
      </div>
    </section>
  );
};
