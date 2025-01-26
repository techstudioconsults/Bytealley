import { Copy } from "lucide-react";

import { Toast } from "~/utils/notificationManager";
import { cn } from "~/utils/utils";

interface CopyActionProperties {
  className?: string;
  textToCopy: string;
  onCopy?: () => void;
}

export const CopyAction = ({ className, textToCopy, onCopy }: CopyActionProperties) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      Toast.getInstance().showToast({
        title: "Success",
        description: `Text copied to clipboard`,
        variant: "success",
      });
      if (onCopy) onCopy(); // Trigger the callback if provided
    } catch (error) {
      Toast.getInstance().showToast({
        title: "Error",
        description: `Failed to copy text: ${error}`,
        variant: "error",
      });
    }
  };

  return (
    <span className={cn("cursor-pointer", className)} onClick={handleCopy}>
      <Copy className={cn("h-4 w-4", className)} />
    </span>
  );
};
