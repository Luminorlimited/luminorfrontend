"use client";
import React, { useState } from "react";
import Image from "next/image";
import offer from "@/assets/images/offer.png";
import OrderDetailsModal from "./OrderDetailsModal";

interface OffersModalProps {

    onClose: () => void;

}

export interface Offer {
    id: string | number,
    title: string,
    price: string,
    date: string,
    image: string,
    client: string,
    orderNo: string,
    agreement: boolean,
}

const OffersModal: React.FC<OffersModalProps> = ({ onClose }) => {

    const offers: Offer[] = [
        {
            id: 1,
            title: "I will setup and manage your startup business",
            price: "$100",
            date: "02 Nov 2024",
            image: offer.src,
            client: "Client A",
            orderNo: "1234",
            agreement: true,
        },
        {
            id: 2,
            title: "I will design a professional website for you",
            price: "$150",
            date: "05 Nov 2024",
            image: offer.src,
            client: "Client B",
            orderNo: "5678",
            agreement: true,
        },
        {
            id: 3,
            title: "I will help you with digital marketing strategy",
            price: "$120",
            date: "10 Nov 2024",
            image: offer.src,
            client: "Client C",
            orderNo: "91011",
            agreement: false,
        },
    ];

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)


    const onOfferClick = (offer: Offer) => {
        setSelectedOffer(offer)

    }

    return (
        <div className="absolute z-[999999] top-[-155px] inset-0  flex justify-center items-center">

            <div className=" mt-4 relative bg-white shadow-lg rounded-[15px] w-[462px] h-[505px] z-50 border p-4">
                <button
                    onClick={onClose}
                    className="text-gray-500 absolute right-5  hover:text-black focus:outline-none"
                >
                    X
                </button>
                {selectedOffer !== null ?
                    <div>
                        <OrderDetailsModal data={selectedOffer} />
                    </div>
                    : <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-semibold">Orders with you</h3>
                                <p className="text-[#4A4C56] text-sm">(Total-{offers.length})</p>
                            </div>

                        </div>
                        <div>
                            {offers.map((offer) => (
                                <button
                                    key={offer.id}
                                    onClick={() => onOfferClick(offer)} // Pass the clicked offer
                                    className="px-4 py-3 flex items-start gap-4 cursor-pointer hover:bg-[#F8FAFB] border-[#F8FAFB] hover:rounded-[12px] rounded-lg hover:shadow-md transition-all border hover:border-primary mb-1"
                                >
                                    <Image src={offer.image} width={118} height={93} alt={offer.title} />
                                    <div className="text-left">
                                        <h1 className="text-[16px] font-medium">{offer.title}</h1>
                                        <h1 className="text-sm pt-2">{offer.price}</h1>
                                        <h1 className="text-sm">{offer.date}</h1>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default OffersModal;
