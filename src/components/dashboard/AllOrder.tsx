"use client";

// import { useState } from "react";
// import { Menu } from "lucide-react";
// import { toast } from "sonner";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
import { useTotalOrderQuery } from "@/redux/Api/dashboard/ordersApi";
import SkeletonOrderList from "./skeleton/SkeletonOrderList";

// interface Order {
//     customerName: string;
//     email: sexample@gmail.com
//     paymentMethod: string;
//     location: string;
//     orderStatus: "Delivered" | "Refunds" | "Returns";
//     orderSL: string;
// }

export default function AllOrders() {

    // const [openOrderStatus, setOpenOrderStatus] = useState<number | null>(null);
    // const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

    // const statusOptions = ["Completed", "Pending", "Failed"];
    // const orderStatusOptions = ["Shipped", "Delivered", "Refunds", "Returns"];
    // const [status, setStatus] = useState("all");

    // const orders = [
    //     {
    //         customerName: "Johan Smith",
    //         email: "example@gmail.com",
    //         paymentMethod: "Credit Card",
    //         location: "Loss Angles",
    //         orderStatus: "Completed",
    //         orderSL: "#d445448841",
    //     },
    //     {
    //         customerName: "Johan Smith",
    //         email: "example@gmail.com",
    //         paymentMethod: "Credit Card",
    //         location: "Loss Angles",
    //         orderStatus: "Delivered",
    //         orderSL: "#d445448841",
    //     },
    //     {
    //         customerName: "Johan Smith",
    //         email: "example@gmail.com",
    //         paymentMethod: "Credit Card",
    //         location: "Loss Angles",
    //         orderStatus: "Delivered",
    //         orderSL: "#d445448841",
    //     },
    //     {
    //         customerName: "Johan Smith",
    //         email: "example@gmail.com",
    //         location: "Loss Angles",
    //         paymentMethod: "Credit Card",
    //         orderStatus: "Delivered",
    //         orderSL: "#d445448841",
    //     },
    //     {
    //         customerName: "Johan Smith",
    //         email: "example@gmail.com",
    //         paymentMethod: "Credit Card",
    //         location: "Loss Angles",
    //         orderStatus: "Delivered",
    //         orderSL: "#d445448841",
    //     },
    // ]

    // const getStatusColor = (status: string) => {
    //     const statusColors: Record<string, string> = {
    //         Completed: "text-green-500",
    //         Pending: "text-yellow-500",
    //         Refunds: "text-blue-500",
    //         Failed: "text-red-500",
    //         Delivered: "text-amber-500",
    //         Returns: "text-red-500",
    //     };
    //     return statusColors[status] || "text-gray-500";
    // };

    const { data: getAllOrders, isLoading } = useTotalOrderQuery(undefined)
    console.log("get all orders", getAllOrders?.data?.result);

     if (isLoading) {
         return <SkeletonOrderList />
        }

    return (
        <div className=" bg-bg_secondary px-2 rounded-[12px] min-h-[80vh]">
            <div>
                <div className="mb-6 flex items-center justify-between p-5">
                    <h1 className="text-2xl font-medium text-black">All Order list</h1>
                   
                </div>

                <div className="rounded-lg overflow-x-auto min-h-[50vh]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-600 text-sm font-medium text-gray-950">
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Order From</th>
                                <th className="p-4 text-left">Order Receiver</th>
                                <th className="p-4 text-left">Project Type</th>
                                <th className="p-4 text-left">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllOrders?.data && getAllOrders?.data?.result.map((order: any, index: number) => (
                                <tr
                                    key={index}
                                    className={`text-sm text-gray-900  border-b border-gray-700 hover:bg-gray-300`}
                                // onClick={() => handleOrderSelect(index)}
                                >
                                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                    <td className="p-4">{order?.orderFrom?.name?.firstName} {order?.orderFrom?.name?.lastName}</td>
                                    {/* <td className="p-4">{order.paymentMethod}</td> */}
                                    <td className="p-4">{order?.orderReciver?.name?.firstName} {order?.orderReciver?.name?.lastName}</td>
                                    <td className="p-4">{order?.project?.agreementType} </td>
                                    <td className="p-4">{order?.project?.totalPrice} </td>

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
        </div>
    );
}
