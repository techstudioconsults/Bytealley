import * as React from "react";
import { LuChevronRight, LuChevronsLeft, LuMoveHorizontal } from "react-icons/lu";

import { cn } from "~/utils/utils";
import { ButtonProperties, buttonVariants } from "./button";

const Pagination = ({ className, ...properties }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...properties}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...properties }, reference) => (
    <ul ref={reference} className={cn("flex flex-row items-center gap-1", className)} {...properties} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...properties }, reference) => <li ref={reference} className={cn("", className)} {...properties} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProperties = {
  isActive?: boolean;
} & Pick<ButtonProperties, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...properties }: PaginationLinkProperties) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...properties}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...properties }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...properties}
  >
    <LuChevronsLeft className="h-4 w-4" />
    {/* <span>Previous</span> */}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...properties }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...properties}>
    {/* <span>Next</span> */}
    <LuChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...properties }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...properties}>
    <LuMoveHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
