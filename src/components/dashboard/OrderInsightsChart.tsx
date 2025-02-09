"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Menu } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useOrderInsightQuery } from "@/redux/Api/dashboard/ordersApi"

interface TimelineData {
  day: string
  value: number
}

interface OrderInsightData {
  timeframe: string
  totalOrders: number
  totalRevenue: number
  timeline: { [key: string]: number }
}

export default function OrderInsightsCard() {
  const [chartData, setChartData] = useState<TimelineData[]>([])
  const [viewMode, setViewMode] = useState("weekly")
  const [insightData, setInsightData] = useState<OrderInsightData | null>(null)

  const { data, isLoading, error } = useOrderInsightQuery({ timeframe: viewMode })

  useEffect(() => {
    if (data && data.success) {
      const timelineData = Object.entries(data.data.timeline).map(([key, value]) => ({
        day: key,
        value: Number(value),
      }))
      setChartData(timelineData)
      setInsightData(data.data)
    }
  }, [data])

  const handleToggleView = (selectedView: string) => {
    setViewMode(selectedView.toLowerCase())
  }

  const statusOptions = ["Weekly", "Monthly"]

  return (
    <div className="p-6 rounded-lg w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-6 min-w-[400px]">
        <h2 className="text-xl text-black">Order insights</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent border-gray-700 text-gray-900 hover:bg-gray-300 hover:text-gray-800 gap-2"
            >
              {viewMode === "weekly" ? "Weekly" : "Monthly"}
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-300 border-gray-700">
            <DropdownMenuRadioGroup value={viewMode} onValueChange={handleToggleView}>
              {statusOptions.map((item, index) => (
                <DropdownMenuRadioItem
                  key={index}
                  value={item.toLowerCase()}
                  className="text-gray-900 focus:bg-white focus:text-gray-900"
                >
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {insightData && (
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-black">{insightData.totalOrders}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-black">${insightData.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="h-[400px] w-full min-w-[400px]">
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error fetching data.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#181818" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666" }} allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#181818"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

