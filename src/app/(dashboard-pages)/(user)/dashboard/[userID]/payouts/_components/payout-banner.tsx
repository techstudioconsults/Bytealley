import payoutImg from "@/images/payout_tree.svg";
import Image from "next/image";

export const PayoutBanner = () => {
  return (
    <section className="flex flex-col items-center justify-between rounded-md bg-primary px-[32px] text-white lg:flex-row">
      <div className="flex flex-col gap-2 p-[32px]">
        <h3 className="text-white">Grow communities and get paid.</h3>
        <p>Make as much as ₦10,000 sale for your first withdraw</p>
      </div>
      <div>
        <Image src={payoutImg} alt="Payout Banner" width={263} height={166} />
      </div>
    </section>
  );
};
