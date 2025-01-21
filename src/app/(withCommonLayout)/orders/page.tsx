import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
    // Dummy data for orders
    const orders = [
        {
            id: "1",
            projectName: "E-Commerce Platform",
            paymentStatus: "Paid",
            serialNumber: "001",
        },
        {
            id: "2",
            projectName: "Portfolio Website",
            paymentStatus: "Pending",
            serialNumber: "002",
        },
        {
            id: "3",
            projectName: "CRM Dashboard",
            paymentStatus: "Paid",
            serialNumber: "003",
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <Link
                        key={order.id}
                        href={`/deliver-details/${order.id}`}
                        className="inline-block mt-4 text-blue-500 "
                    >
                    <div
                        className="bg-white p-4 border border-gray-200 rounded-[8px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">{order.projectName}</h2>
                        <p className="text-sm text-gray-600">Serial Number: {order.serialNumber}</p>
                        <p className="text-sm text-gray-600">Payment Status: {order.paymentStatus}</p>
                            View Details
                    </div>
                        </Link>
                ))}
            </div>
        </div>
    );
};

export default Page;
