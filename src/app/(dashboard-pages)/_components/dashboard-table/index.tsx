import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontal } from "lucide-react";

import CustomButton from "~/components/common/common-button/common-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { cn } from "~/utils/utils";

export const DashboardTable = <T extends DataItem>({
  data,
  columns,
  currentPage = 1,
  onPageChange,
  totalPages = 1,
  itemsPerPage = 10,
  rowActions,
  onRowClick,
  showPagination = true,
}: IDashboardTableProperties<T>) => {
  return (
    <div className="w-full space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className={`bg-muted`}>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
              {rowActions && <TableHead className="w-[50px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => {
                  if (onRowClick) onRowClick(item);
                }}
                className={cn(onRowClick ? "cursor-pointer hover:bg-muted/50" : "", "text-[16px] hover:bg-muted/50")}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {column.render ? column.render(item[column.accessorKey], item) : item[column.accessorKey]}
                  </TableCell>
                ))}
                {rowActions && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={`p-2`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {rowActions(item).map((action: IRowAction<T>, actionIndex: number) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={(event) => {
                              event.stopPropagation();
                              action.onClick(item);
                            }}
                          >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-lg border bg-card p-5 transition-all",
              "hover:border-primary/50 hover:shadow-md",
              onRowClick && "cursor-pointer",
            )}
            onClick={() => {
              if (onRowClick) onRowClick(item);
            }}
            aria-label={`View details for item ${item.id || index}`}
          >
            {/* Card Header - Can show primary info like ID, status, etc */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">
                  {columns[0]?.render
                    ? columns[0].render(item[columns[0]?.accessorKey ?? ""], item)
                    : (item[columns[0]?.accessorKey ?? ""] ?? "N/A")}
                </div>
                {columns.at(-1)?.render ? (
                  columns.at(-1)?.render(item[columns.at(-1)?.accessorKey ?? ""], item)
                ) : (
                  <span>{item[columns.at(-1)?.accessorKey ?? ""] ?? "N/A"}</span>
                )}
              </div>
              {rowActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-8 w-8 p-0" aria-label="Open menu">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {rowActions(item).map((action: IRowAction<T>, actionIndex: number) => (
                      <DropdownMenuItem
                        key={actionIndex}
                        onClick={(event) => {
                          event.stopPropagation();
                          action.onClick(item);
                        }}
                      >
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Card Content - Other columns */}
            <div className="grid grid-cols-2 gap-4">
              {columns.slice(1, -1).map((column, colIndex) => (
                <div key={colIndex} className="space-y-1">
                  <p className="text-xs font-medium uppercase text-muted-foreground/60">{column.header}</p>
                  <div className="text-sm font-medium">
                    {column.render ? (
                      column.render(item[column.accessorKey ?? ""], item)
                    ) : (
                      <span>{item[column.accessorKey ?? ""] ?? "N/A"}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hover Effect Indicator */}
            {onRowClick && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="flex flex-col-reverse gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>{itemsPerPage} Entries per page</div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <CustomButton
              variant="outline"
              isLeftIconVisible
              size={`lg`}
              icon={<ChevronLeftIcon />}
              className={cn(currentPage === 1 ? "opacity-50" : "", "w-full rounded-sm sm:w-[137px]")}
              onClick={() => onPageChange?.(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </CustomButton>
            <CustomButton
              variant="outline"
              isRightIconVisible
              size={`lg`}
              icon={<ChevronRightIcon />}
              className={cn(currentPage === totalPages ? "opacity-50" : "", "w-full rounded-sm sm:w-[137px]")}
              onClick={() => onPageChange?.(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            >
              Next
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};
