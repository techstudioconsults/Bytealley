"use client";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 215 },
  { month: "July", desktop: 460 },
  { month: "August", desktop: 59 },
  { month: "September", desktop: 214 },
  { month: "October", desktop: 187 },
  { month: "November", desktop: 12 },
  { month: "December", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#6D5DD3",
  },
} satisfies ChartConfig;

export function Line_Chart() {
  return (
    <section className="rounded-[8px] border bg-white p-[24px]">
      <div className="mb-[36px] flex items-start justify-between lg:items-center">
        <div className="flex flex-col items-center gap-[30px] lg:flex-row">
          <h6 className="text-[14px] font-[700] text-high-grey-III lg:text-[18px]">Overview</h6>
          <div className="flex items-start lg:items-center">
            <span className="flex items-center text-[12px]">
              <LuDot className="inline h-[60px] w-[60px] text-[#28166F]" />
              <span>Data</span>
            </span>
          </div>
        </div>
        <div>
          <IoEllipsisVerticalSharp />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line dataKey="desktop" fill="var(--color-desktop)" strokeWidth={3} />
        </LineChart>
      </ChartContainer>
    </section>
  );
}
