import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/Dialog";
import { FormField } from "~/components/common/FormFields";
import { BankFormData, bankFormSchema } from "~/schemas";
import { EarningService } from "~/services/earnings.service";

export const AddBankModal = ({ service }: { service: EarningService }) => {
  const [banks, setBanks] = useState([]);
  const methods = useForm<BankFormData>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      account_name: "",
      bank: "",
      account_number: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: BankFormData) => {
    console.log(data);
  };

  useEffect(() => {
    const getBankList = async () => {
      const response = await service.getListOfPaystackApproveBanks();
      const bankList = response?.map((bank: IBank) => {
        return { value: bank.code, label: bank.name };
      });
      setBanks(bankList || []);
    };
    getBankList();
  }, []);

  return (
    <ReusableDialog
      className={`sm:max-w-[499px]`}
      trigger={
        <div
          className={`flex items-center justify-center gap-4 rounded-md border p-6 text-mid-purple lg:max-w-[357px]`}
        >
          <PlusCircle />
          <p>Add Bank</p>
        </div>
      }
      title={"Add Bank Account"}
      description={"Add a banck account to your dashboard"}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <FormField
            label="Account Name"
            name="account_name"
            placeholder="Enter bank account name"
            className={`h-12 bg-low-grey-III`}
            required
          />
          <FormField
            label="Bank"
            name="bank"
            type="select"
            placeholder="Select a bank"
            options={banks}
            className={`h-12 bg-low-grey-III`}
            required
          />
          <FormField
            label="Account Number"
            name="account_number"
            placeholder="Enter bank account number"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <div className={`flex items-center gap-4 border-t pt-[32px]`}>
            <CustomButton variant="outline" size={`xl`} className="w-full border-destructive text-destructive">
              Cancel
            </CustomButton>
            <CustomButton
              size={`xl`}
              variant={`primary`}
              type="submit"
              className="w-full"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Save Changes
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </ReusableDialog>
  );
};
