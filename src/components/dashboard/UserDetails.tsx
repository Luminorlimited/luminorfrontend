"use client"

import Image from "next/image"
import { Star, Briefcase, Clock, DollarSign, Linkedin, FileText, Phone, Calendar, Globe } from "lucide-react"
import { MdOutlineEmail } from "react-icons/md"

import avatar from "@/assets/placeholderimg.png"
import { Skeleton } from "@/components/ui/skeleton"

import { useParams } from "next/navigation"
import { useGetSingleUserQuery } from "@/redux/Api/dashboard/userapi"




export default function UserDetails() {
    const params = useParams()
    const { data: getUserDetails, isLoading, error } = useGetSingleUserQuery(params?.id as string)

    const usersDetails = getUserDetails?.data

    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className="bg-bg_secondary min-h-screen p-8">
            {usersDetails?.retireProfessional ? (
                <RetireProfessionalDetails user={usersDetails} />
            ) : (
                <ClientDetails user={usersDetails} />
            )}
        </div>
    )
}

function RetireProfessionalDetails({ user }: { user: any }) {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <UserHeader user={user} />
            <UserAbout user={user} />
            <SkillsAndExperience user={user} />
            <ContactInformation user={user} />
        </div>
    )
}

function ClientDetails({ user }: { user: any }) {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <UserHeader user={user} isClient={true} />
            <UserAbout user={user} isClient={true} />
            <SkillsAndExperience user={user} isClient={true} />
            <ContactInformation user={user} />
        </div>
    )
}

function UserHeader({ user, isClient = false }: { user: any; isClient?: boolean }) {
    return (
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <Image
                    className="h-48 w-full object-cover md:w-48 border-2 rounded-[8px]"
                    src={user?.profileUrl || avatar}
                    alt={`${isClient ? user.client?.name?.firstName : user.retireProfessional?.name?.firstName}`}
                    width={192}
                    height={192}
                />
            </div>
            <div className="p-8">
                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {isClient
                        ? `${user.client?.name?.firstName} ${user.client?.name?.lastName}`
                        : `${user.retireProfessional?.name?.firstName} ${user.retireProfessional?.name?.lastName}`}
                </h1>
                <p className="mt-2 text-xl text-gray-500">{isClient ? user.jobTitle : user.expertise}</p>
                <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-sm text-gray-600">
                        {user.averageRating.toFixed(1)} ({user.reviewCount} reviews)
                    </span>
                </div>
            </div>
        </div>
    )
}

function UserAbout({ user, isClient = false }: { user: any; isClient?: boolean }) {
    return (
        <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                    <p className="text-gray-700">{isClient ? user.description : user.bio}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center text-gray-600">
                            <MdOutlineEmail className="h-5 w-5 mr-2" />
                            {isClient ? user.client?.email : user.retireProfessional?.email}
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Briefcase className="h-5 w-5 mr-2" />
                            {user.industry}
                        </li>
                        {!isClient && user.availability && (
                            <li className="flex items-center text-gray-600">
                                <Clock className="h-5 w-5 mr-2" />
                                Availability: {user.availability} hours/week
                            </li>
                        )}
                        {!isClient && user.hourlyRate && (
                            <li className="flex items-center text-gray-600">
                                <DollarSign className="h-5 w-5 mr-2" />
                                Hourly Rate: {user.hourlyRate}
                            </li>
                        )}
                        {isClient && user.budgetRange && (
                            <li className="flex items-center text-gray-600">
                                <DollarSign className="h-5 w-5 mr-2" />
                                Budget: ${user.budgetRange.min} - ${user.budgetRange.max}
                            </li>
                        )}
                        {isClient && user.projectDurationRange && (
                            <li className="flex items-center text-gray-600">
                                <Clock className="h-5 w-5 mr-2" />
                                Duration: {user.projectDurationRange.min} - {user.projectDurationRange.max} months
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function SkillsAndExperience({ user, isClient = false }: { user: any; isClient?: boolean }) {
    return (
        <div className="px-8 py-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!isClient && user.technicalSkill && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Technical Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.technicalSkill.map((skill: string, index: number) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {!isClient && user.previousPositions && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Previous Positions</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {user.previousPositions.map((position: string, index: number) => (
                                <li key={index}>{position}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {isClient && user.projectPreference && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Project Preferences</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {user.projectPreference.map((preference: string, index: number) => (
                                <li key={index}>{preference}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

function ContactInformation({ user }: { user: any }) {
    return (
        <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    {user.phoneNumber}
                </li>
                {user.linkedinProfile && (
                    <li className="flex items-center text-gray-600">
                        <Linkedin className="h-5 w-5 mr-2" />
                        <a
                            href={user.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            LinkedIn Profile
                        </a>
                    </li>
                )}
                {user.cvOrCoverLetter && (
                    <li className="flex items-center text-gray-600">
                        <FileText className="h-5 w-5 mr-2" />
                        <a
                            href={user.cvOrCoverLetter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            CV/Cover Letter
                        </a>
                    </li>
                )}
                {user.companyWebsite && (
                    <li className="flex items-center text-gray-600">
                        <Globe className="h-5 w-5 mr-2" />
                        <a
                            href={user.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Company Website
                        </a>
                    </li>
                )}
                <li className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    Born:  {new Date(user.dateOfBirth).toLocaleDateString('en-GB').replace(/\//g, '-')}
                </li>
            </ul>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="bg-bg_secondary min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                    <Skeleton className="h-48 w-48" />
                    <div className="p-8 w-full">
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
                <div className="px-8 py-6">
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    )
}

function ErrorMessage() {
    return (
        <div className="bg-bg_secondary min-h-screen p-8 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-gray-700">An error occurred while fetching user details. Please try again later.</p>
            </div>
        </div>
    )
}
