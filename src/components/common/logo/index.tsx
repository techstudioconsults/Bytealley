import logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Link href="/" className="" data-testid="logo">
      <Image priority src={logo} alt="bytealley" width={width} height={height} className="object-contain" />
    </Link>
  );
};
