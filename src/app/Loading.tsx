"use client";

import Image from "next/image";
import { LuLoader } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <LuLoader className="animate-spin text-xl text-primary" />
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={100}
            height={47}
            className="object-contain"
            priority
          />
        </div>
        {/* <p className="text-sm text-gray-600">Please wait...</p> */}
      </div>
    </div>
  );
}
