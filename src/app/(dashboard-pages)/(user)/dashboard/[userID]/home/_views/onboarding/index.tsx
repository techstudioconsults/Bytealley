"use client";

import onboardingImage from "@/images/home_banner_illustration.svg";
import { useRouter } from "next/navigation";

import { useSession } from "~/hooks/use-session";
import { AuthService } from "~/services/auth.service";
import { ActionBanner } from "../../_components/action-banner";
import { DashboardBanner } from "../../_components/home-banner";
import { ProgressBar } from "../../_components/progress-bar";

export const Onboarding = ({ authService, params }: { authService: AuthService; params: { userID: string } }) => {
  const router = useRouter();
  const { user } = useSession();

  const ONBOARDING_STEPS: OnboardingStep[] = [
    {
      title: "Verify your email",
      description: "Verify your email address to secure your account",
      buttonLabel: "Verify email",
      icon: "/images/verify_email.svg",
      isCompleted: user?.email_verified,
      action: () => authService.verifyEmail(),
    },
    {
      title: "Customize your profile",
      description: "Add your personal information and customize your store profile",
      buttonLabel: "Edit profile",
      icon: "/images/profile.svg",
      isCompleted: user?.profile_completed,
      action: () => router.push(`/dashboard/${params.userID}/profile`),
    },
    {
      title: "Create your first product",
      description: "Start selling by adding your first product to the store",
      buttonLabel: "Add product",
      icon: "/images/first_product.svg",
      isCompleted: user?.first_product_created,
      action: () => router.push(`/dashboard/${params.userID}/products/new`),
    },
    {
      title: "Set up your payout",
      description: "Complete your profile to start getting your products published",
      buttonLabel: "Make money",
      icon: "/images/payout.svg",
      isCompleted: user?.payout_setup,
      action: () => router.push(`/dashboard/${params.userID}/settings/payout`),
    },
    {
      title: "Make your first sale",
      description: "Start promoting your products to make your first sale",
      buttonLabel: "View guide",
      icon: "/images/first_sale.svg",
      isCompleted: user?.first_sale,
      action: () => router.push(`/dashboard/${params.userID}/guide/first-sale`),
    },
  ];

  const completedSteps = ONBOARDING_STEPS.filter((step) => step.isCompleted).length;

  return (
    <section>
      <DashboardBanner
        img={onboardingImage.src}
        title="Welcome to Byte Alley"
        desc="Complete your profile to start getting your products published."
      />
      <section className="my-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">Get Started Guide</h1>
          <p className="text-sm sm:text-base">Use this personalized guide to get your store up and running.</p>
        </div>
        <ProgressBar current={completedSteps} total={ONBOARDING_STEPS.length} />
      </section>
      <div className="flex flex-col gap-4">
        {ONBOARDING_STEPS.map((step) => (
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
          />
        ))}
      </div>
    </section>
  );
};
