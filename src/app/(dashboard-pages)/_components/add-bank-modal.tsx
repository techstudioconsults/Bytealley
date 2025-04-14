/* eslint-disable unicorn/prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/dialog/Dialog";
import { FormField } from "~/components/common/FormFields";
import { BankFormData, bankFormSchema } from "~/schemas";
import { EarningService } from "~/services/earnings.service";
import { Toast } from "~/utils/notificationManager";

export const AddBankModal = ({ getAccounts, service }: { getAccounts?: () => void; service: EarningService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState<any>([]);
  const methods = useForm<BankFormData>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      name: "",
      bank_code: "",
      account_number: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: BankFormData) => {
    const response = await service.registerPaymentAccount(data);
    if (response) {
      Toast.getInstance().showToast({
        title: "Success",
        description: `Account ${response.data.bank_name} was registerd successfully`,
        variant: "default",
      });
      reset();
      if (getAccounts) {
        getAccounts();
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const getBankList = async () => {
      const response = await service.getListOfPaystackApproveBanks();
      if (response) {
        const bankList = Array.from(
          new Map(
            response?.map((bank: IBank) => [
              bank.code,
              { value: JSON.stringify({ bank_code: bank.code, bank_name: bank.name }), label: bank.name },
            ]),
          ).values(),
        );
        setBanks(bankList);
      }
    };
    getBankList();
  }, [service]);

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`sm:max-w-[499px]`}
      wrapperClassName={`mb-8`}
      trigger={
        <div
          className={`border-default flex min-h-[120px] items-center justify-center gap-4 rounded-md p-6 text-mid-purple lg:max-w-[357px]`}
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
            name="name"
            placeholder="Enter bank account name"
            className={`h-12 bg-low-grey-III`}
            required
          />
          <FormField
            label="Bank"
            name="bank_code"
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

          <div className={`flex items-center gap-4 border-t border-border pt-[32px]`}>
            <CustomButton
              onClick={(event) => {
                event.preventDefault();
                reset();
              }}
              variant="outline"
              size={`xl`}
              className="w-full border-destructive text-destructive"
            >
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
