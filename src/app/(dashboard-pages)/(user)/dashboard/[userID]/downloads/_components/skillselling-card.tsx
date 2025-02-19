import phone from "@/images/phone.svg";
import Image from "next/image";
import Link from "next/link";

interface SkillsellingCardProperties {
  title: string;
  link: string;
}

export const SkillsellingCard = ({ title, link }: SkillsellingCardProperties) => {
  return (
    <div className="h-fit max-w-[351px] rounded-lg bg-white p-4 transition-shadow duration-300 hover:shadow-md">
      <div className="flex space-x-7">
        <div>
          <Image className={`h-full`} src={phone} alt={``} />
        </div>
        <div className="flex flex-col items-start space-y-3">
          <p className="text-xl font-semibold">{title}</p>
          <Link href={link} className={`text-primary`}>
            Click here to view
          </Link>
        </div>
      </div>
    </div>
  );
};
