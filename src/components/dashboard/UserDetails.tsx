"use client"

import Image from "next/image"
import { Star, Briefcase, Clock, DollarSign, Linkedin, FileText, Phone, Calendar, Globe } from "lucide-react"
import { MdOutlineEmail } from "react-icons/md"

import avatar from "@/assets/images/avatar.jpg"
import { useParams } from "next/navigation"
import { useGetSingleUserQuery } from "@/redux/Api/dashboard/userapi"





export default function UserDetails() {


    const params = useParams()
    console.log("my id is", params?.id);
    const { data: getUserDetails } = useGetSingleUserQuery(params?.id)

    const usersDetails = getUserDetails?.data
    console.log("my details is", usersDetails);
    return (
        <div className="bg-bg_secondary min-h-screen p-8">
            {
                usersDetails?.retireProfessional ? (
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <Image
                                    className="h-48 w-full object-cover md:w-48"
                                    src={avatar || "/placeholder.svg?height=192&width=192"}
                                    alt={`${usersDetails?.client?.name?.firstName}`}
                                    width={192}
                                    height={192}
                                />
                            </div>
                            <div className="p-8">
                                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {usersDetails?.retireProfessional?.name?.firstName} {usersDetails?.retireProfessional?.name?.lastName }
                                </h1>
                                <p className="mt-2 text-xl text-gray-500">{usersDetails?.expertise}</p>
                                <div className="mt-4 flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <span className="ml-2 text-sm text-gray-600">
                                        {usersDetails?.averageRating.toFixed(1)} ({usersDetails?.reviewCount} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                                    <p className="text-gray-700">{usersDetails?.bio}</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-600">
                                            <MdOutlineEmail className="h-5 w-5 mr-2" />
                                            {usersDetails?.retireProfessional?.email}
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <Briefcase className="h-5 w-5 mr-2" />
                                            {usersDetails?.industry}
                                        </li>
                                        {/* {usersDetails.availability && ( */}
                                            <li className="flex items-center text-gray-600">
                                                <Clock className="h-5 w-5 mr-2" />
                                                Availability: {usersDetails?.availability} hours/week
                                            </li>
                                        {/* // )} */}
                                        {usersDetails?.hourlyRate && (
                                            <li className="flex items-center text-gray-600">
                                                <DollarSign className="h-5 w-5 mr-2" />
                                                Hourly Rate: {usersDetails?.hourlyRate}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-6 bg-gray-50">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Experience</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {usersDetails?.technicalSkill && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Technical Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {usersDetails.technicalSkill.map((skill:any, index:number) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {usersDetails?.previousPositions && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Previous Positions</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            {usersDetails?.previousPositions.map((position:any, index:number) => (
                                                <li key={index}>{position}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                           
                        </div>
                        <div className="px-8 py-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600">
                                    <Phone className="h-5 w-5 mr-2" />
                                    {usersDetails?.phoneNumber}
                                </li>
                                {usersDetails?.linkedinProfile && (
                                    <li className="flex items-center text-gray-600">
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        <a
                                            href={usersDetails?.linkedinProfile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    </li>
                                )}
                                {usersDetails?.cvOrCoverLetter && (
                                    <li className="flex items-center text-gray-600">
                                        <FileText className="h-5 w-5 mr-2" />
                                        <a
                                            href={usersDetails?.cvOrCoverLetter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            CV/Cover Letter
                                        </a>
                                    </li>
                                )}
                                {usersDetails?.companyWebsite && (
                                    <li className="flex items-center text-gray-600">
                                        <Globe className="h-5 w-5 mr-2" />
                                        <a
                                            href={usersDetails?.companyWebsite}
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
                                    Born: {usersDetails?.dateOfBirth}
                                </li>
                            </ul>
                        </div>
                    </div>
                ): (
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <Image
                                        className="h-48 w-full object-cover md:w-48"
                                        src={avatar || "/placeholder.svg?height=192&width=192"}
                                        alt={`${usersDetails?.client?.name?.firstName}`}
                                        width={192}
                                        height={192}
                                    />
                                </div>
                                <div className="p-8">
                                    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                        { usersDetails?.client?.name?.firstName} {usersDetails?.client?.name?.lastName}
                                    </h1>
                                    <p className="mt-2 text-xl text-gray-500">{usersDetails?.jobTitle}</p>
                                    <div className="mt-4 flex items-center">
                                        <Star className="h-5 w-5 text-yellow-400" />
                                        <span className="ml-2 text-sm text-gray-600">
                                            {usersDetails?.averageRating.toFixed(1)} ({usersDetails?.reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 py-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                                        <p className="text-gray-700">{usersDetails?.description}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
                                        <ul className="space-y-3">
                                            <li className="flex items-center text-gray-600">
                                                <MdOutlineEmail className="h-5 w-5 mr-2" />
                                                {usersDetails?.client?.email}
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Briefcase className="h-5 w-5 mr-2" />
                                                {usersDetails?.industry}
                                            </li>
                                            {/* {user.availability && (
                                                <li className="flex items-center text-gray-600">
                                                    <Clock className="h-5 w-5 mr-2" />
                                                    Availability: {user.availability} hours/week
                                                </li>
                                            )} */}
                                            {/* {user.hourlyRate && (
                                                <li className="flex items-center text-gray-600">
                                                    <DollarSign className="h-5 w-5 mr-2" />
                                                    Hourly Rate: {user.hourlyRate}
                                                </li>
                                            )} */}
                                            {usersDetails?.budgetRange && (
                                                <li className="flex items-center text-gray-600">
                                                    <DollarSign className="h-5 w-5 mr-2" />
                                                    Budget: ${usersDetails?.budgetRange?.min} - ${usersDetails?.budgetRange?.max}
                                                </li>
                                            )}
                                            {usersDetails?.projectDurationRange && (
                                                <li className="flex items-center text-gray-600">
                                                    <DollarSign className="h-5 w-5 mr-2" />
                                                    Budget: ${usersDetails?.projectDurationRange?.min} - ${usersDetails?.projectDurationRange?.max}
                                                </li>
                                            )}
                                          
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-gray-50">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Experience</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* {user.technicalSkills && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Technical Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {user.technicalSkills.map((skill, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )} */}
                                    {usersDetails?.projectPreference && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Previous Positions</h3>
                                            <ul className="list-disc list-inside text-gray-600">
                                                {usersDetails?.projectPreference.map((position:any, index:number) => (
                                                    <li key={index}>{position}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* {user.projectPreferences && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Project Preferences</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {user.projectPreferences.map((preference, index) => (
                                                <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                    {preference}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                            <div className="px-8 py-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-600">
                                        <Phone className="h-5 w-5 mr-2" />
                                        {usersDetails?.phoneNumber}
                                    </li>
                                    {usersDetails?.linkedinProfile && (
                                        <li className="flex items-center text-gray-600">
                                            <Linkedin className="h-5 w-5 mr-2" />
                                            <a
                                                href={usersDetails?.linkedinProfile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                LinkedIn Profile
                                            </a>
                                        </li>
                                    )}
                                    {usersDetails?.cvOrCoverLetter && (
                                        <li className="flex items-center text-gray-600">
                                            <FileText className="h-5 w-5 mr-2" />
                                            <a
                                                href={usersDetails?.cvOrCoverLetter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                CV/Cover Letter
                                            </a>
                                        </li>
                                    )}
                                    {usersDetails?.companyWebsite && (
                                        <li className="flex items-center text-gray-600">
                                            <Globe className="h-5 w-5 mr-2" />
                                            <a
                                                href={usersDetails?.companyWebsite}
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
                                        Born: {usersDetails?.dateOfBirth}
                                    </li>
                                </ul>
                            </div>
                        </div>
                )
           }
        </div>
    )
}

