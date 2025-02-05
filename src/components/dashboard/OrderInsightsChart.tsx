"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { day: "Mon", value: 0 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 25 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 65 },
  { day: "Sun", value: 100 },
];

export default function OrderInsightsCard() {
  return (
    <div className=" p-6 rounded-lg w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-6 min-w-[400px]">
        <h2 className="text-xl text-black ">Order insights</h2>
        <Button
          variant="outline"
          className="text-gray-400 bg-transparent border-gray-700"
        >
          Weekly
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="h-[400px] w-full min-w-[400px] ">
        <ResponsiveContainer width="100%" className={"w-full"} height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#181818"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              ticks={[0, 10, 30, 50, 70, 90, 100]}
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke="#181818"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
