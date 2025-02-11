"use client";
import React, { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { useGetOfferQuery } from "@/redux/Api/offerApi";
// import io from 'socket.io-client'; // Import the socket.io-client
// import useDecodedToken from "../DecodeToken";

interface OffersModalProps {
    onClose: () => void;
    user1: string;
    offerNotification: number;
    setOfferNotification: React.Dispatch<React.SetStateAction<number>>;
    latestOffer: any;
}

export interface Offer {
    _id: string | number;
    projectName: string;
    description: string;
    agreementType: string;
    orderAgreementPDF: string;
    milestones: Array<{
        title: string;
        description: string;
        price: number;
        revision: number;
        delivery: number;
        _id: string;
    }>;
    totalPrice: number;
    professionalEmail: string;
    clientEmail: string;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    pofessionalInfo: {
        name: {
            firstName: string;
            lastName: string;
        };
        _id: string;
        email: string;
    };
}

const OffersModal: React.FC<OffersModalProps> = ({
    onClose,
    user1,
    // offerNotification,
    // setOfferNotification,
    latestOffer,
}) => {
    // const [oldOffer, setOldOffer] = useState
    const { data: getoffer, isLoading } = useGetOfferQuery(user1);
    // console.log("My email", user1);
    // console.log("My offer", getoffer);

    // console.log("user 2", user1);

    // const [socket, setSocket] = useState<any>(null);
    // const token = useDecodedToken()
    // const user1 = token?.email

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    const onOfferClick = (offer: Offer) => {
       
        setSelectedOffer(offer);
    };
    useEffect(() => {
        if (getoffer?.data?.data) {
            //   setOfferNotification(getoffer?.data?.data?.offersWithUserInfo?.count);
        }
    }, [getoffer]);

    console.log(getoffer?.data?.data?.count, "chekc offer");
    const offers = getoffer?.data?.data?.offersWithUserInfo || [];

    console.log(latestOffer, "check from offer modal");
    const isLatestOfferIncluded = latestOffer
        ? offers.some((offer: Offer) => offer._id === latestOffer._id)
        : true;

    // Merge latestOffer if it's not found in offers
    const updatedOffers = isLatestOfferIncluded
        ? offers
        : [latestOffer, ...offers];

    return (
        <div className="absolute z-[999999] top-[-95px] inset-0  flex justify-center items-center">
            <div className=" mt-4 relative bg-white shadow-lg rounded-[20px] w-[462px] h-[505px] z-50  p-4 overflow-hidden overflow-y-scroll">
                <button
                    onClick={onClose}
                    className="text-gray-500 absolute right-5  hover:text-black focus:outline-none"
                >
                    X
                </button>
                {selectedOffer !== null ? (
                    <div>
                        <OrderDetailsModal data={selectedOffer} onClose={onClose} />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-semibold">Orders with you</h3>
                                <p className="text-[#4A4C56] text-sm">
                                    (Total-{updatedOffers.length})
                                </p>
                            </div>
                        </div>
                        <div>
                            {isLoading ? (
                                <p className="text-center text-xl">Loading...</p>
                            ) : (
                                updatedOffers.map((offer: any) => {
                                    // Convert createdAt date to "11 January 2025" format
                                    const formattedDate = new Date(
                                        offer.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    });

                                    return (
                                        <button
                                            key={offer._id}
                                            onClick={() => onOfferClick(offer)} // Pass the clicked offer
                                            className="px-4 py-3 items-start gap-4 cursor-pointer hover:bg-[#F8FAFB] border-[#F8FAFB] hover:rounded-[12px] rounded-lg hover:shadow-md transition-all border hover:border-primary mb-1 w-full"
                                        >
                                            <div className="text-left">
                                                <h1 className="text-[16px] font-medium">
                                                    {offer.description}
                                                </h1>
                                                <h1 className="text-sm pt-2">{offer.totalPrice}</h1>
                                                <h1 className="text-sm pt-2">{formattedDate}</h1>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OffersModal;