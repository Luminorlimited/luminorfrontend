"use client"

import { useEffect, useState } from "react"
import { User, Mail,  Briefcase, Calendar, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
// import logo from '@/assets/images/palak.jpg'
import Image from 'next/image'
// import { useSelector } from "react-redux"
// import { RootState } from "@/redux/store";
import { useGetProfileQuery } from "@/redux/Api/userApi"
import { useUpdateAdminMutation } from "@/redux/Api/dashboard/userapi"
import { AvatarFallback } from "@radix-ui/react-avatar"


interface AdminProfile {
    name: {
        firstName: string
        lastName: string
    }
    email: string
    phone: string
    profileUrl: string
    role: string
    createdAt: string
}

export default function Profile() {
    const { data: getProfile } = useGetProfileQuery(undefined)
    const [updateProfile] = useUpdateAdminMutation()
    const [updateProfileImage] = useUpdateAdminMutation()

    const [profile, setProfile] = useState<AdminProfile | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [newProfileImage, setNewProfileImage] = useState<File | null>(null)

    useEffect(() => {
        if (getProfile?.data) {
            setProfile(getProfile.data)
        }
    }, [getProfile])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfile((prev) => {
            if (!prev) return null
            return {
                ...prev,
                name: {
                    ...prev.name,
                    [name]: value,
                },
            }
        })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log("my file ", file);
        if (file) {
            setNewProfileImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profile) return

        try {
            // Update profile data

            if (newProfileImage) {
                const formData = new FormData()
                formData.append("profileUrl", newProfileImage)
                await updateProfileImage(formData).unwrap()
            }

            await updateProfile({
                // profileUrl: profile.profileUrl,
                name: {
                    firstName: profile.name.firstName,
                    lastName: profile.name.lastName,
                },
            }).unwrap()

            

            // Update profile image if a new one was selected
            

            setIsEditing(false)
            setNewProfileImage(null)
        } catch (error) {
            console.error("Failed to update profile:", error)
        }
    }

    if (!profile) return null

    return (
        <div className="container mx-auto p-6 bg-bg_secondary min-h-[80vh]">
            <div className="max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex rounded-[10px] overflow-hidden">
                    {/* Left column - Avatar and basic info */}
                    <div className="md:w-1/3 bg-bg_primary p-8 text-white">
                        <div className="text-center">
                            <Avatar className="w-48 h-48 mx-auto mb-6 border-4 border-white">
                                <Image
                                    src={newProfileImage ? URL.createObjectURL(newProfileImage) : profile.profileUrl}
                                    alt={profile.name.firstName}
                                    width={192}
                                    height={192}
                                />
                                <AvatarFallback>{profile.name.firstName[0]}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold mb-2">
                                {profile.name.firstName} {profile.name.lastName}
                            </h2>
                            <p className="text-gray-300 mb-4">{profile.role}</p>
                            {isEditing && (
                                <div>
                                    <Label
                                        htmlFor="avatar"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Change Avatar
                                    </Label>
                                    <Input id="avatar" type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                                </div>
                            )}
                        </div>
                        <Separator className="my-6 bg-gray-600" />
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Briefcase className="w-5 h-5 mr-3" />
                                <span>{profile.role}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-3" />
                                <span>Joined: {new Date(profile.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Editable fields */}
                    <div className="md:w-2/3 p-8 text-black bg-[#e6e6e6]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold">Profile Information</h3>
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center">
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="space-x-2">
                                    <Button onClick={handleSubmit} variant="default">
                                        <Check className="w-4 h-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsEditing(false)
                                            setNewProfileImage(null)
                                            setProfile(getProfile?.data || null)
                                        }}
                                        variant="outline"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-800">
                                        First Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={profile.name.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-800">
                                        Last Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={profile.name.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-800">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={profile.email}
                                            disabled={true}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

