'use client'

import { useState } from 'react';
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import Pagination from '@/components/common/pagination/Pagination';
import Button from '@/components/common/Button';

const consultingData = [
    {
        id: 1,
        duration: "7 days",
        preference: "Marketing Strategy",
        name: "John Doe",
        rating: 4.8,
        title: "Expert Guidance for Marketing Campaigns",
        budget: 800,
        imageUrl: "/images/package.png",
        profileImg: '/images/palak.jpg'
    },
    {
        id: 2,
        duration: "10 days",
        preference: "Financial Planning",
        name: "Jane Smith",
        rating: 5.0,
        title: "Strategic Financial Advice for Growth",
        budget: 1200,
        imageUrl: "/images/package.png",
        profileImg: '/images/palak.jpg'
    },
    {
        id: 3,
        duration: "5 days",
        preference: "Startup Coaching",
        name: "Alice Johnson",
        rating: 4.5,
        title: "Coaching for Startup Founders",
        budget: 600,
        imageUrl: "/images/package.png",
        profileImg: '/images/palak.jpg'
    },
    // Add more items to test pagination
    {
        id: 4,
        duration: "14 days",
        preference: "Business Strategy",
        name: "Bob Williams",
        rating: 4.9,
        title: "Comprehensive Business Strategy Development",
        budget: 1500,
        imageUrl: "/images/package.png",
        profileImg: '/images/palak.jpg'
    },
    {
        id: 5,
        duration: "3 days",
        preference: "Social Media Marketing",
        name: "Emma Brown",
        rating: 4.7,
        title: "Boost Your Social Media Presence",
        budget: 450,
        imageUrl: "/images/package.png",
        profileImg: '/images/palak.jpg'
    },
];

export default function ProjectList() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consultingData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(consultingData.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 justify-center mb-8">
                {currentItems.map((data) => (
                    <div
                        key={data.id}
                        className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all "
                    >
                        {/* Card Image Section */}
                        <div className="relative  w-full">
                            <Image
                                src={data.imageUrl}
                                alt="Consulting service"
                                width={500}
                                height={218}
                                className="object-cover rounded-xl hover:scale-105 transition-all"
                            />

                            <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                                <BiTime className="h-4 w-4" />
                                <span className="text-xs font-medium">{data.duration}</span>
                                <span className="text-xs">| Duration</span>
                            </div>
                        </div>

                        {/* Card Content Section */}
                        <div className="p-5" >
                            {/* Preference Badge */}
                            <div className="mb-3 flex items-center gap-3">
                                <h2>Preferrence: </h2>
                                <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                                    {data.preference}
                                </span>
                            </div>

                            {/* Consultant Details */}
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 overflow-hidden rounded-full">
                                        <Image
                                            src={data.profileImg}
                                            alt={data.name}
                                            width={40}
                                            height={40}
                                            className=" object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {data.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-[16px] font-medium text-gray-900">
                                        ★ {data.rating}
                                    </span>
                                    <span className="text-[16px] text-gray-500">(123)</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="mb-4 text-xl font-bold text-black ">
                                {data.title}
                            </h3>

                            {/* Budget and Connect Button */}
                            <div className="flex items-center justify-between">
                                <div className="text-xl">
                                    <span className=" text-gray-500">Budget: </span>
                                    <span className=" font-medium text-gray-900">
                                        ${data.budget}
                                    </span>
                                </div>
                                {/* <button className="rounded-[16px]  px-6 py-5 text-[16px] bg-primary font-medium text-white  transition-colors duration-200">
                                    Connect Now
                                </button> */}
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