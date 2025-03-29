import { EllipsisVertical } from "lucide-react";
import { useState } from "react"; // Import useState

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { SettingsService } from "~/services/settings.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";
import { cn } from "~/utils/utils";

const BaseBankCard = ({
  settingsService,
  bankName,
  accountNumber,
  accountName,
  active: initialActive,
  className,
  accountID,
}: {
  accountID: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  active: boolean;
  className?: string;
  settingsService: SettingsService;
}) => {
  const [active, setActive] = useState(initialActive);
  const { fetchCurrentUser } = useSession();

  const handleAccountStatus = async () => {
    const newStatus = !active;
    setActive(newStatus);

    const response = await settingsService.changeAccountStatus(
      {
        active: newStatus,
      },
      accountID,
    );

    if (response) {
      Toast.getInstance().showToast({
        title: "Success",
        description: `Account ${accountName} has been ${newStatus ? "enabled" : "disabled"}`,
        variant: "default",
      });
      await fetchCurrentUser();
    }
  };

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
      <section className={`flex h-full flex-col justify-between`}>
        <Checkbox
          checked={active}
          className={cn("h-6 w-6 rounded-full border-2", active ? "border-black bg-primary" : "border-primary")}
          onClick={handleAccountStatus}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-[5px] focus:outline-none active:outline-none">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-[999999]">
            <DropdownMenuItem
              onClick={handleAccountStatus}
              className={cn(active ? "text-mid-danger" : "text-mid-success")}
            >
              {active ? `Disable` : `Enable`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </section>
  );
};

export const BankCard = WithDependency(BaseBankCard, {
  settingsService: dependencies.SETTINGS_SERVICE,
});
