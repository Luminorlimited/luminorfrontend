import { ShoppingCart, HandCoins, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTotalUserQuery } from "@/redux/Api/dashboard/userapi"
import { Skeleton } from "@/components/ui/skeleton";
import { useTotalOrderQuery, useTotalReveneueQuery } from "@/redux/Api/dashboard/ordersApi";

export default function OrderStatistics() {

    const { data: totalUser, isLoading } = useTotalUserQuery(undefined)
    const { data: totalRevenue, isLoading: isTotalRevenueLoading } = useTotalReveneueQuery(undefined)
    const { data: totalOrder, isLoading: isTotalOrderLoading } = useTotalOrderQuery(undefined)


    return (
        <div className="grid gap-4 md:grid-cols-3">

            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-[26px] font-medium">Total Order</CardTitle>
                    <HandCoins className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        {isTotalOrderLoading ? (
                            <Skeleton className="h-8 w-16 bg-gray-300 rounded" />
                        ) : (
                            <div className="text-2xl font-bold">{totalOrder?.data?.result.length}</div>
                        )}

                        <div className="flex items-center text-xs text-zinc-400">
                            {isTotalOrderLoading ? (
                                <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
                            ) : (
                                <span className="ml-1">from last month</span>
                            )}
                        </div>

                        {isTotalOrderLoading ? (
                            <Skeleton className="h-4 w-full bg-gray-200 rounded mt-2" />
                        ) : (
                            <p className="text-xs text-zinc-500 mt-2">
                                Total processed orders across all categories
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-[26px] font-medium">Total User</CardTitle>
                    <ShoppingCart className="w-4 h-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-6 w-16 bg-gray-300 rounded-md" />
                            <Skeleton className="h-4 w-28 bg-gray-300 rounded-md mt-1" />
                            <Skeleton className="h-3 w-24 bg-gray-300 rounded-md mt-2" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="text-2xl font-bold">{totalUser?.data.length}</div>
                            <div className="flex items-center text-xs text-zinc-400">
                                <span className="ml-1">from last week</span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-2">
                                Orders with custom specifications and modifications
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>


            <Card className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-[13px] text-black">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-[26px] font-medium">Income</CardTitle>
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1">
                        {isTotalRevenueLoading ? (
                            <Skeleton className="h-8 w-32 bg-gray-300 rounded" />
                        ) : (
                            <div className="text-2xl font-bold">{totalRevenue?.data?.totalRevenue}</div>
                        )}
                        <div className="flex items-center text-xs text-zinc-400">
                            {isTotalRevenueLoading ? (
                                <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
                            ) : (
                                <>
                                    <span className="ml-1">from last week</span>
                                </>
                            )}
                        </div>
                        {isTotalRevenueLoading ? (
                            <Skeleton className="h-4 w-full bg-gray-200 rounded mt-2" />
                        ) : (
                            <p className="text-xs text-zinc-500 mt-2">Standard orders with fixed specifications</p>
                        )}
                        {/* Optionally add more skeletons for other placeholders if needed */}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

