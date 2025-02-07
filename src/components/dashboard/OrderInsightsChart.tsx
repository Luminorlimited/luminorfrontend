"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Menu } from "lucide-react";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample datasets
const weeklyData = [
  { day: "Mon", value: 0 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 25 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 65 },
  { day: "Sun", value: 100 },
];

const monthlyData = [
  { day: "January", value: 60 },
  { day: "February", value: 75 },
  { day: "March", value: 50 },
  { day: "April", value: 90 },
];

export default function OrderInsightsCard() {
  const [chartData, setChartData] = useState(weeklyData);
  const [viewMode, setViewMode] = useState("Weekly");

  const handleToggleView = () => {
    if (viewMode === "Weekly") {
      setViewMode("Monthly");
      setChartData(monthlyData);
    } else {
      setViewMode("Weekly");
      setChartData(weeklyData);
    }
  };
  const statusOptions = ["Monthly", "Weekly"];
  const [status, setStatus] = useState("all");



  return (
    <div className="p-6 rounded-lg w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-6 min-w-[400px]">
        <h2 className="text-xl text-black ">Order insights</h2>
        <Button
          variant="outline"
          onClick={handleToggleView}
          className="text-gray-400 bg-transparent border-gray-700"
        >
          {viewMode}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent border-gray-700 text-gray-900 hover:bg-gray-300 hover:text-gray-800 gap-2"
            >
              Payment Status Filter
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-300 border-gray-700">
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={setStatus}
            >
              {statusOptions?.map((item, indx) => (
                <DropdownMenuRadioItem
                  key={indx}
                  value={item}
                  className="text-gray-900 focus:bg-white focus:text-gray-900"
                >
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[400px] w-full min-w-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              ticks={[0, 20, 40, 60, 80, 100]}
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
