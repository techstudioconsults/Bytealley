/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastProps } from "../components/ui/toast";

declare global {
  type UserRole = "admin" | "user" | "guest";
  type AuthStatus = "authenticated" | "unauthenticated" | "loading";
  type Theme = "light" | "dark";

  type ExtendedToastProps = ToastProps & {
    description: string;
  };

  type LogoProperties = {
    logo: string;
  };

  type RootState = ReturnType<typeof import("@/store").store.getState>;
  type AppDispatch = typeof import("@/store").store.dispatch;

  type DependencyInjector = (Component: React.ElementType, dependencies: { [key: string]: symbol }) => any;

  type ResolveDependencies = {
    [key: string]: object;
  };

  // Define strict types for table data and actions
  type DataItem = Record<string, any>;

  type FormFieldProperties = {
    label?: string;
    name: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "textarea" | "select";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: { value: string; label: string }[];
    className?: string;
  };

  type RadioCardGroupProperties = {
    label?: string;
    name: string;
    options: { value: string; label: string; description?: string; icon?: string }[];
    required?: boolean;
    disabled?: boolean;
    className?: string;
  };

  type RichTextEditorProperties = {
    label?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
  };

  type ThumbNailUploadProperties = {
    label?: string;
    labelText?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    acceptedFormats?: string;
    maxFileSize?: number;
    defaultSrc?: string;
  };

  type HighlightsProperties = {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    addButtonText?: string;
    maxFields?: number;
    className?: string;
  };

  type ImageUploadProperties = {
    label?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxFiles?: number;
    acceptedFormats?: string;
    maxFileSize?: number;
  };

  type FileUploadProperties = {
    label?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxFiles?: number;
    acceptedFormats?: string;
    maxFileSize?: number;
  };

  // type ProductFormValues = {
  //   product_type: string;
  //   title: string;
  //   category: string;
  //   price: number;
  //   discount_price?: number;
  //   assets?: File[] | string[];
  //   description: string;
  //   cover_photos: File[] | string[];
  //   highlights: string[];
  //   thumbnail: File | null | string;
  //   tags: string[];
  //   resource_link?: string[];
  //   portfolio_link?: string;
  // };
}

// This export is needed to make the file a module
export {};
