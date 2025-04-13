"use client";

import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "~/components/ui/button";
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
          <Button
            id="date"
            variant={"outline"}
            size={"xl"}
            className={cn(
              "w-full justify-between text-left font-normal shadow-none lg:max-w-[300px]",
              !date && "text-muted-foreground",
            )}
          >
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
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-default w-auto p-0" align={`start`}>
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
