"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent,  CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Search,  X } from "lucide-react"

export default function PaymentPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Mock data for payments
    const payments = [
        {
            id: "INV-001",
            amount: "$1,250.00",
            professionalName: "Dr. Sarah Johnson",
            date: "2023-04-15",
            status: "Paid",
        },
        {
            id: "INV-002",
            amount: "$850.00",
            professionalName: "Dr. Michael Chen",
            date: "2023-04-20",
            status: "Pending",
        },
        {
            id: "INV-003",
            amount: "$2,100.00",
            professionalName: "Dr. Emily Rodriguez",
            date: "2023-04-22",
            status: "Paid",
        },
        {
            id: "INV-004",
            amount: "$750.00",
            professionalName: "Dr. James Wilson",
            date: "2023-04-25",
            status: "Failed",
        },
        {
            id: "INV-005",
            amount: "$1,500.00",
            professionalName: "Dr. Lisa Thompson",
            date: "2023-04-28",
            status: "Pending",
        },
        {
            id: "INV-006",
            amount: "$950.00",
            professionalName: "Dr. Robert Davis",
            date: "2023-05-01",
            status: "Paid",
        },
        {
            id: "INV-007",
            amount: "$1,800.00",
            professionalName: "Dr. Jennifer Martinez",
            date: "2023-05-05",
            status: "Pending",
        },
    ]

    // Filter payments based on search term
    const filteredPayments = payments.filter(
        (payment) =>
            payment.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Function to get badge color based on status
    const getStatusBadge = (status:any) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
            case "Pending":
                return (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                        Pending
                    </Badge>
                )
            case "Failed":
                return <Badge variant="destructive">Failed</Badge>
            case "Processing":
                return <Badge variant="secondary">Processing</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="container mx-auto py-6 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Payments to RetireProfessional</h1>
            <p className="text-muted-foreground mb-8">Manage and track your payments to retirement professionals.</p>

            <Card className="border-0">
                <CardHeader className="pb-3">
                    <div className="flex flex-col gap-4">
                     

                        <div className="border rounded-lg p-4 bg-muted/30">
                            <div className="text-sm font-medium mb-3">Search Filters</div>
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Professional</TableHead>
                                    <TableHead className="hidden md:table-cell">Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.id}</TableCell>
                                            <TableCell>{payment.professionalName}</TableCell>
                                            <TableCell className="hidden md:table-cell">{payment.date}</TableCell>
                                            <TableCell className="text-right">{payment.amount}</TableCell>
                                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                           
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
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                        {searchTerm ? (
                            <span>
                                Showing {filteredPayments.length} of {payments.length} payments (filtered by name:{" "}
                                <span className="font-medium">{searchTerm}</span>)
                            </span>
                        ) : (
                            <span>Showing all {payments.length} payments</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

