import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const SelectDropdown = () => {
  return (
    <Select>
      <SelectTrigger className="h-[48px] w-[180px]">
        <SelectValue placeholder="Select a product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">All Products</SelectItem>
          <SelectItem value="banana">UI/UX Design</SelectItem>
          <SelectItem value="blueberry">Web Development</SelectItem>
          <SelectItem value="grapes">Mobile Development</SelectItem>
          <SelectItem value="pineapple">Product Management</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
