"use client";

import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

// import { SetToolTip } from "~/components/common/tool-tip";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/utils/utils";

export const DateRangePicker = ({
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange: (range: DateRange) => void;
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range) {
      onDateChange(range);
    }
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {/* <SetToolTip content="Filter by date range"> */}
          <div
            className={cn(
              "flex h-12 w-full items-center justify-between gap-8 rounded-md border-default px-4 text-left text-sm",
            )}
          >
            <span id="date" className={cn(!date && "text-muted-foreground")}>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </span>
            <ChevronDown />
          </div>
          {/* </SetToolTip> */}
        </PopoverTrigger>
        <PopoverContent className="w-auto border-default p-0" align={`start`}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
