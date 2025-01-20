"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Logo } from "~/components/common/logo";
import { RegisterFormData, registerSchema } from "~/schemas";

const Register = () => {
  const router = useRouter();
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Implement registration logic here
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[547px] bg-white p-12">
      <div className="mb-[56px] flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-2xl font-bold text-high-grey-III">
          Welcome to Productize - Where Creativity Meets Opportunity!
        </h1>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter full name"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <FormField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter full name"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter Password"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <section className={`pt-[56px]`}>
            <div className="mb-4 text-center text-sm">
              <p>
                You agree to our{" "}
                <Link href="/terms" className="text-mid-purple hover:underline">
                  Terms Of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-mid-purple hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <CustomButton
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
              size={`xl`}
            >
              Create Account
            </CustomButton>
          </section>
        </form>

        <div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative my-6 flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <CustomButton
            type="button"
            isLeftIconVisible
            icon={<FcGoogle />}
            size="xl"
            variant="outline"
            className="flex w-full items-center justify-center space-x-2"
            onClick={() => {
              /* TODO: Implement Google sign in */
            }}
          >
            Continue with Google
          </CustomButton>

          <p className="mt-6 text-center text-sm">
            Have an account already?{" "}
            <Link href="/login" className="text-mid-purple hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
