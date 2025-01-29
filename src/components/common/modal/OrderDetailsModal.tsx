import React, { useState } from "react";
import { Offer } from "./OffersModal";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import offer from "@/assets/images/offer.png";
import { useDeleteOfferMutation } from "@/redux/Api/offerApi";
import { toast } from "sonner";

interface OrderDetailsModalProps {
    data: Offer,
    onClose: () => void

}


const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ data, onClose }) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const submitOrder = () => {
        setLoading(true)
        router.push(`/project-details/${data._id}`)
    }
    const offerId = data._id
    console.log('My new offer is ', data);

    const [deleteOffers] = useDeleteOfferMutation()
    console.log('my offer is', data);

    const deleteOffer = async () => {
        try {
            await deleteOffers(offerId).unwrap();
            toast.success("Offer Canceled");
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Failed to cancel offer");
        }
    }

    const formattedDate = new Date(data.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="w-full  items-center justify-center z-50">
            <div className="">
                {/* Close Button */}

                {/* Modal Content */}
                <h3 className="text-lg font-semibold mb-4">Orders Details</h3>

                <div className="w-full h-[150px] bg-[#F8FAFB] mb-4 rounded-md overflow-hidden ">
                    <Image
                        src={offer}
                        alt="Offer Image"
                        width={400}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                    <h4 className="font-medium text-[16px] mb-3">dfsdfds</h4>
                </div>


                <div className="text-sm  bg-[#F8FAFB] p-2">
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order from: </span>
                        <span className="text-black">{data?.pofessionalInfo?.name?.firstName} {data?.pofessionalInfo?.name?.lastName} </span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Delivery date: </span>
                        <span className="text-black">{formattedDate}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Total price: </span>
                        <span className="text-black">{data.totalPrice}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order no: </span>
                        <span className="text-black">{data._id}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order agreement: </span>
                        <span className="text-black">PDF</span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6 gap-2">
                    <button onClick={deleteOffer} className="rounded-[12px]  w-full text-[16px]  font-medium text-black bg-slate-200 hover:bg-slate-300 hover:shadow-sm transition-colors duration-200">
                        Decline
                    </button>
                    <Button
                        onClick={submitOrder}
                        className={`w-full hover:shadow-md ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Loading..." : "Accept Order"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
