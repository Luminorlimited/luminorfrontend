"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { IoMdDownload } from "react-icons/io";

import { Button } from "@/components/ui/button"

import { Search, X } from "lucide-react"
import { useClientPaymentQuery } from "@/redux/Api/paymentApi"
import Link from "next/link"
import LoaderAnimation from "./loader/LoaderAnimation"

export default function PaymentPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const { data: clientPayment, isLoading } = useClientPaymentQuery({})
    // Mock data for payments

    // console.log("payment", clientPayment);

    // Filter payments based on search term
    const filteredPayments = clientPayment?.data.filter(
        (payment: any) => {
            const fullName = `${payment.orderReciver.name.firstName} ${payment.orderReciver.name.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        }
    );


    return (
        <div className="container mx-auto py-6 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Payments to Retire Professional</h1>
            <p className="text-muted-foreground mb-8">Manage and track your payments to retirement professionals.</p>

            <Card className="border-0">
                <CardHeader className="pb-3">
                    <div className="flex flex-col gap-4">


                        <div className="border rounded-lg p-4 bg-muted/30">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full">
                                    <div className="flex items-center justify-between space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <label htmlFor="name-filter" className="text-sm font-medium whitespace-nowrap">
                                                Professional Name:
                                            </label>
                                            {searchTerm && (
                                                <Badge variant="outline" className="px-2 py-1">
                                                    Filtering active
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="name-filter"
                                                type="search"
                                                placeholder="Enter name to filter..."
                                                className="pl-8 w-full"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            {searchTerm && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full"
                                                    onClick={() => setSearchTerm("")}
                                                >
                                                    <X className="h-4 w-4" />
                                                    <span className="sr-only">Clear search</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        {isLoading ? <LoaderAnimation /> : (

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Sl</TableHead>
                                        <TableHead>Transaction Id</TableHead>
                                        <TableHead>Professional Name</TableHead>
                                        <TableHead>Project Name</TableHead>
                                        <TableHead className="hidden md:table-cell">Payment Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead>Requirement</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clientPayment?.data?.length > 0 || clientPayment?.data ? (
                                        filteredPayments.map((item: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell className="font-medium">#{item?.transaction?._id}</TableCell>
                                                <TableCell>
                                                    <Link className="text-primary" href={`/chat/${item?.orderReciver?._id}`}>
                                                        {item?.orderReciver?.name?.firstName} {item?.orderReciver?.name?.lastName}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link className="text-primary" href={`/project/${item?._id}`}>
                                                        {item?.project?.projectName}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">{item.totalPrice}</TableCell>
                                                <TableCell className="text-center">
                                                    <Link className="text-primary" href={item.clientRequerment} download>
                                                        <IoMdDownload className="text-2xl" />
                                                    </Link>
                                                </TableCell>
                                                <TableCell
                                                    className={`${item?.transaction?.paymentStatus === "pending"
                                                        ? "text-yellow-600 border-yellow-400 "
                                                        : "bg-green-500 hover:bg-green-600"
                                                        }`}
                                                >
                                                    {item?.transaction?.paymentStatus}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No results found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                        {searchTerm ? (
                            <span>
                                Showing {filteredPayments.length} of {clientPayment?.data.length} payments (filtered by name:{" "}
                                <span className="font-medium">{searchTerm}</span>)
                            </span>
                        ) : (
                            <span>Showing all {clientPayment?.data.length} payments</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

