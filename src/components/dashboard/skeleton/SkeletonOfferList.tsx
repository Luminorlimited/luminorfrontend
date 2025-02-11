import React from 'react';

const SkeletonOfferList = () => {
    return (
        <div className="bg-bg_secondary min-h-[80vh] rounded-[12px] p-4 px-10 animate-pulse">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-medium text-gray-400">Loading Offer List...</h1>
            </div>
            <div className="rounded-lg overflow-x-auto min-h-[50vh]">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-600 text-sm font-medium text-gray-400">
                            <th className="w-[100px] p-4 text-left">Serial</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Project Name</th>
                            <th className="p-4 text-left">Sender Name</th>
                            <th className="p-4 text-left">Receiver Name</th>
                            <th className="p-4 text-left">Offer Type</th>
                            <th className="p-4 text-left">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index} className="text-sm text-gray-400 border-b border-gray-700">
                                <td className="p-4">
                                    <div className="h-4 w-10 bg-gray-300 rounded"></div>
                                </td>
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

export default SkeletonOfferList;