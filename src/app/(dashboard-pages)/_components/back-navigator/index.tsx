"use client";

import ArrowLeftIcon from "@/icons/Property_2_Arrow-left_kafkjg.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { cn } from "~/utils/utils";

interface IBackNavigator extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const BackNavigator: FC<IBackNavigator> = ({ text, className }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className={cn(`flex items-center space-x-4`, className)}>
      <Image src={ArrowLeftIcon} alt="Arrow Left" />
      {text && <p className={`text-lg font-semibold`}>{text}</p>}
    </div>
  );
};
