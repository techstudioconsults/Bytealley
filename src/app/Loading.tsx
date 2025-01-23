"use client";

import { LuLoader } from "react-icons/lu";

import { Logo } from "~/components/common/logo";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <LuLoader className="animate-spin text-xl text-primary" />
          <Logo width={100} height={47} />
        </div>
        {text && <p className="text-sm text-black">{text}</p>}
      </div>
    </div>
  );
}
