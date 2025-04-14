import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

import { Badge } from "~/components/ui/badge";
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
        <Badge
          variant={`outline`}
          className={cn(
            `-3 border-[0.5px] border-mid-success bg-white text-[8.5px] tracking-widest text-mid-success`,
            isDashboard && `border-mid-success text-mid-success`,
          )}
        >
          Beta
        </Badge>
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
