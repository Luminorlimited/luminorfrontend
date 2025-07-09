'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import profileImgFallback from '@/assets/images/msgavatar2.png';
import projectImgFallback from '@/assets/images/package.png';
import Link from 'next/link';
import { useClientListQuery, useProfessionalListQuery } from '@/redux/Api/projectApi';
// import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import LoaderAnimation from '../loader/LoaderAnimation';
import { useSelector } from 'react-redux';

const FeaturedProject: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  // Fetch client and professional data with loading states
  const { data: clientData, isLoading: clientLoading } = useClientListQuery(undefined)
  const { data: professionalData, isLoading: professionalLoading } = useProfessionalListQuery(undefined)

  // console.log("clientData", clientData)
  // console.log("professionalData", professionalData)

  // Get the user's role - replace with your actual Redux selector
  const userRole = useSelector((state: RootState) => state.Auth.user?.role || "")

  const handleToggleShowAll = () => {
    setShowAll(!showAll)
  }

  const renderProjects = (data: any[], isClient: boolean) => {
    if (!data || data.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No {isClient ? "clients" : "professionals"} found</p>
        </div>
      )
    }

    const projectsToShow = showAll ? data : data.slice(0, 3)

    return projectsToShow.map((item: any, index: number) => {
      // Handle different data structures for clients vs professionals
      const profileData = isClient ? item.client : item.userDetails
      const profileImage =
        item.profileUrl && item.profileUrl !== "null"
          ? item.profileUrl
          : profileData?.profileUrl && profileData.profileUrl !== "null"
            ? profileData.profileUrl
            : profileImgFallback

      const coverImage =
        item.workSample && item.workSample !== "null"
          ? item.workSample
          : item.coverUrl && item.coverUrl !== "null"
            ? item.coverUrl
            : projectImgFallback

      const firstName = profileData?.name?.firstName || "Unknown"
      const lastName = profileData?.name?.lastName || ""
      const fullName = `${firstName} ${lastName}`.trim()

      const preference = isClient ? item.servicePreference || "Not Specified" : item.preferedProjects || "Not Specified"

      const title = isClient
        ? item.projectListing || "Project Opportunity"
        : item.description || item.bio || "Professional Services"

      const rating = item.averageRating || 0
      const reviewCount = item.reviewCount || 0

      const connectId = profileData?._id || item._id

      return (
        <div
          key={item._id || index}
          className="overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all"
        >
          <div className="relative w-full">
            <div className="overflow-hidden rounded-t-[10px] w-full h-[218px]">
              <Image
                src={coverImage || "/placeholder.svg"}
                alt={isClient ? "Client project" : "Professional work sample"}
                width={500}
                height={218}
                className="object-cover hover:scale-105 w-full h-full transition-all"
              />
            </div>
            {isClient && item.projectDurationRange?.max && (
              <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                <BiTime className="h-4 w-4" />
                <span className="text-xs">{item.projectDurationRange.max} days | Duration</span>
              </div>
            )}
            {!isClient && item.hourlyRate && (
              <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-green-600 px-2 py-1 text-white">
                <span className="text-xs">${item.hourlyRate}/hr</span>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-sm font-medium">Preferences:</h2>
              <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                {preference}
              </span>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt={`${fullName} profile`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{fullName}</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[16px] font-medium text-gray-900">★ {rating.toFixed(1)}</span>
                <span className="text-[16px] text-gray-500">({reviewCount})</span>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold text-black line-clamp-2">{title}</h3>

            <div className="flex items-center justify-between">
              {isClient && item.budgetRange?.max && (
                <div className="text-lg mb-2">
                  <span className="text-gray-500">Budget: </span>
                  <span className="font-medium text-gray-900">${item.budgetRange.max.toLocaleString()}</span>
                </div>
              )}

              {!isClient && (
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{item.expertise?.replace("_", " ")}</span>
                  {item.industry && <span className="ml-2 text-gray-500">• {item.industry}</span>}
                </div>
              )}
            </div>

            <Link
              className="rounded-[12px] w-full block text-center px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all duration-200"
              href={`/chat/${connectId}`}
            >
              Connect Now
            </Link>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Show loading spinner if data is loading */}
      {clientLoading || professionalLoading ? (
        <div className="max-w-[400px] mx-auto">
          <LoaderAnimation />
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1 justify-center mb-8">
            {userRole === "client"
              ? renderProjects(professionalData?.data || [], false)
              : renderProjects(clientData?.data || [], true)}
          </div>

          <div className="text-center">
            <button
              onClick={handleToggleShowAll}
              className="rounded-[12px] px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all duration-200"
            >
              {showAll ? "Show Less" : "Explore More Services"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default FeaturedProject