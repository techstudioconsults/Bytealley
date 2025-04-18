"use client";

import { LuLoader } from "react-icons/lu";

import { Logo } from "~/components/common/logo";
import { cn } from "~/utils/utils";

export default function Loading({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn("flex h-screen flex-col items-center justify-center bg-white dark:bg-[#000000]", className)}>
      <div className="flex flex-col items-center gap-2">
        <Logo width={100} height={47} />
        <div className="flex items-center gap-1">
          <LuLoader className="animate-spin text-xl text-primary" />
          {<p className="text-sm font-medium">{text || "Loading..."}</p>}
        </div>
      </div>
    </div>
  );
}
