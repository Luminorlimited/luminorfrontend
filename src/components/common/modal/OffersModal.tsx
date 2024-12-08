"use client";
import React from "react";
import Image from "next/image";
import offer from "@/assets/images/offer.png";

interface OffersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOfferClick: (offer: any) => void;
}

const OffersModal: React.FC<OffersModalProps> = ({ isOpen, onClose, onOfferClick }) => {
    if (!isOpen) return null;

    const offers = [
        {
            id: 1,
            title: "I will setup and manage your startup business",
            price: "$100",
            date: "02 Nov 2024",
            image: offer,
            client: "Client A",
            orderNo: "1234",
            agreement: "Yes",
        },
        {
            id: 2,
            title: "I will design a professional website for you",
            price: "$150",
            date: "05 Nov 2024",
            image: offer,
            client: "Client B",
            orderNo: "5678",
            agreement: "Yes",
        },
        {
            id: 3,
            title: "I will help you with digital marketing strategy",
            price: "$120",
            date: "10 Nov 2024",
            image: offer,
            client: "Client C",
            orderNo: "91011",
            agreement: "No",
        },
    ];

    return (
        <div className="absolute top-full left-[-300px] mt-4 bg-white shadow-lg rounded-[15px] w-[462px] h-[505px] z-50 border p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-3 items-center">
                    <h3 className="text-lg font-semibold">Orders with you</h3>
                    <p className="text-[#4A4C56] text-sm">(Total-{offers.length})</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black focus:outline-none"
                >
                    X
                </button>
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
        </div>
    );
};

export default OffersModal;
