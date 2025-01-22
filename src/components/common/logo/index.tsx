import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "~/utils/utils";

export const Logo = ({ width = 283, height = 52 }: { width?: number; height?: number }) => {
  return (
    <Link href="/" className="" data-testid="logo">
      <Image priority src={logo} alt="bytealley" className={cn(`h-[${height}px] w-[${width}px]`, "object-contain")} />
    </Link>
  );
};
