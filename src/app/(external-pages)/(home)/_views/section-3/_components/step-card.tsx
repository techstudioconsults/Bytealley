import { BlurImage } from "~/components/miscellaneous/blur-image";
import { Card, CardContent } from "~/components/ui/card";
import { FadeIn } from "~/lib/animations";
import { cn } from "~/utils/utils";

export const StepCard: React.FC<StepCardProperties> = ({ title, description, imageSrc, className }) => {
  return (
    <Card className={cn(`shadow-NB h-full rounded-2xl border-black bg-white`, className)}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <h4 className="mb-2 text-xl font-bold lg:text-3xl">{title}</h4>
          <FadeIn>
            <p className="text-gray-500">{description}</p>
          </FadeIn>
        </div>
        {imageSrc && (
          <div className="flex justify-end">
            <BlurImage
              src={imageSrc || ""}
              alt={title}
              width={150}
              height={150}
              className="h-auto w-auto object-contain"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
