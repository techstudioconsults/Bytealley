"use client";

import Image from "next/image";
import Link from "next/link";

import CustomButton from "~/components/common/common-button/common-button";

const CoverPage = () => {
  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Link href="/seller">
          <Image
            alt="logo"
            src="https://res.cloudinary.com/doejcrfso/image/upload/v1725356813/productize/ByteAAlley-Logo_ue2hqr.svg"
            width={160}
            height={48}
          />
        </Link>
      </div>

      <div className="space-y-10 px-8">
        <div className="relative mx-auto mt-8 max-w-4xl text-center text-gray-800">
          <h1 className="text-4xl font-bold leading-tight">Welcome to ByteAlley!</h1>
          <p className="mt-3 text-lg font-normal">
            From Ebooks, video content, digital art/graphics, online courses or stock photos, you are spoilt for choice
            whether as a creator or as a consumer.
          </p>
        </div>
      </div>

      <div className="my-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 lg:flex-row">
          <CoverPageCard
            img="https://res.cloudinary.com/kingsleysolomon/image/upload/v1711120709/productize/Frame_1171275922_dnfgdc.png"
            desc="Are you a digital artist, designer, writer, or developer looking to share your creations with the world and earn from your passion ?"
            buttonText="Explore as Seller"
            title="Seller"
            link={"/seller"}
          />

          <div className="relative flex items-center justify-center py-10">
            {/* <div
              className={`absolute inset-0 flex items-center justify-center ${isMobileView ? "h-px w-full" : "h-full w-px"}`}
            >
              <div className={`${isMobileView ? "h-px w-full bg-purple-200" : "h-full w-px bg-purple-200"}`}></div>
            </div> */}
            <div className="relative flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-low-purple p-4 shadow-[0px_3.0280373096466064px_7.570093154907227px_2.2710280418395996px_#6D5DD31A]">
                <h3 className="text-2xl font-bold">Or</h3>
              </div>
            </div>
          </div>

          <CoverPageCard
            img="https://res.cloudinary.com/kingsleysolomon/image/upload/v1711120709/productize/Frame_1171275923_2_tq3d1u.png"
            desc="Are you in search of unique digital creations from talented artists, designers, writers, or developers? Your quest ends here!"
            buttonText="Explore as Buyer"
            title="Buyer"
            link={"/explore"}
          />
        </div>

        <div className="flex justify-center gap-4 pb-2">
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-sm hover:underline">
            Terms And Conditions
          </Link>
        </div>
      </div>
    </>
  );
};

interface CoverPageCardProperties {
  img: string;
  title: string;
  desc: string;
  buttonText: string;
  link: string;
}

const CoverPageCard = ({ img, title, desc, buttonText, link }: CoverPageCardProperties) => {
  return (
    <div className="flex flex-1 flex-col items-center rounded-lg p-6 text-center">
      <Image src={img} alt={title} width={300} height={200} className="mb-6" />
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <p className="mb-6 text-gray-700">{desc}</p>
      <CustomButton size={`xl`} variant={`primary`} className={`bg-mid-warning text-black`} href={link}>
        {buttonText}
      </CustomButton>
    </div>
  );
};

export default CoverPage;
