"use client";

import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";




export default function PaymentPieChart() {
    const statusOptions = ["Completed", "Pending", "Failed"];
    // const orderStatusOptions = ["Shipped", "Delivered", "Refunds", "Returns"];
    const [status, setStatus] = useState("all");

    const orders = [
        {
            customerName: "Johan Smith",
            phoneNumber: "+5788585758",
            paymentMethod: "Credit Card",
            location: "Loss Angles",
            orderStatus: "Completed",
            orderSL: "#d445448841",
        },
        {
            customerName: "Johan Smith",
            phoneNumber: "+5788585758",
            paymentMethod: "Credit Card",
            location: "Loss Angles",
            orderStatus: "Delivered",
            orderSL: "#d445448841",
        },
    ]

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            Completed: "text-green-500",
            Pending: "text-yellow-500",
            Refunds: "text-blue-500",
            Failed: "text-red-500",
            Delivered: "text-amber-500",
            Returns: "text-red-500",
        };
        return statusColors[status] || "text-gray-500";
    };


    return (
        <Card className="bg-bg_secondary  p-6 w-full border-none rounded-[15px] ">
            <div>
                <div className="mb-6 flex items-center justify-between p-5">
                    <h1 className="text-2xl font-medium text-black">Transaction list</h1>
                    <div className="flex items-center gap-4">
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
                        <button className="text-sm hover:text-gray-700 text-gray-900 ">
                            See All
                        </button>
                    </div>
                </div>

                <div className="rounded-lg overflow-x-auto min-h-[33vh]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-600 text-sm font-medium text-gray-950">
                                <th className="p-4 text-left">Customer name</th>
                                <th className="p-4 text-left">Phone number</th>
                                <th className="p-4 text-left">Payment Method</th>
                                <th className="p-4 text-left">Location</th>
                                <th className="p-4 text-left">Order Status</th>
                                <th className="p-4 text-left">Order SL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`text-sm text-gray-900 cursor-pointer border-b border-gray-700 hover:bg-gray-300`}
                                // onClick={() => handleOrderSelect(index)}
                                >
                                    <td className="p-4">{order.customerName}</td>
                                    <td className="p-4">{order.phoneNumber}</td>
                                    <td className="p-4">{order.paymentMethod}</td>
                                    <td className="p-4">{order.location}</td>
                                    <td className={`p-4 font-medium ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</td>

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
                                    <td className="p-4">{order.orderSL}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}
