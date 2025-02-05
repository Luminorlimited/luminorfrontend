"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import { TUser } from "@/types/user.type";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

export default function DashboardProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const [updateUser, { isLoading }] = useUpdateProfileMutation();
  const { userProfile, isProfileLoading } = useGetMyProfileQuery(
    {},
    {
      selectFromResult({ data, isLoading }) {
        return {
          userProfile: data?.data as TUser,
          isProfileLoading: isLoading,
        };
      },
      skip: !token,
    }
  );

  const { register, handleSubmit, reset } = useForm<ProfileData>();

  useEffect(() => {
    if (userProfile?.profileImage) {
      setImagePreview(userProfile.profileImage);
    }
    reset({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
    });
  }, [userProfile]);

  const onSubmit = (data: ProfileData) => {
    console.log("Form submitted:", data);
    const formData = new FormData();
    const updatedData = {
      name: data.name,
      phoneNumber: data.phoneNumber,
    };
    formData.append("data", JSON.stringify(updatedData));
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      toast.promise(updateUser(formData).unwrap(), {
        loading: "Updating profile...",
        success: (data: any) => {
          // console.log(data);
          if (data?.success) {
            return data.message || "Profile updated successfully";
          }
        },
        error: "Failed to update profile",
      });
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setProfileImage(file);
    }
  };

  const removeImage = () => {
    setImagePreview("/placeholder.svg");
  };

  return (
    <div className="min-h-screen bg-black text-white px-0 md:px-14 py-0 md:py-9 rounded-lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row space-y-5 justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">My profile</h1>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur. Dolor sollicitudin
            </p>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-400 bg-black"
              onClick={() => setIsEditing(true)}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Image Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
            <h2 className="text-sm font-medium text-gray-400 mr-0 md:mr-32">
              Profile Image
            </h2>
            <Avatar className="w-16 h-16">
              <AvatarImage src={imagePreview || ""} />
              <AvatarFallback className="bg-bg_primary">JS</AvatarFallback>
            </Avatar>
            <div className="space-y-4 md:space-x-4 md:space-y-0 flex flex-col md:flex-row justify-center items-center">
              <Button
                variant="secondary"
                className="text-[#AFAFAF] bg-[#1A1A1A] h-auto px-4 "
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                Replace image
              </Button>
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                className="text-[#AFAFAF] border-[#22242D] bg-black h-auto px-4"
                onClick={removeImage}
              >
                Remove image
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  disabled
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="text-[#BEBEBE] border-[#BEBEBE] bg-black w-[130px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 w-[130px]"
              >
                Save
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Name</label>
              <p className="text-white">{userProfile?.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-white">{userProfile?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Mobile Number</label>
              <p className="text-white">{userProfile?.phoneNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
