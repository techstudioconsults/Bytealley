/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { ToastProps } from "./components/ui/toast";

type ExtendedToastProps = ToastProps & {
  description: string;
};

type cardProperties = {
  price: number;
  initialPrice: number;
  plan: string;
  packages: {
    id: number;
    data: string;
  }[];
};

type MobileOffersProperties = {
  offers: cardProperties[];
};

type LogoProperties = {
  logo: string;
};

type RegisterState = {
  phoneNumber: string | number | null;
  phone_number_verified_at: string | number | null;
  profileDetails: null | {
    firstName: string;
    lastName: string;
    email: string;
  };
  passcode: string | number | null;
  setProfileDetails: (profileDetails: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  setPhoneNumber: (phoneNumber: number | string) => void;
  setPhoneNumberVerifiedAt: (
    phone_number_verified_at: number | string | null,
  ) => void;
  setPasscode: (passcode: number | string | null) => void;
  resetStore: () => void; // Function to reset the store
};

type DependencyInjector = (
  Component: React.ElementType,
  dependencies: { [key: string]: symbol },
) => any;

type ResolveDependencies = {
  [key: string]: object;
};

interface IDependencyContainer {
  _dependencies: {
    [key: symbol]: object;
  };
  add: (key: symbol, dependency: object) => void;
  get: <T>(key: symbol) => T;
}

type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    token: string;
  };
  expires: string;
  iat: number;
  exp: number;
};

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
}
