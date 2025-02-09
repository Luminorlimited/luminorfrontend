"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import CheckBox from "@/components/common/checkbox/CheckBox";
import { useForm } from "react-hook-form";
import BusinesSvg from "@/components/svg/BusinesSvg";
import SettingSvg from "@/components/svg/Settings";
import TechnicalSvg from "@/components/svg/TechnicalSvg";
import HealthSvg from "@/components/svg/HealthSvg";
import Education from "@/components/svg/Education";
import Financial from "@/components/svg/Financial";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import avatar from "@/assets/images/avatar.jpg";
import {
  useEditprofessionalprofileMutation,
  useGetProfileQuery,
} from "@/redux/Api/userApi";

const servicesData = [
  {
    icon: <BusinesSvg />,
    title: "Business consultancy and management",
    description: "Business consultancy and management",
  },
  {
    icon: <SettingSvg />,
    title: "Engineering services",
    description: "Engineering services",
  },
  {
    icon: <TechnicalSvg />,
    title: "Technical services",
    description: "Technical services",
  },
  {
    icon: <HealthSvg />,
    title: "Healthcare and medical consultancy",
    description: "Healthcare and medical consultancy",
  },
  {
    icon: <Education />,
    title: "Education and training",
    description: "Education and training",
  },
  {
    icon: <Financial />,
    title: "Legal and financial services",
    description: "Legal and financial services",
  },
];

interface ProfileData {
  [key: string]: any; // Use a more specific type if you know the data shape
}
export default function Professional() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop here
  };

  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [editprofessionalProfile] = useEditprofessionalprofileMutation();
  const userId = useParams();

  const userIdValue = userId.id;

  //   const watchSelectedService = watch("selectedService");
  const { data: profileData } = useGetProfileQuery(userIdValue);
  const [myProfileData, setProfileData] = useState<ProfileData>(
    profileData || {}
  );

  useEffect(() => {
    if (profileData) {
      setProfileData(profileData);
    }
  }, [profileData]);

  const handleChange = (key: string, value: any) => {
    setProfileData((prevData: ProfileData) => {
      const newData = structuredClone(prevData); // Deep clone the object (modern way)

      const keys = key.split(".");
      let temp: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) temp[keys[i]] = {};
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
      return newData;
    });
  };
  const [workSample, setWorkSample] = useState<string | File>(
    profileData?.data?.workSample
  );

  const [selectedImage, setSelectedImage] = useState<string | File>(
    profileData?.data?.profileUrl
  );

  const handleSubmitForm = async (data: any) => {
    setLoading(true);
    if (!data || typeof data !== "object") {
      console.error("Invalid form data");
      toast.error("Invalid form data");
      return;
    }

    console.log("Form Data:", data);

    const formData = new FormData();
    Object.entries(data).forEach(([Key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(Key, value as string);
      }
    });
    console.log("My profile url is", selectedImage);

    formData.append("name[firstName]", data.firstName);
    formData.append("name[lastName]", data.lastName);

    if (selectedImage instanceof File) {
      formData.append("profileUrl", selectedImage);
    }
    if (workSample instanceof File) {
      formData.append("workSample", workSample);
      console.log("Work Sample file added:", workSample);
    }

    console.log("My Form data", formData);

    try {
      if (data.location) {
        const geocodeResult = await geocodeLocation(data.location);

        if (geocodeResult) {
          const locationData = {
            type: "point",
            coordinates: [geocodeResult.latitude, geocodeResult.longitude],
          };
          formData.append("location", JSON.stringify(locationData));
          console.log("My location data is", locationData);
        }
      } else {
        console.warn("Location is undefined or empty.");
      }

      const res = await editprofessionalProfile({
        id: userIdValue,
        data: formData,
      });
      if (!res || typeof res !== "object") {
        throw new Error("Invalid response from the server");
      } else {
        toast.success("Profile Updated Successfully");

        console.log("My response is", formData);
      }
      // reset();
    } catch (error: any) {
      console.error("Error occurred:", error);
      toast.success(error.message || "Profile Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const geocodeLocation = async (location: string) => {
    if (!location) return null;

    try {
      const apiKey = "AIzaSyD3oE6zpQw1EFzWBrCuhPdAeqedjp46tNA";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.error("Geocoding failed:", data.status);
        toast.error("Unable to fetch location coordinates.");
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("Failed to fetch location coordinates.");
      return null;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Ensure only image files are processed
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setSelectedImage(file); // Set the file directly
    }
  };

  const imageSrc = useMemo(() => {
    if (selectedImage instanceof File) {
      return URL.createObjectURL(selectedImage);
    }
    if (typeof selectedImage === "string" && selectedImage.length) {
      return selectedImage;
    }
    return avatar.src;
  }, [selectedImage]);

  useMemo(() => {
    if (selectedImage instanceof File) {
      const url = URL.createObjectURL(selectedImage);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}

      {/* Header with gradient */}
      <div
        className="bg-cover bg-center h-[324px]"
        style={{ backgroundImage: "url(/images/profilebanner.png)" }}
      />

      {/* Main Content */}
      <main className="flex-1 -mt-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            encType="multipart/form-data"
          >
            {/* Profile Section */}
            <div className="relative text-center mb-12">
              <div className="relative inline-block">
                <Image
                  src={imageSrc}
                  alt="profile-img"
                  {...register("profileUrl")}
                  onChange={(e) =>
                    setValue("profileUrl", (e.target as HTMLInputElement).value)
                  }
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white object-cover w-40 h-40"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  className="hidden-input hidden"
                  onChange={handleImageChange}
                />
                {/* Cog button to trigger file input */}
                <button
                  className="cog-button absolute bottom-5 right-0"
                  type="button"
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "fileInput"
                    ) as HTMLInputElement | null;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  <div className="p-2 bg-bg_primary hover:bg-[#5334c5] hover:scale-105 transition-all rounded-[5px]">
                    <PiNotePencilBold className="cog-icon text-3xl text-white " />
                  </div>
                </button>
              </div>

              <h1 className="text-2xl font-semibold mt-4">
                {myProfileData?.data?.retireProfessional?.name?.firstName}{" "}
                {myProfileData?.data?.retireProfessional?.name?.lastName}
              </h1>
              <p className="text-gray-600">
                {" "}
                I am {profileData?.data?.expertise || "an expert"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="fname" className="block text-sm mb-2">
                    First name
                  </label>
                  <input
                    id="fname"
                    {...register("firstName")}
                    placeholder="John"
                    defaultValue={
                      myProfileData?.data?.retireProfessional?.name?.firstName
                    }
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    onChange={(e) =>
                      handleChange(
                        "data.retireProfessional.name.firstName",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="block text-sm mb-2">
                    Last name
                  </label>
                  <input
                    id="fname"
                    {...register("lastName")}
                    placeholder="Watson"
                    defaultValue={
                      myProfileData?.data?.retireProfessional?.name?.lastName
                    }
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    onChange={(e) =>
                      handleChange(
                        "data.retireProfessional.name.lastName",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phn" className="block text-sm mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    defaultValue={profileData?.data?.phoneNumber}
                    {...register("phone")}
                    id="phn"
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    onChange={(e) => setValue("phone", e.target.value)}
                    placeholder="0987654 456"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email *
                  </label>
                  <input
                    defaultValue={profileData?.data?.retireProfessional?.email}
                    id="email"
                    {...register("email")}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    onChange={(e) => setValue("email", e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="loc">
                  Location *
                </label>
                <input
                  id="loc"
                  {...register("location")}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  onChange={(e) => setValue("location", e.target.value)}
                  placeholder="USA"
                />
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="problemArea">
                  Bio (Under 30 word)
                </label>
                <input
                  id="problemArea"
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  {...register("bio")}
                  defaultValue={profileData?.data?.bio}
                  onChange={(e) => setValue("bio", e.target.value)}
                  placeholder="I'm a healthcare and medical specialist"
                />
              </div>

              <div>
                <label htmlFor="mainDesc" className="block text-sm mb-2">
                  Description
                </label>
                <textarea
                  id="mainDesc"
                  {...register("description")}
                  defaultValue={profileData?.data?.description || ""}
                  // onChange={(e) => setValue("description", e.target.value)}
                  placeholder="Write your Description"
                  className="w-full border p-3 rounded-[10px]  focus:border-primary focus:outline-none"
                  rows={5}
                />
              </div>
              <div>
                <h3 className="text-sm mb-4">Skills / Expertise</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {servicesData.map((service, index) => {
                    // Determine if the service is selected
                    const isSelected =
                      watch("expertise") === service.title ||
                      profileData?.data?.expertise === service.title;

                    const selectedClass = isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100";

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          // Update form state with the selected service
                          setValue("expertise", service.title);
                          console.log(`Selected service: ${service.title}`);
                        }}
                        className={`flex flex-col shadow-md items-center gap-2 px-[13px] py-[13px] rounded-[12px] ${selectedClass} cursor-pointer transition-all`}
                      >
                        <div className="w-12 h-12">{service.icon}</div>
                        <span className="text-[14px] pt-2 font-[400] text-left">
                          {service.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <select
                  {...register("abailability")}
                  id="countries"
                  onChange={(e) => setValue("abailability", e.target.value)}
                  className="border outline-none focus:outline-none focus:border-primary rounded-[10px] w-full py-3 px-2"
                  defaultValue={profileData?.data?.availability || ""}
                >
                  <option>Availability</option>
                  <option value="US">United States</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="prefProject">
                  Preferred Projects*
                </label>
                <input
                  {...register("preferedProjects")}
                  id="prefProject"
                  defaultValue={profileData?.data?.preferedProjects}
                  required
                  onChange={(e) => setValue("preferedProjects", e.target.value)}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  placeholder="Write your Preferred Project"
                />
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="hourlyRate">
                  Hourly Rate (USD) *
                </label>
                <input
                  {...register("hourlyRate")}
                  id="hourlyRate"
                  type="number"
                  defaultValue={profileData?.data?.hourlyRate}
                  onChange={(e) => setValue("hourlyRate", e.target.value)}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  placeholder="$100"
                />
              </div>

              <div className="flex items-center gap-3">
                <CheckBox />
                <p>Project Based Pricing</p>
              </div>
              <div
                className={`relative p-8 rounded-[15px] border-2 border-dashed hover:border-slate-700 transition-all ${
                  isDragging
                    ? "border-gray-400 rounded-xl bg-gray-50"
                    : "border-gray-200"
                } transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center">
                    <AiOutlinePlus className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Work Sample (Optional)
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload or drag and drop
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      PDF (Preferred), Docx, Doc, RTF, Txt
                    </p>
                  </div>

                  <button className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <AiOutlineUpload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setWorkSample(file); // Update file state
                      setValue("workSample", file); // Update React Hook Form value
                      console.log("File selected:", file);
                    }
                  }}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className={`bg-primary py-5 px-7 rounded-[50px] my-14 ${
                    loading
                      ? "bg-gray-500 text-black"
                      : "bg-primary text-white "
                  }`}
                >
                  {loading ? "Saving..." : "Save Information"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
