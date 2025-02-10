import React from 'react';

const SkeletonOrderList = () => {
    return (
        <div className="bg-bg_secondary px-2 rounded-[12px] min-h-[80vh] animate-pulse">
            <div className="mb-6 flex items-center justify-between p-5">
                <h1 className="text-2xl font-medium text-gray-400">Loading Order List...</h1>
            </div>

            <div className="rounded-lg overflow-x-auto min-h-[50vh]">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-600 text-sm font-medium text-gray-400">
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Order From</th>
                            <th className="p-4 text-left">Order Receiver</th>
                            <th className="p-4 text-left">Project Type</th>
                            <th className="p-4 text-left">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr
                                key={index}
                                className="text-sm text-gray-400 cursor-pointer border-b border-gray-700 hover:bg-gray-300"
                            >
                                <td className="p-4">
                                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-28 bg-gray-300 rounded"></div>
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkeletonOrderList;