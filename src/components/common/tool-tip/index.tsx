import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";

export const SetToolTip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  return (
    <Tooltip content={content}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
    </Tooltip>
  );
};
