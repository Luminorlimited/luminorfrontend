'use client'
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLastTransactionQuery, useTotalRefundQuery, useTotalReveneueQuery } from "@/redux/Api/dashboard/ordersApi"
import { Skeleton } from "@/components/ui/skeleton";

const TransactionMetrics = () => {

    // const { data: lasttransaction } = useLastTransactionQuery({})
    const { data: lasttransaction, isLoading: isLastTransactionLoading } = useLastTransactionQuery(undefined)
    const { data: totalRevenue, isLoading: isTotalRevenueLoading } = useTotalReveneueQuery(undefined)
    const { data: totalRefund, isLoading: isTotalRefundLoading } = useTotalRefundQuery(undefined)
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Last Transaction</CardTitle>
                    <ArrowUpRight className="w-4 h-4" />
                </CardHeader>
                <CardContent>
                    {isLastTransactionLoading ? (
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-8 w-20 bg-gray-300 rounded-md" />
                            <Skeleton className="h-4 w-32 bg-gray-300 rounded-md mt-1" />
                            <Skeleton className="h-3 w-24 bg-gray-300 rounded-md mt-2" />
                            <div className="mt-4 space-y-2">
                                <Skeleton className="h-3 w-40 bg-gray-300 rounded-md" />
                                <Skeleton className="h-3 w-40 bg-gray-300 rounded-md" />
                                <Skeleton className="h-3 w-40 bg-gray-300 rounded-md" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="text-3xl font-bold">{lasttransaction?.data?.amount}</div>
                            <p className="text-xs text-zinc-500">Last 24 hour transaction</p>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="">Latest Time</span>
                                    <span className="text-slate-800">{lasttransaction?.data?.createdAt}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="">Transaction ID</span>
                                    <span className="text-slate-800">#{lasttransaction?.data?._id}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="">Payment Method</span>
                                    <span className="text-slate-800">Credit Card</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <ArrowUpRight className="w-4 h-4" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        {isTotalRevenueLoading ? (
                            <Skeleton className="h-8 w-24 bg-gray-300 rounded" />
                        ) : (
                            <div className="text-3xl font-bold">{totalRevenue?.data?.totalRevenue}</div>
                        )}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Daily Performance Insight</span>
                                {isTotalRevenueLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Steady engagement observed</span>
                                )}
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Weekly Analysis</span>
                                {isTotalRevenueLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Consistent upward trend noted</span>
                                )}
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Projected Monthly Outcome</span>
                                {isTotalRevenueLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Expected growth remains positive</span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Refund</CardTitle>
                    <ArrowUpRight className="w-4 h-4" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        {isTotalRefundLoading ? (
                            <Skeleton className="h-8 w-24 bg-gray-300 rounded" />
                        ) : (
                            <div className="text-3xl font-bold">{totalRefund?.data?.totalRefund}</div>
                        )}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Processing Status</span>
                                {isTotalRefundLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Multiple requests under review</span>
                                )}
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Average Completion Time</span>
                                {isTotalRefundLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Processing efficiently within expected limits</span>
                                )}
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Performance Success</span>
                                {isTotalRefundLoading ? (
                                    <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                                ) : (
                                    <span className="text-slate-800">Operations showing reliable results</span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionMetrics