'use client'
import useDecodedToken from '@/components/common/DecodeToken';
import { useTransactionListQuery, useProfessionalOrderQuery } from '@/redux/Api/paymentApi'
import Link from 'next/link';
// import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
    // Dummy data for orders

    const { data: orderList } = useTransactionListQuery(undefined)
    const { data: ProfessionalorderList } = useProfessionalOrderQuery(undefined)
    console.log(orderList)
    const token = useDecodedToken()

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {token?.role === 'client' ? (
                    ProfessionalorderList?.data.map((order: any) => (
                        order.project ? ( // Check if order.project exists
                            // <Link

                            //     href={`/deliver-details/${order.transaction.orderId}`}
                            //     className="inline-block mt-4 text-blue-500"
                            // >
                            <div
                                key={order.transaction.orderId}
                                className="bg-white p-4 border border-gray-200 rounded-[8px] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-2"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">Project Name: {order?.project?.projectName || ""}</h2>
                                <p className="text-sm text-gray-600">Serial Number: <strong>{order?.project?.totalPrice || ""}</strong> </p>
                                <p className="text-sm text-gray-600">Payment Status: <strong>{order?.transaction?.paymentStatus || ""}</strong> </p>
                                {/* View Details */}
                            </div>
                            // </Link>
                        ) : null // Return null if order.project doesn't exist
                    ))

                ) : (
                    orderList?.data.map((order: any) => (
                        <Link
                            key={order.transaction.orderId}
                            href={`/deliver-details/${order.transaction.orderId}`}
                            className="inline-block mt-4 text-blue-500"
                        >
                            <div
                                className="bg-white p-4 border border-gray-200 rounded-[8px] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-2"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">Project    Name: {order?.project?.projectName}</h2>
                                <p className="text-sm text-gray-600">Price: <strong>{order?.project?.totalPrice}</strong></p>
                                <p className="text-sm text-gray-600">Payment Status: <strong>{order?.transaction?.paymentStatus}</strong></p>
                                View Details
                            </div>
                        </Link>
                    ))
                )}
            </div>

        </div>
    );
};

export default Page;
