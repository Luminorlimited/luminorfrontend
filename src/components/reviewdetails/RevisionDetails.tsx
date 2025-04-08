"use client"

import {  Card,  CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon,  MessageSquareTextIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"




export default function RevisionDetails({ getSingleOrder }: { getSingleOrder: any }) {
  // Default data if none is provided


  // Format dates for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate revision count from array length if not provided
  const revisionCount = getSingleOrder?.data?.result.revisionCount 

  return (
    <div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revision History</CardTitle>
          <Badge variant="outline">
            {revisionCount} Revision{revisionCount !== 1 ? "s" : ""}
          </Badge>
        </div>
        <CardDescription>All revision information</CardDescription>
      </CardHeader>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="space-y-6">
          {getSingleOrder?.data?.result.revision.map((rev:any, index:number) => (
            <Card key={index} className="space-y-4 rounded-[8px] p-4 shadow-sm hover:shadow-md border-primary">
              {index > 0 && <Separator className="my-4" />}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Revision #{index + 1}</span>
                
              </div>

              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Requested By:</span>
                <span className="text-sm text-muted-foreground">{rev.requestedBy}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquareTextIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Description:</span>
                <span className="text-sm text-muted-foreground">{rev.description}</span>
              </div>

              {/* <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Length:</span>
                <span className="text-sm text-muted-foreground">{formatDate(rev.timeLength)}</span>
              </div> */}

              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Revision set At:</span>
                <span className="text-sm text-muted-foreground">{formatDate(rev.createdAt)}</span>
              </div>
            </Card>
          ))}

          {getSingleOrder?.data?.result.revisionCount === 0 && (
            <div className="text-center py-6 text-muted-foreground">No revisions found</div>
          )}
        </div>
      </div>
    </div>
  )
}
