"use client";

import { Card } from "@/components/ui/card";
import { useTotalTransactionQuery } from "@/redux/Api/dashboard/ordersApi";
// import { Menu } from "lucide-react";

// import { useState } from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";




export default function PaymentPieChart() {
    // const statusOptions = ["Completed", "Pending", "Failed"];
    // const orderStatusOptions = ["Shipped", "Delivered", "Refunds", "Returns"];
    // const [status, setStatus] = useState("all");



    const { data: getTransaction, isLoading } = useTotalTransactionQuery(undefined)


    console.log("get transction", getTransaction);

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            pending: "text-red-500",
            delivered: "text-green-500",
        };
        return statusColors[status] || "text-gray-500";
    };

    if (isLoading) {
        return <div className="text-black text-2xl">Loading....</div>
    }


    return (
        <Card className="bg-bg_secondary  p-6 w-full border-none rounded-[15px] ">
            <div>
                <div className="mb-6 flex items-center justify-between p-5">
                    <h1 className="text-2xl font-medium text-black">Transaction listssss</h1>

                </div>

                <div className="rounded-lg overflow-x-auto min-h-[33vh]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-600 text-sm font-medium text-gray-950">
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Payment Status</th>
                                <th className="p-4 text-left">Order Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTransaction?.data && getTransaction?.data.map((order: any, index: number) => (
                                <tr
                                    key={index}
                                    className={`text-sm text-gray-900 cursor-pointer border-b border-gray-700 hover:bg-gray-300`}
                                // onClick={() => handleOrderSelect(index)}
                                >
                                    <td className="p-4">{order?.updatedAt}</td>
                                    <td className="p-4">{order?.amount}</td>
                                    {/* <td className="p-4">{order.paymentMethod}</td> */}
                                    <td className={`p-4 font-medium ${getStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</td>

                                    {/* <td className="p-4 relative font-medium">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenOrderStatus(
                                                    openOrderStatus === index ? null : index
                                                );
                                            }}
                                            className={`flex items-center gap-1 ${getStatusColor(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus}
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                        {openOrderStatus === index && (
                                            <div className="absolute left-0 top-full z-10 mt-1 w-36 rounded-md border border-gray-700 bg-gray-300 py-1 shadow-lg">
                                                {orderStatusOptions.map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOrderStatusChange(index, status);
                                                        }}
                                                        className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-800 ${getStatusColor(
                                                            status
                                                        )}`}
                                                    >
                                                        {status}
                                                        {order.orderStatus === status && (
                                                            <Check className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </td> */}
                                    <td className="p-4">#{order?.orderId?._id}</td>                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}
