'use client';

import { useState } from 'react';
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import Pagination from '@/components/common/pagination/Pagination';
import Button from '@/components/common/Button';
import { useClientListQuery, useProfessionalListQuery } from '@/redux/api/projectApi';
import profileImgFallback from '@/assets/images/profilepix.jpg'; // Fallback profile image
import projectImgFallback from '@/assets/images/package.png'; // Fallback project image

export default function ProjectList() {

    const { data:  professionalData }= useProfessionalListQuery(undefined);
    
    console.log(professionalData)



    const { data: consultingData, isLoading, isError } = useClientListQuery(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // console.log(consultingData)

    // Ensure consultingData has a fallback to an empty array to avoid errors
    const data = consultingData?.data || [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load data. Please try again later.</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 justify-center mb-8">
                {currentItems.map((data: any, index: number) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all"
                    >
                        <div className="relative w-full">
                            <div className="overflow-hidden rounded-[10px]">
                                <Image
                                    src={projectImgFallback} 
                                    alt="Consulting service"
                                    width={500}
                                    height={218}
                                    className="object-cover hover:scale-105 transition-all"
                                />
                            </div>

                            <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                                <BiTime className="h-4 w-4" />
                                <span className="text-xs">{data.projectDurationRange.max} days | Duration</span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="mb-3 flex items-center gap-3">
                                <h2>Preference: </h2>
                                <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                                    {data.servicePreference?.[0] || "Not Specified"}
                                </span>
                            </div>

                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 overflow-hidden rounded-full">
                                        <Image
                                            src={data.client?.name?.profileImg || profileImgFallback} 
                                            alt={data.client?.name?.firstName || "Client"}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {data.client?.name?.firstName || "Unknown"} {data.client?.name?.lastName || ""}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-[16px] font-medium text-gray-900">
                                        ★ 4.7
                                    </span>
                                    <span className="text-[16px] text-gray-500">(123)</span>
                                </div>
                            </div>

                            <h3 className="mb-4 text-xl font-bold text-black">
                                {data.projectListing || "Untitled Project"}
                            </h3>

                            <div className="flex items-center justify-between">
                                <div className="text-xl">
                                    <span className="text-gray-500">Budget: </span>
                                    <span className="font-medium text-gray-900">
                                        ${data.budgetRange?.max || "N/A"}
                                    </span>
                                </div>
                                <Button>Connect Now</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
