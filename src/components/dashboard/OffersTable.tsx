"use client"

// import { Trash2 } from "lucide-react"
// import Swal from "sweetalert2"
// import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useGetTotalOfferQuery } from "@/redux/Api/dashboard/userapi"
import SkeletonOfferList from "./skeleton/SkeletonOfferList"
// import { useDeleteOfferMutation } from "@/redux/Api/offerApi"



export default function OffersTable() {


    const { data: totalOffer, isLoading } = useGetTotalOfferQuery(undefined)

    // console.log("total Offer", totalOffer)






    if (isLoading) {
        return <SkeletonOfferList />
    }

    return (
        <div className="bg-bg_secondary min-h-[80vh] rounded-[12px] p-4 px-10">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-medium text-black">All Offer List</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="">
                        <TableHead className="w-[100px]">Serial</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Sender Name</TableHead>
                        <TableHead>Receiver Name</TableHead>
                        <TableHead>Offer Type</TableHead>
                        <TableHead>Price</TableHead>
                        {/* <TableHead className="text-right">Action</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {totalOffer?.data && totalOffer?.data.map((offer: any, index: number) => (
                        <TableRow key={offer.id} className="text-black">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell> {new Date(offer?.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</TableCell>
                            <TableCell>{offer?.projectName}</TableCell>
                            <TableCell>{offer?.professionalEmail?.name?.firstName} {offer?.professionalEmail?.name?.lastName}</TableCell>
                            <TableCell>{offer?.clientEmail?.name?.firstName} {offer?.clientEmail?.name?.lastName}</TableCell>
                            <TableCell>{offer?.flatFee ? "Flat Fee" : offer?.hourlyFee ? "Hourly Fee" : "Milestone"}</TableCell>
                            <TableCell>{offer.totalPrice}</TableCell>
                            {/* <TableCell className="text-right">
                               
                                <Button variant="ghost" className="hover:bg-red-200 text-red-800 rounded-[8px]" size="sm" onClick={() => handleDelete(offer._id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </div>
    )
}

