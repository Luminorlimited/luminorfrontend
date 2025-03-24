"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ClockIcon, CreditCardIcon, FileTextIcon, UserIcon } from "lucide-react"
import { useGetSingleOrderQuery } from "@/redux/Api/paymentApi"
import { useParams } from "next/navigation"
import Link from "next/link"
import LoaderAnimation from "../loader/LoaderAnimation"

export default function OrderDetailsPage() {
    const [order,] = useState({
        _id: "67c6d38810257ff11d055623",
        clientRequerment:
            "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
        orderFrom: {
            name: {
                firstName: "Basias",
                lastName: "Tylers",
            },
            email: "reltokuknu@gufum.com",
        },
        orderReciver: {
            name: {
                firstName: "Leilani",
                lastName: "Aguilar",
            },
            email: "refemu@dreamclarify.org",
        },
        deliveryDate: "1",
        totalPrice: "38.4",
        transaction: {
            amount: 38.4,
            paymentStatus: "pending",
            charge: 6.4,
        },
        createdAt: "2025-03-04T10:18:48.943Z",
    })

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

    const offerId = useParams();
    const { data: getSingleOrder, isLoading } = useGetSingleOrderQuery(offerId.id);
    const orderDetails = getSingleOrder?.data
    console.log("object", orderDetails);

    return (
        <div className="container mx-auto py-8 px-4">
            {isLoading ? <div className="min-h-screen"><LoaderAnimation /></div> : null}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#5633D1]">Order Details</h1>
                    <p className="text-gray-500">Order ID: {orderDetails?.result?._id}</p>
                </div>
                <Badge
                    className="mt-2 md:mt-0 text-white"
                    style={{ backgroundColor: orderDetails?.result?.transaction?.paymentStatus === "pending" ? "#FFA500" : "#5633D1" }}
                >
                    {orderDetails?.result?.transaction?.paymentStatus.toUpperCase()}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-[#5633D1]" />
                            Client Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="font-medium">
                                {orderDetails?.client?.name?.firstName} {orderDetails?.client?.name?.lastName}
                            </p>
                            {/* <p className="text-gray-500">{orderDetails?.client?.orderFrom.email}</p> */}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-[#5633D1]" />
                            Professional Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="font-medium">
                                {orderDetails?.retireProfessional?.name?.firstName} {orderDetails?.retireProfessional?.name?.lastName}
                            </p>
                            {/* <p className="text-gray-500">{order.orderReciver.email}</p> */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <FileTextIcon className="h-5 w-5 text-[#5633D1]" />
                        Order Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Created On</h3>
                            <p className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4 text-[#5633D1]" />
                                {DeliveryformatDate(
                                    new Date(orderDetails?.result?.createdAt).setDate(
                                        new Date(orderDetails?.result?.createdAt).getDate() +
                                        // Sum of milestones delivery times
                                        (orderDetails?.result?.project?.milestones?.reduce(
                                            (total: number, milestone: any) => total + (milestone.delivery ?? 0),
                                            0 // Default to 0 if no milestone delivery time
                                        ) ?? 0) +
                                        // Sum of hourlyFee.delivery if exists
                                        (orderDetails?.result?.project?.hourlyFee?.delivery ?? 0) +
                                        // Sum of flatFee.delivery if exists
                                        (orderDetails?.result?.project?.flatFee?.delivery ?? 0)
                                    )
                                )}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Delivery Time</h3>
                            <p className="flex items-center gap-2 mt-1">
                                <ClockIcon className="h-4 w-4 text-[#5633D1]" />
                                {DeliveryformatDate(
                                    new Date(orderDetails?.result?.createdAt).setDate(
                                        new Date(orderDetails?.result?.createdAt).getDate() +
                                        // Sum of milestones delivery times
                                        (orderDetails?.result?.project?.milestones?.reduce(
                                            (total: number, milestone: any) => total + (milestone.delivery ?? 0),
                                            0 // Default to 0 if no milestone delivery time
                                        ) ?? 0) +
                                        // Sum of hourlyFee.delivery if exists
                                        (orderDetails?.result?.project?.hourlyFee?.delivery ?? 0) +
                                        // Sum of flatFee.delivery if exists
                                        (orderDetails?.result?.project?.flatFee?.delivery ?? 0)
                                    )
                                )}
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-500">Client Requirements</h3>
                            <div className="mt-2">
                                <Link
                                    href={orderDetails?.result?.clientRequerment || ''}

                                    className="inline-flex items-center gap-2 text-[#5633D1] hover:underline"
                                >
                                    <FileTextIcon className="h-4 w-4" />
                                    View Requirements Document
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCardIcon className="h-5 w-5 text-[#5633D1]" />
                        Payment Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${orderDetails?.result?.project?.totalReceive.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Service Fee</span>
                            <span>${orderDetails?.result?.project?.serviceFee.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center font-medium">
                            <span>Total</span>
                            <span className="text-lg text-[#5633D1]">${orderDetails?.result?.project?.totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="pt-4">
                            <Link href={`/project/${order?._id}`} className="w-full bg-[#5633D1] block py-3 rounded-[8px] text-lg text-white font-medium text-center hover:bg-[#4628b0]">
                                View Payment Details
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

