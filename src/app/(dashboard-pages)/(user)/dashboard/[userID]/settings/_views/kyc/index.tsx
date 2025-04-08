import { KYCForm } from "../account/_components/kyc-form";

export const KYC = () => {
  return (
    <section className={`space-y-10`}>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <div className={`col-span-2 space-y-2`}>
          <h5 className={`text-h5 font-semibold sm:text-h5-sm`}>Upload a proof of your Identity</h5>
          <p className={`text-sm text-mid-grey-II`}>Productize requires a government valid ID</p>
        </div>
        <div className={`col-span-3`}>
          <KYCForm />
        </div>
      </section>
    </section>
  );
};
