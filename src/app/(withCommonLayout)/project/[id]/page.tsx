'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSingleOrderQuery } from "@/redux/Api/paymentApi";
import {
    FileText,
    Calendar,
    DollarSign,
    Clock,
    User,
    Briefcase,
    FileCheck,
    ExternalLink,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const offerId = useParams();
    const { data: getSingleOrder, isLoading, error } = useGetSingleOrderQuery(offerId.id);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('Error fetching single order:', error);
        return <div>Error loading order</div>;
    }

    // console.log('Offer is', getSingleOrder);

    // Format date to a readable format
    const formatDate = (dateString: any) => {
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

    // console.log("my offer", getSingleOrder);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-gray-50 py-10 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header with animated gradient */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-indigo-600 to-violet-600 p-8 mb-10 shadow-lg">
                    <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Order Details</h1>
                            <p className="text-indigo-200 font-medium">
                                Order ID: <span className="font-mono bg-white/20 px-2 py-1 rounded text-sm">{getSingleOrder?.data?.result?._id}</span>
                            </p>
                        </div>
                        <Badge
                            className={`mt-4 md:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${getSingleOrder?.data?.result?.transaction?.paymentStatus === "pending"
                                ? "bg-amber-500 text-gray-950 hover:bg-amber-500"
                                : "bg-emerald-500 text-emerald-950 hover:bg-emerald-500"
                                }`}
                        >
                            {getSingleOrder?.data?.result?.transaction?.paymentStatus === "pending" ? (
                                <div className="flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Pending</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Completed</span>
                                </div>
                            )}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Order Summary Card */}
                    <Card className="md:col-span-2 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-gray-500 to-gray-500 p-4">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Briefcase className="h-5 w-5" />
                                Project Summary
                            </CardTitle>
                        </div>
                        <CardContent className="p-6 pt-6">
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-1">Project Name</h3>
                                    <p className="text-gray-800 font-semibold">{getSingleOrder?.data?.result?.project?.projectName}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                                    <p className="text-gray-900">{getSingleOrder?.data?.result?.project?.description}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-1">Agreement Type</h3>
                                    <p className="text-gray-800 font-semibold">{getSingleOrder?.data?.result?.project?.agreementType.replace("_", " ")}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-800 mb-1">Revisions</h3>
                                        <p className="text-gray-900 text-2xl font-bold">{getSingleOrder?.data?.result?.project?.flatFee?.revision}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-800 mb-1">Delivery Time</h3>
                                        <p className="text-gray-900 text-2xl font-bold">
                                            {getSingleOrder?.data?.result?.project?.flatFee?.delivery} <span className="text-sm font-normal">day(s)</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700 mb-1">Created At</h3>
                                    <p className="text-gray-900 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        {formatDate(getSingleOrder?.data?.result?.project?.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start p-6 pt-0">
                            <Button
                                className="bg-gradient-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                                asChild
                            >
                                <a href={getSingleOrder?.data?.result?.project?.orderAgreementPDF} target="_blank" rel="noopener noreferrer">
                                    <FileCheck className="h-4 w-4" />
                                    View Agreement PDF
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Payment Information Card */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-gray-500 to-gray-500 p-4">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <DollarSign className="h-5 w-5" />
                                Payment Information
                            </CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <div className="space-y-5">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-800 font-medium">Base Price:</span>
                                    <span className="text-emerald-900 font-bold">
                                        {getSingleOrder?.data?.result?.project?.flatFee?.price?.toFixed(2) ||
                                            getSingleOrder?.data?.result?.project?.hourlyFee?.price?.toFixed(2) ||
                                            getSingleOrder?.data?.result?.project?.milestones?.reduce(
                                                (total: number, milestone: any) => total + (milestone.price ?? 0),
                                                0 // Initial value for reduce
                                            )?.toFixed(2)}
                                    </span>

                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-800 font-medium">Service Fee:</span>
                                    <span className="text-gray-900 font-bold">${getSingleOrder?.data?.result?.project?.serviceFee?.toFixed(2)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-gray-100 rounded-lg">
                                    <span className="text-gray-900 font-semibold">Total Price:</span>
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-600">
                                        ${getSingleOrder?.data?.result?.project?.totalPrice}
                                    </span>
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-medium text-gray-700 mb-2">Payment Status</h3>
                                    <Badge
                                        className={`px-3 py-1 text-sm font-semibold ${getSingleOrder?.data?.result?.transaction?.paymentStatus === "pending"
                                            ? "bg-amber-100 text-gray-800 border border-amber-300 hover:bg-bg-amber-100"
                                            : "bg-emerald-100 text-gray-800 border border-emerald-300 hover:bg-bg-emerald-100"
                                            }`}
                                    >
                                        {getSingleOrder?.data?.result?.transaction?.paymentStatus === "pending" ? (
                                            <div className="flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>Pending</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Completed</span>
                                            </div>
                                        )}
                                    </Badge>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <h3 className="font-medium text-gray-700 mb-1">Payment ID</h3>
                                    <p className="text-sm break-all font-mono bg-gray-100 p-2 rounded border border-gray-200">
                                        {getSingleOrder?.data?.result?.paymentIntentId}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Details Card */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-4">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <User className="h-5 w-5" />
                                Professional Details
                            </CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <div className="space-y-5">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-1">Name</h3>
                                    <p className="text-gray-900 font-semibold text-lg">
                                        {getSingleOrder?.data?.retireProfessional?.name.firstName} {getSingleOrder?.data?.retireProfessional?.name.lastName}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                                    <p className="text-gray-900 break-all">{getSingleOrder?.data?.retireProfessional?.email}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-800 mb-1">Role</h3>
                                    <p className="text-gray-900 font-semibold">
                                        {getSingleOrder?.data?.retireProfessional?.role.replace(/([A-Z])/g, " $1").replace(/^./, (str:any) => str.toUpperCase())}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client Requirements Card */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-4">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <FileText className="h-5 w-5" />
                                Client Requirements
                            </CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-50 p-6 rounded-lg flex flex-col items-center justify-center">
                                <FileText className="h-16 w-16 text-gray-500 mb-4" />
                                <p className="text-gray-800 mb-4 text-center">
                                    View the client requirements document to understand project specifications
                                </p>
                                <Button
                                    className="bg-gradient-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center gap-2"
                                    asChild
                                >
                                    <Link href={getSingleOrder?.data?.result?.clientRequerment} target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-4 w-4" />
                                        View Requirements PDF
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Information Card */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-4">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Clock className="h-5 w-5" />
                                Delivery Information
                            </CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <div className="space-y-5">
                                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                                        <Clock className="h-6 w-6 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800 mb-1">Delivery Time</h3>
                                        <p className="text-gray-900 text-lg font-bold">
                                            {formatDate(
                                                new Date(getSingleOrder?.data?.result?.createdAt).setDate(
                                                    new Date(getSingleOrder?.data?.result?.createdAt).getDate() +
                                                    // Sum of milestones delivery times
                                                    (getSingleOrder?.data?.result?.project?.milestones?.reduce(
                                                        (total:number, milestone:any) => total + (milestone.delivery ?? 0),
                                                        0 // Default to 0 if no milestone delivery time
                                                    ) ?? 0) +
                                                    // Sum of hourlyFee.delivery if exists
                                                    (getSingleOrder?.data?.result?.project?.hourlyFee?.delivery ?? 0) +
                                                    // Sum of flatFee.delivery if exists
                                                    (getSingleOrder?.data?.result?.project?.flatFee?.delivery ?? 0)
                                                )
                                            )}
                                            <span className="text-sm font-normal">day(s)</span>


                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                                        <Calendar className="h-6 w-6 text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800 mb-1">Order Created</h3>
                                        <p className="text-gray-900">{formatDate(getSingleOrder?.data?.result?.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}