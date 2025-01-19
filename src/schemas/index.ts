import * as z from "zod";

const emailSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Passcode must be at least 6 characters long")
    .nonempty("Passcode is required"),
});

const confirmPasswordSchema = z.object({
  confirmPassword: z
    .string()
    .min(6, "Confirm passcode must be at least 6 characters long")
    .nonempty("Confirm passcode is required"),
});

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+\d{10,15}$/, "Invalid phone number format"),
});

export const profileFormSchema = emailSchema.merge(
  z.object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters long")
      .min(1, "First Name is required"),
    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters long")
      .min(1, "Last Name is required"),
  }),
);

export const adminLoginFormSchema = emailSchema.merge(passwordSchema);

// type declaration
export type EmailFormData = z.infer<typeof emailSchema>;
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type PasscodeFormData = z.infer<typeof passwordSchema>;
export type ConfirmPasscodeFormData = z.infer<typeof confirmPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type AdminLoginFormData = z.infer<typeof adminLoginFormSchema>;
