import React from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { Wrapper } from "~/components/layout/wrapper";
import { FadeIn } from "~/lib/animations";
import { cn } from "~/utils/utils";

interface SharedSectionProperties {
  title: string;
  desc: string;
  btnText: string;
}

export const SharedSection: React.FC<SharedSectionProperties> = ({ title, desc, btnText }) => {
  return (
    <div className="bg-mid-purple py-20">
      <Wrapper className="mx-auto max-w-[70rem] text-center text-purple-100">
        <h2 className="nr-font text-3xl font-black text-white lg:text-5xl">{title}</h2>
        <FadeIn>
          <p className="mx-auto my-5 max-w-[45rem] text-lg font-light lg:text-2xl">{desc}</p>
        </FadeIn>
        <CustomButton
          className={cn("h-14 w-full rounded-md bg-mid-warning text-sm text-white xl:w-fit xl:text-2xl", {
            "cursor-not-allowed opacity-50": btnText.includes("Join"),
          })}
          isDisabled={btnText.includes("Join")}
          variant="primary"
          href="/auth/login"
        >
          {btnText}
        </CustomButton>
      </Wrapper>
    </div>
  );
};
