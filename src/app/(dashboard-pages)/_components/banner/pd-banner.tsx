import Image from "next/image";

interface PayoutBannerProperties {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const PDBanner = ({ title, description, imageSrc, imageAlt }: PayoutBannerProperties) => {
  return (
    <section className="flex flex-col items-center justify-between rounded-md bg-primary px-[32px] text-white lg:flex-row">
      <div className="flex flex-col gap-2 p-[32px]">
        <h3 className="text-white">{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <Image src={imageSrc} alt={imageAlt} width={263} height={166} />
      </div>
    </section>
  );
};
