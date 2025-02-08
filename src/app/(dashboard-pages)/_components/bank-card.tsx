import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/utils/utils";

interface BankCardProperties {
  bankName: string;
  accountNumber: string;
  accountName: string;
  className?: string;
}

export const BankCard = ({ bankName, accountNumber, accountName, className }: BankCardProperties) => {
  return (
    <section
      className={cn(`flex items-start justify-between rounded-lg bg-low-purple p-6 lg:max-w-[357px]`, className)}
    >
      <section className={`flex items-start gap-3`}>
        <div>
          <Avatar className={`h-8 w-8 bg-mid-purple`}>
            <AvatarImage className={`bg-mid-purple`} src={"https://github.com/shadcn.png"} />
            <AvatarFallback className={`text-xs`}>{`FB`}</AvatarFallback>
          </Avatar>
        </div>
        <div className={`space-y-1`}>
          <p className="font-bold">{bankName}</p>
          <p className="text-sm">{accountNumber}</p>
          <p className="text-sm">{accountName}</p>
        </div>
      </section>
      <section>
        <Checkbox
          checked
          className={cn(
            "h-6 w-6 rounded-full border-2",
            //  isCompleted ? "border-black bg-primary" : "border-primary"
          )}
        />
      </section>
    </section>
  );
};
