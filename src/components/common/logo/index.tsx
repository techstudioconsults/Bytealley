import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

import { cn } from "~/utils/utils";

interface LogoProperties extends HTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProperties) => {
  const pathname = usePathname();

  const isDashboard = pathname.includes(`/dashboard`);

  return (
    <Link href="/" className="" data-testid="logo">
      <div className={cn(`mt-1 flex w-full items-center justify-end`)}>
        <span
          className={cn(
            `text-[10px] tracking-widest text-mid-success`,
            isDashboard ? `text-mid-success` : `text-white`,
          )}
        >
          Beta-0.0.1
        </span>
      </div>
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
