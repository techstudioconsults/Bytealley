import Link from "next/link";
import { AiFillDribbbleCircle, AiFillFacebook, AiFillPinterest, AiFillTwitterCircle } from "react-icons/ai";

import { BlurImage } from "~/components/miscellaneous/blur-image";

interface FooterLinkProperties {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const FooterLink: React.FC<FooterLinkProperties> = ({ href, children, disabled = false }) => (
  <Link
    href={disabled ? "#" : href}
    className={`font-semibold ${disabled ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-current"}`}
  >
    {children}
  </Link>
);

const SocialIconLink: React.FC<FooterLinkProperties> = ({ href, children }) => (
  <Link href={href} className="text-current transition-colors duration-200 hover:text-purple-600">
    {children}
  </Link>
);

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col bg-low-purple pt-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mt-4 grid grid-cols-1 gap-10 font-bold lg:grid-cols-4">
          <div className="flex justify-center lg:justify-start">
            <Link href="/seller">
              <BlurImage
                alt={`bytealley`}
                width={100}
                height={50}
                className={`h-[50px] w-[100px]`}
                src={`/images/logo.svg`}
              />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <FooterLink href="/explore">Explore</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/auth/register">Become A Creator</FooterLink>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <FooterLink href="/terms-and-conditions">Terms And Conditions</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/blogs" disabled>
              Blog
            </FooterLink>
            <FooterLink href="/dashboard/help" disabled>
              Help And Support
            </FooterLink>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <FooterLink href="/about">About us</FooterLink>
            <FooterLink href="/contact-us">Contact us</FooterLink>
          </div>
        </div>
        <div className="my-10 flex flex-col-reverse items-center justify-center gap-5 lg:flex-row lg:justify-between">
          <div>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-2xl text-black">
            <SocialIconLink href="/contact">
              <AiFillFacebook />
            </SocialIconLink>
            <SocialIconLink href="/contact">
              <AiFillTwitterCircle />
            </SocialIconLink>
            <SocialIconLink href="/contact">
              <AiFillDribbbleCircle />
            </SocialIconLink>
            <SocialIconLink href="/contact">
              <AiFillPinterest />
            </SocialIconLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
