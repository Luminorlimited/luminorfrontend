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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Education from "@/components/svg/Education";
import Financial from "@/components/svg/Financial";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import avatar from "@/assets/placeholderimg.png";
import {
  useEditprofessionalprofileMutation,
  useGetProfileQuery,
  useUpdateCoverPhotoMutation,
} from "@/redux/Api/userApi";
import bgCover from "@/assets/images/bannerimg.jpg";
// import { useSendOnboardingUrlMutation } from "@/redux/Api/messageApi";
import { cn } from "@/lib/utils";
import LoaderAnimation from "@/components/loader/LoaderAnimation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import Link from "next/link";
import { Button } from "@/components/ui/button";

const servicesData = [
  {
    icon: <BusinesSvg />,
    title: "Business consultancy and management",
    description: "Business consultancy and management",
    backendValue: "BUSINESS_CONSULTENCY_AND_MANAGEMENT",
  },
  {
    icon: <SettingSvg />,
    title: "Engineering services",
    description: "Engineering services",
    backendValue: "ENGINEERING_SERVICE",
  },
  {
    icon: <TechnicalSvg />,
    title: "Technical services",
    description: "Technical services",
    backendValue: "TECHNICAL_SERVICES",
  },
  {
    icon: <HealthSvg />,
    title: "Healthcare and medical consultancy",
    description: "Healthcare and medical consultancy",
    backendValue: "HEALTHCARE_AND_MEDICAL_CONSULTENCY",
  },
  {
    icon: <Education />,
    title: "Education and training",
    description: "Education and training",
    backendValue: "EDUCATIONAL_AND_TRAINING",
  },
  {
    icon: <Financial />,
    title: "Legal and financial services",
    description: "Legal and financial services",
    backendValue: "LEGAL_AND_FINANCIAL_SERVICES",
  },
];

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
  const removeFile = () => {
    setWorkSample("");
    setValue("workSample", null);
  };
  const userId = useParams();

  const userIdValue = userId.id;

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const user = useSelector((state: RootState) => state.Auth.user);

  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [editprofessionalProfile] = useEditprofessionalprofileMutation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState("");
  // const [showAlert, setShowAlert] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(bgCover);

  // const handleClose = () => {
  //   setShowAlert((prev) => !prev);
  // };
  // useEffect(() => {
  //   if (profileData?.data?.retireProfessional?.stripe?.isOnboardingSucess) {
  //     setShowAlert(false);
  //   } else {
  //     setShowAlert(true);
  //   }
  // }, [profileData?.data?.retireProfessional?.stripe?.isOnboardingSucess]);

  useEffect(() => {
    if (
      profileData?.data?.location?.coordinates[1] &&
      profileData?.data?.location?.coordinates[0]
    ) {
      const fetchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${profileData?.data?.location?.coordinates[1]}&lon=${profileData?.data?.location?.coordinates[0]}`
          );
          const data = await response.json();
          if (data?.display_name) {
            setLocation(data.display_name); // Set location from API response
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };

      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    profileData?.data?.location?.coordinates[1],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    profileData?.data?.location?.coordinates[0],
  ]);

  const timeSlots = ["Morning", "Afternoon", "Evening"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayShortForm: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;

    const initAutocomplete = () => {
      const input = document.getElementById("search-input") as HTMLInputElement;
      // console.log("input is", input);
      if (input) {
        autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (!place.geometry || !place.geometry.location) {
            alert(`No details available for input: '${place.name}'`);
            return;
          }

          setLatitude(place.geometry.location.lat());
          setLongitude(place.geometry.location.lng());
          setLocation(place.formatted_address || "");
        });
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ0plDgHg98kDg9lfyL-BFDf-qis9y02g&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (profileData) {
      reset({
        firstName: profileData.data.retireProfessional.name.firstName,
        lastName: profileData.data.retireProfessional.name.lastName,
        phone: profileData.data.phoneNumber,
        email: profileData.data.retireProfessional.email,
        bio: profileData.data.bio === "null" ? "" : profileData.data.bio,
        description:
          profileData.data.description === "null"
            ? ""
            : profileData.data.description,
        expertise: profileData.data.expertise,
        duration: profileData.data.duration,
        preferedProjects: profileData.data.preferedProjects,
        hourlyRate: profileData.data.hourlyRate,
        workSample: profileData.data.workSample,
        profileUrl: profileData.data.profileUrl,
      });

      if (profileData.data.availability) {
        const availabilityObj: Record<string, string[]> = {};

        profileData.data.availability.forEach(
          (slot: { day: string; slots: any }) => {
            const fullDay = Object.keys(dayShortForm).find(
              (key) => dayShortForm[key] === slot.day
            );

            if (fullDay) {
              let timeSlots: string[];

              if (typeof slot.slots === "string") {
                // If slots is a string, split it
                timeSlots = slot.slots.split(",");
              } else if (Array.isArray(slot.slots)) {
                // If slots is already an array, use it directly
                timeSlots = slot.slots;
              } else {
                // If slots is missing or an unexpected type, assign an empty array
                timeSlots = [];
              }

              availabilityObj[fullDay] = timeSlots;
            }
          }
        );

        setSelectedValues(availabilityObj);
      }
    }
  }, [profileData, reset]);

  const [workSample, setWorkSample] = useState<string | File>(
    profileData?.data?.workSample
  );

  // Store selected values for each day
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string[]>
  >({});

  const handleTimeSlotClick = (day: string, timeSlot: string) => {
    setSelectedValues((prev) => {
      const daySelections = prev[day] || [];
      if (daySelections.includes(timeSlot)) {
        // Remove the time slot if it's already selected
        return {
          ...prev,
          [day]: Array.isArray(daySelections)
            ? daySelections.filter((slot) => slot !== timeSlot)
            : [],
        };
      } else {
        // Add the time slot if it's not already selected
        return {
          ...prev,
          [day]: [...daySelections, timeSlot],
        };
      }
    });
  };
  const [selectedImage, setSelectedImage] = useState<string | File>(
    profileData?.data?.profileUrl
  );

  const router = useRouter();

  const handleSubmitForm = async (data: any) => {
    setLoading(true);

    if (!data || typeof data !== "object") {
      console.error("Invalid form data");
      toast.error("Invalid form data");
      return;
    }

    // console.log("Form Data:", data);

    const formData = new FormData();
    Object.entries(data).forEach(([Key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(Key, value as string);
      }
    });

    const availabilityArray = Object.entries(selectedValues)
      .filter(([, slots]) => slots.length > 0)
      .map(([day, slots]) => ({
        day: dayShortForm[day], // Convert day name to short form
        slots: slots,
      }));

    // console.log("Availability Data (Before Sending):", availabilityArray);
    formData.append("availability", JSON.stringify(availabilityArray));

    // console.log("Availability data:", availabilityArray)

    formData.append("name[firstName]", data.firstName);
    formData.append("name[lastName]", data.lastName);
    formData.append("location[type]", "Point");
    formData.append("location[coordinates][0]", longitude.toString());
    formData.append("location[coordinates][1]", latitude.toString());

    if (selectedImage instanceof File) {
      formData.append("profileUrl", selectedImage);
    }
    if (workSample instanceof File) {
      formData.append("workSample", workSample);
      // console.log("Work Sample file added:", workSample);
    }
    const formDataJSON = Object.fromEntries(formData.entries());
    // formDataJSON.availability = JSON.parse(formDataJSON); // Parse availability back to an object

    console.log("FormData as JSON:", formDataJSON);

    try {
      const res = await editprofessionalProfile({
        id: userIdValue,
        data: formData,
      });

      if (!res || typeof res !== "object") {
        throw new Error("Invalid response from the server");
      } else {
        console.log("respponse is", res?.data?.message);
        toast.success(res?.data?.message);
        setWorkSample("");
        router.push("/project-list/client");
        // console.log("My response is", formData);
      }
      // reset();
    } catch (error: any) {
      console.error("Error occurred:", error);
      toast.success(error.message || "Profile Update Failed");
    } finally {
      setLoading(false);
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

    if (typeof selectedImage === "string" && selectedImage.trim().length > 0) {
      return selectedImage;
    }

    if (
      profileData?.data?.profileUrl &&
      profileData.data.profileUrl !== "null" &&
      profileData.data.profileUrl.trim().length > 0
    ) {
      return profileData.data.profileUrl; // Use latest profile URL
    }

    return avatar.src; // Default avatar
  }, [selectedImage, profileData?.data?.profileUrl]);

  // Watch for profileData updates

  useMemo(() => {
    if (selectedImage instanceof File) {
      const url = URL.createObjectURL(selectedImage);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  const [updateCoverPhoto, { isLoading: coverPhotoLoading }] =
    useUpdateCoverPhotoMutation();
  const handleCoverPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("coverPhoto", file);

        // Ensure the mutation correctly handles FormData
        const response = await updateCoverPhoto(formData).unwrap();

        if (response) {
          toast.success("Cover photo updated successfully");

          // Update the background image
          const newCoverPhotoUrl = URL.createObjectURL(file);
          setImageUrl(newCoverPhotoUrl);
        }
      } catch (error) {
        console.error("Error updating cover photo:", error);
        toast.error("Image is too large. Please upload a smaller image");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoaderAnimation />
      </div>
    );
  }
  
  const handleonboarding = () => {};
  return (
    <div className="min-h-screen flex flex-col">
      {user?.role === "retireProfessional" &&
        !profileData?.data?.retireProfessional?.stripe?.isOnboardingSucess && (
          <div className="container py-1">
            <p>
              Your are not onboarding {" "}
              <Button className="bg-bg_primary rounded-[9px]" onClick={handleonboarding}>Send Onboarding url</Button>
            </p>
          </div>
        )}

      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center">
        {coverPhotoLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <Image
            className="w-full h-full object-cover"
            src={
              profileData?.data?.coverUrl
                ? profileData?.data?.coverUrl
                : imageUrl
            }
            width={1200}
            height={400}
            alt="cover-image "
          />
        )}
      </div>

      <button
        type="button"
        className="cog-button absolute top-[380px] right-4 z-[10000]"
        onClick={() => {
          const fileInput = document.getElementById(
            "coverPhotoInput"
          ) as HTMLInputElement | null;
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        <div className="p-2 bg-bg_primary hover:bg-[#5334c5] hover:scale-105 transition-all rounded-[5px]">
          <PiNotePencilBold className="cog-icon text-lg text-white " />
        </div>
      </button>

      <input
        type="file"
        accept="image/*"
        id="coverPhotoInput"
        className="hidden"
        onChange={handleCoverPhotoChange}
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
                {watch("firstName") ||
                  profileData?.data?.retireProfessional?.name?.firstName}{" "}
                {watch("lastName") ||
                  profileData?.data?.retireProfessional?.name?.lastName}
              </h1>
              <p className="text-gray-600">
                {" "}
                {profileData?.data?.bio &&
                profileData?.data?.bio.trim() &&
                profileData?.data?.bio.trim() !== "null" &&
                profileData?.data?.bio != " "
                  ? `I am ${profileData?.data?.bio}`
                  : ""}
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
                    placeholder="Write your First Name"
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    // onChange={(e) => setValue("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="block text-sm mb-2">
                    Last name
                  </label>
                  <input
                    id="lname"
                    {...register("lastName")}
                    placeholder="Write your Last Name"
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    // onChange={(e) => setValue("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phn" className="block text-sm mb-2">
                    Phone Number
                  </label>
                  {/* <Controller
                    name="Phone Number"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country={"us"}
                        inputProps={{ id: "phoneNumber" }}
                        containerClass="!w-full"
                        inputClass="!w-full !h-10 !text-base !rounded-[8px] !pl-12 mt-2 hover:!border-primary focus:!border-primary border focus:!ring-0 !outline-none"
                        buttonClass="!h-10 !rounded-l-[8px] !border-r-0 hover:!border-primary focus:!border-primary"
                        placeholder="Phone number"
                        onChange={(value: string) => field.onChange(value)}
                      />
                    )}
                  /> */}
                  <input
                    required
                    defaultValue={profileData?.data?.phoneNumber}
                    {...register("phone")}
                    id="phn"
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    // onChange={(e) => setValue("phone", e.target.value)}
                    placeholder="Write your Phone Number"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email
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
                <label className="block text-sm mb-2" htmlFor="search-input">
                  Location
                </label>
                <input
                  id="search-input"
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  value={location} // Show selected location
                  onChange={(e) => setLocation(e.target.value)} // Update state when user types
                  placeholder="Search for a location..."
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
                  // onChange={(e) => setValue("bio", e.target.value.length > 0 ? e.target.value :  "")}
                  placeholder="Write your Bio"
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {servicesData.map((service, index) => {
                    // Determine if the service is selected
                    const isSelected =
                      watch("expertise") === service.backendValue ||
                      profileData?.data?.expertise === service.title;

                    const selectedClass = isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100";

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          // Update form state with the selected service
                          setValue("expertise", service.backendValue);
                          // console.log(`Selected service: ${service.title}`);
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
                <label htmlFor="duration">Duration</label>
                <select
                  {...register("duration")}
                  id="duration"
                  required
                  // onChange={(e) => setValue("duration", e.target.value)}
                  className="border outline-none focus:outline-none focus:border-primary rounded-[10px] w-full py-3 px-2"
                  defaultValue={profileData?.data?.duration ?? ""}
                >
                  <option value="">Select Duration</option>
                  <option value={20}>Short Term (1-29) days</option>
                  <option value={31}>Long Term (30-...) days</option>
                </select>
              </div>

              <div>
                <label htmlFor="duration text-lg pb-4">Availability</label>

                <div className="p-4 w-full mx-auto overflow-hidden">
                  <div className="overflow-hidden overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2 text-left text-sm">
                            Time Slot
                          </th>
                          {days.map((day) => (
                            <th
                              key={day}
                              className="border border-gray-300 p-2 text-center text-sm"
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10"
                          >
                            Select
                          </th>
                          {days.map((day) => (
                            <td key={day} className="px-6 py-4 text-center">
                              <div className="w-[150px] mx-auto">
                                {timeSlots.map((slot) => (
                                  <div
                                    key={slot}
                                    className={cn(
                                      "p-2 mb-1 border border-gray-300 rounded-md cursor-pointer text-center",
                                      selectedValues[day]?.includes(slot)
                                        ? "bg-[#A020F0] text-white"
                                        : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                                    )}
                                    onClick={() =>
                                      handleTimeSlotClick(day, slot)
                                    }
                                  >
                                    {slot}
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="prefProject">
                  Preferred Projects
                </label>
                <input
                  {...register("preferedProjects")}
                  id="prefProject"
                  defaultValue={profileData?.data?.preferedProjects}
                  required
                  // onChange={(e) => setValue("preferedProjects", e.target.value)}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  placeholder="Write your Preferred Project"
                />
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="hourlyRate">
                  Hourly Rate (USD)
                </label>
                <input
                  {...register("hourlyRate")}
                  id="hourlyRate"
                  type="number"
                  defaultValue={profileData?.data?.hourlyRate}
                  // onChange={(e) => setValue("hourlyRate", e.target.value)}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
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
                      Img (Preferred), jpeg, jpg, png
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
                      setValue("workSample", file);
                      // console.log("File selected:", file);
                    }
                  }}
                />
              </div>
              <div>
                {workSample && (
                  <div className="mt-4 text-center">
                    <p className="text-left text-lg font-medium">
                      Preview Work Sample
                    </p>
                    {workSample instanceof File &&
                      workSample.type.startsWith("image/") && (
                        <Image
                          src={URL.createObjectURL(workSample)}
                          alt="Preview"
                          width={250}
                          height={250}
                          className="mt-2 max-w-full h-auto rounded-lg border border-gray-300"
                        />
                      )}
                    <button
                      onClick={removeFile}
                      className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove File
                    </button>
                  </div>
                )}
              </div>
              <div>
                {profileData?.data?.workSample &&
                profileData?.data?.workSample !== "null" ? (
                  <div>
                    <p className="text-left text-lg font-medium">Work Sample</p>

                    <Image
                      src={profileData?.data?.workSample}
                      alt="Preview"
                      width={250}
                      height={250}
                      className="mt-2 max-w-full h-auto rounded-lg border border-gray-300"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="flex justify-center">
                <button
                  disabled={loading}
                  className={` py-5 px-7 rounded-[50px] my-14 ${
                    loading
                      ? "bg-gray-500 text-white"
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
