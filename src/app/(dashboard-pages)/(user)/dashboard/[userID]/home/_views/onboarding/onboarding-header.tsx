"use client";

import { ProgressBar } from "../../_components/progress-bar";

interface OnboardingHeaderProperties {
  completedSteps: number;
  totalSteps: number;
}

export const OnboardingHeader = ({ completedSteps, totalSteps }: OnboardingHeaderProperties) => {
  return (
    <section className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Get Started Guide</h1>
        <p className="text-sm">Use this personalized guide to get your store up and running.</p>
      </div>
      <ProgressBar current={completedSteps} total={totalSteps} />
    </section>
  );
};
