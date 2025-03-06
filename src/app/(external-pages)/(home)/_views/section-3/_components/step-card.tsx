import { BlurImage } from "~/components/miscellaneous/blur-image";
import { Card, CardContent } from "~/components/ui/card";

export const StepCard: React.FC<StepCardProperties> = ({ title, description, imageSrc }) => {
  return (
    <Card className="shadow-NB h-full rounded-lg border-0 bg-white">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <h4 className="mb-2 w-[60%] text-xl font-bold lg:text-3xl">{title}</h4>
          <p className="text-gray-500">{description}</p>
        </div>
        <div className="flex justify-end">
          <BlurImage src={imageSrc} alt={title} width={150} height={150} className="h-auto w-auto object-contain" />
        </div>
      </CardContent>
    </Card>
  );
};
