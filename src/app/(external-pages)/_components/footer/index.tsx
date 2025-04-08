"use client";

import Link from "next/link";
import { AiFillDribbbleCircle, AiFillFacebook, AiFillPinterest, AiFillTwitterCircle } from "react-icons/ai";

import { BlurImage } from "~/components/miscellaneous/blur-image";
import { cn } from "~/utils/utils";
import { ActivePage } from "../navbar/active-page";

interface FooterLinkProperties {
  href: string;
  children: string;
  disabled?: boolean;
  activeClassName?: string;
}

const FooterLink: React.FC<FooterLinkProperties> = ({
  href,
  children,
  disabled = false,
  activeClassName = "text-mid-danger",
}) => {
  return (
    <Link
      href={disabled ? "#" : href}
      className={cn(
        "font-semibold",
        disabled ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-current",
        ActivePage(children) && activeClassName,
      )}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

interface SocialLinkProperties {
  href: string;
  children: React.ReactNode;
  platform: string;
}

const SocialIconLink: React.FC<SocialLinkProperties> = ({ href, children, platform }) => (
  <Link
    href={href}
    className="text-current transition-colors duration-200 hover:text-purple-600"
    aria-label={`Follow us on ${platform}`}
  >
    {children}
  </Link>
);

const FOOTER_LINKS = [
  {
    title: "Discover",
    links: [
      { href: "/explore?category=all", text: "Explore" },
      { href: "/pricing", text: "Pricing" },
      { href: "/features", text: "Features" },
      { href: "/auth/register", text: "Become A Creator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms-and-conditions", text: "Terms And Conditions" },
      { href: "/privacy-policy", text: "Privacy Policy" },
      { href: "/blogs", text: "Blog", disabled: true },
      { href: "/dashboard/help", text: "Help And Support", disabled: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", text: "About" },
      { href: "/contact", text: "Contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <AiFillFacebook />, platform: "Facebook" },
  { icon: <AiFillTwitterCircle />, platform: "Twitter" },
  { icon: <AiFillDribbbleCircle />, platform: "Dribbble" },
  { icon: <AiFillPinterest />, platform: "Pinterest" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-low-purple pt-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mt-4 grid grid-cols-1 gap-10 font-bold lg:grid-cols-4">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/" aria-label="Home">
              <BlurImage
                alt="ByteAlley Logo"
                width={100}
                height={50}
                className="h-[50px] w-[100px]"
                src="/images/logo.svg"
              />
            </Link>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="flex flex-col items-center gap-2 lg:items-start">
              {section.links.map((link) => (
                <FooterLink key={link.text} href={link.href} disabled={link.disabled}>
                  {link.text}
                </FooterLink>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="my-10 flex flex-col-reverse items-center justify-center gap-5 lg:flex-row lg:justify-between">
          <div>
            <span>&copy; {currentYear} ByteAlley. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-2xl text-black">
            {SOCIAL_LINKS.map((social) => (
              <SocialIconLink key={social.platform} href="/contact" platform={social.platform}>
                {social.icon}
              </SocialIconLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
