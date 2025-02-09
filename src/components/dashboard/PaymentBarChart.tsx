"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { useYearlyTransactionQuery } from "@/redux/Api/dashboard/ordersApi";


export default function PayementBarChart() {
    
    const { data: yearlyTransaction } = useYearlyTransactionQuery(undefined)
    console.log("my yearly transaction is", yearlyTransaction?.data?.yearlyIncome);
    const processedData = yearlyTransaction?.data?.yearlyIncome.map((item:any, index:number, arr:any) => {
        const prevValue = index > 0 ? arr[index - 1].totalIncome : item.totalIncome;
        return {
            ...item,
            fill: item.value > prevValue ? "#5633D1" : "#828181", // Set color dynamically
        };
    });

    
    return (
        <div className="bg-bg_secondary p-6 rounded-[15px] w-full max-w-full overflow-x-auto">
            <div className="flex justify-between items-center mb-6 min-w-[600px]">
                <h2 className="text-xl text-black">Statistics</h2>
               
            </div>

            <div className="h-[350px] w-full min-w-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={processedData}
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                        barGap={8} // Adjust spacing between bars
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#333"
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#666" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#666" }}
                            ticks={[0, 30, 50, 70, 90, 110]}
                            domain={[0, 110]}
                            tickFormatter={(value: any) => `$${value}`}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            radius={[10, 10, 0, 0]}
                            barSize={20}
                            shape={(props: any) => {
                                const { x, y, width, height, payload } = props;
                                return (
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={payload.fill}
                                        rx={10}
                                        ry={10}
                                    />
                                );
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
