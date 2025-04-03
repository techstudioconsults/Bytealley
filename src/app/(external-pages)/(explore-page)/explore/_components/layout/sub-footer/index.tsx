"use client";

import CustomButton from "~/components/common/common-button/common-button";
import { Wrapper } from "~/components/layout/wrapper";
import { useSession } from "~/hooks/use-session";

export const SubFooter = () => {
  const { user } = useSession();
  return (
    <section className={`border-b bg-low-purple`}>
      <Wrapper
        className={`flex flex-col items-center justify-between gap-4 py-4 text-center lg:flex-row lg:text-start`}
      >
        <div>
          <h5>Share knowledge online</h5>
          <p>Create an online video course, reach your community, and earn money</p>
        </div>
        {user && (
          <div>
            <CustomButton href={`/dashboard/${user.id}/products/new`} variant={`primary`} size={`xl`}>
              Create Product
            </CustomButton>
          </div>
        )}
      </Wrapper>
    </section>
  );
};
