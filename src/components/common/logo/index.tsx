import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="" data-testid="logo">
      <Image
        src="/images/logo.svg"
        alt="skicom"
        height={52}
        width={283}
        className="h-full w-full object-contain"
      />
    </Link>
  );
};
