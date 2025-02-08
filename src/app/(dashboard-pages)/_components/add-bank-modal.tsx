import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";



import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/Dialog";
import { FormField } from "~/components/common/FormFields";
import { BankFormData, bankFormSchema } from "~/schemas";


export const AddBankModal = () => {
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
            options={[
              { value: "Product", label: "Product" },
              { value: "skill", label: "Skill" },
            ]}
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

          <div className={`flex items-center gap-4 pt-[32px] border-t`}>
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