import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

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
    </Link>
  );
};
