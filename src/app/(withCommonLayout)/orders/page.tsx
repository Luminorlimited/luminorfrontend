"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, CreditCard, Package, ShoppingBag } from "lucide-react"
import { useTransactionListQuery } from "@/redux/Api/paymentApi"

export default function OrdersPage() {
  const { data: orderList, isLoading } = useTransactionListQuery(undefined)
console.log("order list", orderList);
  if (isLoading) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          <ShoppingBag className="w-4 h-4 mr-2" />
          {orderList?.data?.length || 0} Orders
        </Badge>
      </div>

      {orderList?.data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderList.data.map((order: any) => (
            <OrderCard key={order.transaction.orderId} order={order} />
          ))}
        </div>
      ) : (
        <EmptyOrderState />
      )}
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "refunded":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <Link href={`/deliver-details/${order?.transaction?.orderId}`}>
      <Card className="overflow-hidden transition-all duration-300 border hover:shadow-lg hover:border-primary/20">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold line-clamp-1">{order?.project?.projectName}</h2>
            <Badge variant="outline" className={`${getStatusColor(order?.transaction?.paymentStatus)} border`}>
              {order?.transaction?.paymentStatus}
            </Badge>
          
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="font-medium text-foreground">${order?.project?.totalPrice}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Package className="w-4 h-4 mr-2" />
              <span> <b>Revision</b> {order?.revisionCount}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Package className="w-4 h-4 mr-2" />
              <span>Order #{order?.transaction?.orderId.slice(-8)}</span>
            </div>
            <Badge variant="outline" className={`${order?.revisionCount > 0 ? "bg-red-900 text-white" : "bg-green-700 text-white"} `}>
              {order?.revisionCount > 0 ? "In Revision" : "Order Accepted"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2 border-t bg-muted/10">
          <div className="flex items-center justify-center w-full text-sm font-medium text-primary">View Details</div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function OrderCardSkeleton() {
  return (
    <Card className="overflow-hidden border">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-16 h-5" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t bg-muted/10">
        <Skeleton className="w-full h-5" />
      </CardFooter>
    </Card>
  )
}

function EmptyOrderState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/5">
      <div className="p-4 mb-4 rounded-full bg-primary/10">
        <ShoppingBag className="w-8 h-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">No Orders Found</h3>
      <p className="max-w-md mb-6 text-muted-foreground">
        You haven&lsquo;t placed any orders yet. Browse our projects and make your first purchase!
      </p>
      <Link
        href="/project-list/client"
        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90"
      >
        Browse Projects
      </Link>
    </div>
  )
}

