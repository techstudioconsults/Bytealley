"use client";

import onboardingImage from "@/images/home_banner_illustration.svg";

import { cn } from "~/utils/utils";
import { ActionBanner } from "../../_components/action-banner";
import { DashboardBanner } from "../../_components/home-banner";
import { OnboardingHeader } from "./onboarding-header";

interface OnboardingProperties {
  steps: OnboardingStep[];
}

export const Onboarding = ({ steps }: OnboardingProperties) => {
  const completedSteps = steps.filter((step) => step.isCompleted).length;

  return (
    <section>
      <DashboardBanner
        img={onboardingImage.src}
        title="Welcome to Byte Alley"
        desc="Complete your profile to start getting your products published."
      />
      <div className={`my-4`}>
        <OnboardingHeader completedSteps={completedSteps} totalSteps={steps.length} />
      </div>
      <div className="flex flex-col gap-4">
        {steps.map((step) => (
          <ActionBanner
            key={step.title}
            title={step.title}
            description={step.description}
            button={{
              label: step.buttonLabel,
              onClick: step.action,
            }}
            icon={step.icon}
            isCompleted={step.isCompleted}
            className={cn(step.isCompleted && "hidden")}
          />
        ))}
      </div>
    </section>
  );
};
