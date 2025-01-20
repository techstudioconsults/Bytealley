"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

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
    <div className="mx-auto w-full max-w-md space-y-8 p-6">
      <div className="flex flex-col items-center space-y-2">
        <Logo />
        <h1 className="text-center text-2xl font-semibold">
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
            required
          />

          <FormField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter full name"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter Password"
            required
          />

          <div className="text-center text-sm">
            <p>
              You agree to our{" "}
              <Link href="/terms" className="text-purple-600 hover:underline">
                Terms Of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <CustomButton
            type="submit"
            variant="default"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full"
          >
            Create Account
          </CustomButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <CustomButton
            variant="outline"
            className="flex w-full items-center justify-center space-x-2"
            onClick={() => {
              /* TODO: Implement Google sign in */
            }}
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            <span>Continue with Google</span>
          </CustomButton>

          <p className="text-center text-sm">
            Have an account already?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
