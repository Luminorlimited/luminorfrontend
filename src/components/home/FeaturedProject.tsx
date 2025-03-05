'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import profileImgFallback from '@/assets/images/msgavatar2.png';
import projectImgFallback from '@/assets/images/package.png';
import Link from 'next/link';
import { useClientListQuery, useProfessionalListQuery } from '@/redux/Api/projectApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const FeaturedProject: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    // const route = usePathname();
    const clientData = useClientListQuery(undefined);
    const professionalData = useProfessionalListQuery(undefined);
    const userRole = useSelector((state: RootState) => state.Auth.user?.role || ''); // Get the user's role
    // console.log("client is", clientData);
    const handleToggleShowAll = () => {
        setShowAll(!showAll);
    };

    const renderProjects = (data: any[], isClient: boolean) => {
        const projectsToShow = showAll ? data : data.slice(0, 3);
        // console.log("my clientData is", data);

        return projectsToShow.map((data: any, index: number) => (
            <div
                key={index}
                className="overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all"
            >
                <div className="relative w-full">
                    <div className="overflow-hidden rounded-[10px] max-w-[500px] h-[218px]">
                        <Image
                            src={
                                (data?.workSample && data?.workSample !== "null")
                                    ? data.workSample
                                    : (data?.coverUrl && data?.coverUrl !== "null")
                                        ? data.coverUrl
                                        : projectImgFallback
                            }
                            alt="Consulting service"
                            width={500}
                            height={218}
                            className="object-cover hover:scale-105 w-full h-full transition-all"
                        />

                    </div>

                    {isClient && (
                        <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                            <BiTime className="h-4 w-4" />
                            <span className="text-xs">{data?.projectDurationRange?.max} days | Duration</span>
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                        <h2>Preferences: </h2>
                        <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                            {isClient ? data?.servicePreference : data?.preferedProjects || "Not Specified"}
                        </span>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                                <Image
                                    src={data?.profileUrl && data.profileUrl !== "null" ? data.profileUrl : profileImgFallback.src}
                                    alt={"clientprofessionalimg"}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                                {isClient ? data.client?.name?.firstName : data.userDetails?.name?.firstName || "Unknown"} {isClient ? data.client?.name?.lastName : data.userDetails?.name?.lastName || ""}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[16px] font-medium text-gray-900">
                                ★ {isClient ? clientData?.currentData?.meta?.limit : data?.averageRating || ""}
                            </span>
                            <span className="text-[16px] text-gray-500">{isClient ? data?.length : `(${professionalData?.data?.meta?.limit})`}</span>
                        </div>
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-black">
                        {isClient ? data.projectListing : data.preferedProjects || "Untitled Projects"}
                    </h3>
                    <div className="flex items-center justify-between">
                        {isClient && (
                            <div className="text-xl">
                                <span className="text-gray-500">Budget: </span>
                                <span className="font-medium text-gray-900">
                                    ${data.budgetRange?.max || "N/A"}
                                </span>
                            </div>
                        )}
                        <Link className='rounded-[12px] w-full block text-center px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all duration-200' href={`/chat/${isClient ? data?.client?._id : data?.userDetails?._id}`}>Connect Now</Link>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 justify-center mb-8">
                {userRole === 'client' ? renderProjects(professionalData?.data?.data || [], false) : renderProjects(clientData?.data?.data || [], true)}
            </div>
            <div className="text-center">
                <button
                    onClick={handleToggleShowAll}
                    className="rounded-[12px] px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all duration-200"
                >
                    {showAll ? "Show Less" : "Explore More Service"}
                </button>
            </div>
        </div>
    );
};

export default FeaturedProject;