import Image from "next/image";

import CustomButton from "~/components/common/common-button/common-button";

interface EmptyStateProps {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const EmptyState = ({ image, title, buttonText, onButtonClick, className = "" }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center rounded-md bg-low-grey-III px-4 py-12 ${className}`}>
      <div>
        <Image src={image.src} alt={image.alt} width={image.width || 120} height={image.height || 60} />
      </div>

      <p className="my-4 text-center text-lg font-semibold">{title}</p>

      {buttonText && (
        <CustomButton variant="primary" size="xl" onClick={onButtonClick}>
          {buttonText}
        </CustomButton>
      )}
    </div>
  );
};
