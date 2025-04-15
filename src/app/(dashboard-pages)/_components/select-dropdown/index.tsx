"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/utils/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProperties {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  disabled?: boolean;
}

export const SelectDropdown = ({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  triggerClassName = "h-[48px] w-[180px]",
  disabled,
}: SelectDropdownProperties) => {
  return (
    <Select disabled={disabled} value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("gap-8 rounded-md border-default", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`border-default`}>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
