import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/utils/utils";

interface LogoProperties extends HTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProperties) => {
  return (
    <Link href="/" className="" data-testid="logo">
      <Image
        priority
        src={logo}
        alt="bytealley"
        width={width}
        height={height}
        className={cn("object-contain", className)}
      />
      <div className={`mt-1 flex w-full items-center justify-end`}>
        <Badge variant={`outline`} className={`border-mid-success text-[10px] text-mid-success`}>
          Beta
        </Badge>
      </div>
    </Link>
  );
};
