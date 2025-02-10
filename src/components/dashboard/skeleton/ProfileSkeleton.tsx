import React from 'react';
import { Separator } from "@/components/ui/separator";

const ProfileSkeleton = () => {
    return (
        <div className="container mx-auto p-6 bg-bg_secondary min-h-[80vh] animate-pulse">
            <div className="max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex rounded-[10px] overflow-hidden">
                    {/* Left column - Skeleton Avatar and basic info */}
                    <div className="md:w-1/3 bg-bg_primary p-8 text-white">
                        <div className="text-center">
                            <div className="w-48 h-48 mx-auto mb-6 bg-gray-300 rounded-full"></div>
                            <div className="h-6 w-32 bg-gray-400 mx-auto mb-2 rounded"></div>
                            <div className="h-4 w-24 bg-gray-400 mx-auto mb-4 rounded"></div>
                            <div className="h-8 w-36 bg-gray-500 mx-auto mb-4 rounded"></div>
                        </div>
                        <Separator className="my-6 bg-gray-600" />
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-400 mr-3 rounded"></div>
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-400 mr-3 rounded"></div>
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Editable fields Skeleton */}
                    <div className="md:w-2/3 p-8 text-black bg-[#e6e6e6]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-48 bg-gray-400 rounded"></div>
                            <div className="h-10 w-36 bg-gray-500 rounded"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-400 rounded mb-2"></div>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-300 rounded"></div>
                                            <div className="h-10 w-full bg-gray-300 pl-10 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
