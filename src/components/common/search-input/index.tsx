import { FC, HTMLAttributes } from "react";
import { LuSearch } from "react-icons/lu";

import { cn } from "~/utils/utils";

interface SearchProperties extends HTMLAttributes<HTMLDivElement> {
  inputBackgroundColor?: string;
}

export const SearchInput: FC<SearchProperties> = ({ inputBackgroundColor, className, ...properties }) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-sm font-normal placeholder:text-sm",
        inputBackgroundColor,
        className,
      )}
      {...properties}
    >
      <LuSearch data-testid="search" className="text-neutral-dark-2 h-4 w-4" />
      <input
        className={cn(
          `text-neutral-dark-2 placeholder:text-neutral-dark-1 h-full w-full border-none outline-none ring-0`,
          inputBackgroundColor,
        )}
        placeholder="Search..."
        data-testid="input"
      />
    </div>
  );
};
