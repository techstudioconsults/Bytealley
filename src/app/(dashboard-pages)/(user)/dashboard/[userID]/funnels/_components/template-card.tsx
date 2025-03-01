import { InfoIcon } from "lucide-react";

import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useSession } from "~/hooks/use-session";

export const TemplateCard = ({ image, text, templateID }: { image: string; text: string; templateID: string }) => {
  const { user } = useSession();
  return (
    <div className={`flex flex-col items-center justify-between gap-4 rounded-lg border p-3`}>
      <BlurImage
        width={100}
        height={100}
        className={`h-[150px] w-[100%] rounded-lg lg:h-[100px]`}
        src={image}
        alt={text}
      />
      <div className={`flex items-center gap-2`}>
        <p className={`text-mid-grey-II`}>{text}</p>
        <InfoIcon className="h-[1rem] w-[1rem]" />
      </div>
      <CustomButton
        href={`/dashboard/${user?.id}/funnels/editor?templateID=${templateID}`}
        className={`w-[200px] border-primary text-primary`}
        variant={`outline`}
      >
        Select Template
      </CustomButton>
    </div>
  );
};
