"use client"

// import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { useClientPaymentQuery } from "@/redux/Api/paymentApi"
import LoaderAnimation from "../loader/LoaderAnimation"

export default function ClientOrder() {
    // const [orders,] = useState([
    //     {
    //         _id: "67c6d38810257ff11d055623",
    //         projectName: "Website Redesign",
    //         clientRequerment:
    //             "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
    //         orderFrom: {
    //             name: {
    //                 firstName: "Basias",
    //                 lastName: "Tylers",
    //             },
    //             email: "reltokuknu@gufum.com",
    //         },
    //         orderReciver: {
    //             name: {
    //                 firstName: "Leilani",
    //                 lastName: "Aguilar",
    //             },
    //             email: "refemu@dreamclarify.org",
    //         },
    //         deliveryDate: "1",
    //         totalPrice: "38.4",
    //         status: "completed",
    //         transaction: {
    //             amount: 38.4,
    //             paymentStatus: "paid",
    //             charge: 6.4,
    //         },
    //         createdAt: "2025-03-04T10:18:48.943Z",
    //     },
    //     {
    //         _id: "67c6d38810257ff11d055624",
    //         projectName: "Mobile App Development",
    //         clientRequerment:
    //             "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
    //         orderFrom: {
    //             name: {
    //                 firstName: "John",
    //                 lastName: "Smith",
    //             },
    //             email: "john@example.com",
    //         },
    //         orderReciver: {
    //             name: {
    //                 firstName: "Maria",
    //                 lastName: "Rodriguez",
    //             },
    //             email: "maria@example.com",
    //         },
    //         deliveryDate: "7",
    //         totalPrice: "120.5",
    //         status: "in-progress",
    //         transaction: {
    //             amount: 120.5,
    //             paymentStatus: "paid",
    //             charge: 15.5,
    //         },
    //         createdAt: "2025-03-01T08:18:48.943Z",
    //     },
    //     {
    //         _id: "67c6d38810257ff11d055625",
    //         projectName: "Logo Design",
    //         clientRequerment:
    //             "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
    //         orderFrom: {
    //             name: {
    //                 firstName: "Emma",
    //                 lastName: "Johnson",
    //             },
    //             email: "emma@example.com",
    //         },
    //         orderReciver: {
    //             name: {
    //                 firstName: "David",
    //                 lastName: "Chen",
    //             },
    //             email: "david@example.com",
    //         },
    //         deliveryDate: "3",
    //         totalPrice: "45.0",
    //         status: "pending",
    //         transaction: {
    //             amount: 45.0,
    //             paymentStatus: "pending",
    //             charge: 5.0,
    //         },
    //         createdAt: "2025-03-02T14:18:48.943Z",
    //     },
    //     {
    //         _id: "67c6d38810257ff11d055626",
    //         projectName: "Content Writing",
    //         clientRequerment:
    //             "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
    //         orderFrom: {
    //             name: {
    //                 firstName: "Michael",
    //                 lastName: "Brown",
    //             },
    //             email: "michael@example.com",
    //         },
    //         orderReciver: {
    //             name: {
    //                 firstName: "Sarah",
    //                 lastName: "Wilson",
    //             },
    //             email: "sarah@example.com",
    //         },
    //         deliveryDate: "2",
    //         totalPrice: "65.75",
    //         status: "completed",
    //         transaction: {
    //             amount: 65.75,
    //             paymentStatus: "paid",
    //             charge: 8.75,
    //         },
    //         createdAt: "2025-02-28T09:18:48.943Z",
    //     },
    // ])

        const { data: clientOrder, isLoading } = useClientPaymentQuery({})
        console.log("client Payment", clientOrder);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-500 hover:bg-green-500"
            case "pending":
                return "bg-amber-600 hover:bg-amber-700 "
            case "revision":
                return "bg-rose-700 hover:bg-rose-700"
            default:
                return "bg-gray-500"
        }
    }

    // const formatDate = (dateString: string) => {
    //     const date = new Date(dateString)
    //     return new Intl.DateTimeFormat("en-US", {
    //         year: "numeric",
    //         month: "short",
    //         day: "numeric",
    //     }).format(date)
    // }


    const DeliveryformatDate = (dateString: any) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };
    return (
        <div className="container mx-auto  py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">My Orders</h1>
                <p className="text-gray-500">Manage and track all your project orders</p>
            </div>

            {isLoading ? <div className="min-h-screen"><LoaderAnimation /></div> : null}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {clientOrder?.data && clientOrder?.data.map((order:any, index:any) => (
                    <Card key={index} className="overflow-hidden rounded-[10px] border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div
                            className="h-2 w-full"
                            style={{
                                backgroundColor:
                                    getStatusColor(order?.transaction?.paymentStatus).replace("bg-", "") === "bg-primary"
                                        ? "#5633D1"
                                        : getStatusColor(order?.transaction?.paymentStatus).replace("bg-", ""),
                            }}
                        ></div>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="font-bold  text-lg text-gray-800 mb-1 line-clamp-1">{order?.project?.projectName}</h2>
                                    <p className="text-sm text-gray-500 mb-2">Order ID: {order?._id.substring(order._id.length - 8)}</p>
                                </div>
                                <Badge className={`${getStatusColor(order?.transaction?.paymentStatus)} text-white`}>
                                    {order?.transaction?.paymentStatus.charAt(0).toUpperCase() + order?.transaction?.paymentStatus.slice(1)}
                                </Badge>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <UserIcon className="h-4 w-4 text-primary" />
                                    <span className="text-gray-700">
                                        {order?.orderReciver?.name?.firstName} {order?.orderReciver?.name?.lastName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <ClockIcon className="h-4 w-4 text-primary" />
                                    <span className="text-gray-700">
                                        <b>Delivery Date: </b>
                                        {DeliveryformatDate(
                                            new Date(order?.createdAt).setDate(
                                                new Date(order?.createdAt).getDate() +
                                                // Sum of milestones delivery times
                                                (order?.project?.milestones?.reduce(
                                                    (total: number, milestone: any) => total + (milestone.delivery ?? 0),
                                                    0 // Default to 0 if no milestone delivery time
                                                ) ?? 0) +
                                                // Sum of hourlyFee.delivery if exists
                                                (order?.project?.hourlyFee?.delivery ?? 0) +
                                                // Sum of flatFee.delivery if exists
                                                (order?.project?.flatFee?.delivery ?? 0)
                                            )
                                        )}
                                        
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarIcon className="h-4 w-4 text-primary" />
                                    <span className="text-gray-700"> <b> Created on </b> {DeliveryformatDate(order?.createdAt)}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <span className="text-primary">${Number.parseFloat(order?.project?.totalPrice).toFixed(2)}</span>
                                    {/* <span className="text-gray-500">•</span> */}
                                    {/* <span
                                        className={`${order?.transaction?.paymentStatus === "completed" ? "text-green-600" : "text-amber-600"}`}
                                    >
                                        {order?.transaction?.paymentStatus.charAt(0).toUpperCase() + order?.transaction?.paymentStatus.slice(1)}
                                    </span> */}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="px-6 py-3">
                            <Link href={`/clientOrder/${order._id}`} className="w-full">
                                <Button className="w-full bg-primary hover:bg-[#4628b0] rounded-[7px]">View Details</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

