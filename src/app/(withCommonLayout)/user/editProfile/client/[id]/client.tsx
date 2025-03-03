"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiNotePencilBold } from "react-icons/pi";
import BusinesSvg from "@/components/svg/BusinesSvg";
import SettingSvg from "@/components/svg/Settings";
import TechnicalSvg from "@/components/svg/TechnicalSvg";
import HealthSvg from "@/components/svg/HealthSvg";
import Education from "@/components/svg/Education";
import Financial from "@/components/svg/Financial";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { useParams } from "next/navigation";
import avatar from "@/assets/placeholderimg.png"
import { toast } from "sonner";
import bgCover from "@/assets/coverimg.png"

import {
  useEditclientprofileMutation,
  useGetProfileQuery,
  useUpdateCoverPhotoMutation,
} from "@/redux/Api/userApi";
// import bgCover from "@/assets/images/profilebanner.png";

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

// const minGap = 0;
const minPrice = 1;
const maxPrice = 400;
interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export default function Client() {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const token = useSelector((state: RootState) => state.Auth.token);

  const { id: userIdValue } = useParams();
  const [imageUrl, setImageUrl] = useState<any>(bgCover)

  // Decode the token
  try {
    if (token) {
      jwtDecode<DecodedToken>(token);
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const [editclientProfile] = useEditclientprofileMutation();

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const [budgetMinValue, setBudgetMinValue] = useState<number | null>(null);
  const [budgetMaxValue, setBudgetMaxValue] = useState<number | null>(null);
  const [durationMinValue, setDurationMinValue] = useState<number | null>(null);
  const [durationMaxValue, setDurationMaxValue] = useState<number | null>(null);

  // Set values when profileData is available
  useEffect(() => {
    if (profileData?.data?.budgetRange) {
      setBudgetMinValue(profileData.data.budgetRange.min ?? minPrice);
      setBudgetMaxValue(profileData.data.budgetRange.max ?? maxPrice);
    }
    if (profileData?.data?.projectDurationRange) {
      setDurationMinValue(profileData.data.projectDurationRange.min ?? minPrice);
      setDurationMaxValue(profileData.data.projectDurationRange.max ?? maxPrice);
    }
  }, [profileData]);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState("");
  // console.log("my old location is", location)

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


  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;

    const initAutocomplete = () => {
      const input = document.getElementById("search-input") as HTMLInputElement;
      console.log("input is", input);
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
        firstName: profileData.data.client.name.firstName,
        lastName: profileData.data.client.name.lastName,
        companyName: profileData.data.companyName ,
        companyWebsite: profileData.data.companyWebsite === "null" ? "" : profileData.data.companyWebsite,
        phoneNumber: profileData.data.phoneNumber,
        problemAreas: profileData.data.problemAreas === "null" ? "" : profileData.data.problemAreas,
        description: profileData.data.description === "null" ? "" : profileData.data.description,
        servicePreference: profileData.data.servicePreference,
        projectListing: profileData.data.projectListing === "null" ? "" : profileData.data.projectListing,
        projectPreference: profileData.data.projectPreference,
      });
    }
  }, [profileData, reset]);


  const [selectProject, setSelectProject] = useState<File | null>(null);

 

  const [selectedImage, setSelectedImage] = useState<string | File>(
    profileData?.data?.profileUrl
  );
  // console.log("my client profile url is", profileData?.data?.profileUrl);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: any) => {
    setLoading(true);
    // data.latitude = latitude
    // data.longitude = longitude
    data.minBudget = budgetMinValue;
    data.maxBudget = budgetMaxValue;
    data.minDuration = durationMinValue;
    data.maxDuration = durationMaxValue;
    data.projectPreference = inputs;

    const formData = new FormData();

    // Append valid data fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(key, String(value));
      }
    });

    // Append structured fields
    formData.append("name[firstName]", data.firstName);
    formData.append("name[lastName]", data.lastName);
    formData.append("location[type]", "Point");
    formData.append("location[coordinates][0]", longitude.toString());
    formData.append("location[coordinates][1]", latitude.toString());
    formData.append("projectDurationRange[max]", String(data.maxDuration));
    formData.append("projectDurationRange[min]", String(data.minDuration));
    formData.append("budgetRange[min]", String(data.minBudget));
    formData.append("budgetRange[max]", String(data.maxBudget));

    // // console.log(data?.firstName, data?.lastName); return

    // Append project preferences array
    if (Array.isArray(data.projectPreference)) {
      data.projectPreference.forEach((preference: string) => {
        if (preference.trim()) {
          formData.append("projectPreference[]", preference);
        }
      });
    }

    // Append projectUrl if available
    if (selectProject) {
      formData.append("projectUrl", selectProject);
    }

    // Append the profile image if it's a file
    if (selectedImage instanceof File) {
      formData.append("profileUrl", selectedImage);
    }

    try {
      // console.log("profile data is", data);

      const res = await editclientProfile({ id: userIdValue, data: formData });
      if (res) {
        toast.success("Profile Updated Successfully");
        // console.log("Profile update response:", res.data);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Profile update failed");
      console.error(error);
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

  // Handle file input change
  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Get the selected file
    if (file) {
      setSelectProject(file);

      // console.log("File selected:", file.name);
    }
  };

  const [inputs, setInputs] = useState<string[]>(
    profileData?.data?.projectPreference || []
  );

  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, ""]);
  };
  const handleDeleteInput = (index: number) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  // Use useEffect to log state changes
  useEffect(() => {
    // console.log("selectProject state updated:", selectProject);
  }, [selectProject]);
  console.log("image url", imageUrl);
  const [updateCoverPhoto, { isLoading: iscoverPhotoLoading }] = useUpdateCoverPhotoMutation();

  const handleCoverPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    // console.log("my file", file);
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
          setImageUrl(newCoverPhotoUrl)

          // document
          //   .querySelector(".bg-cover")
          //   ?.setAttribute(
          //     "style",
          //     `background-image: url(${newCoverPhotoUrl})`
          //   );
        }
      } catch (error) {
        console.error("Error updating cover photo:", error);
        toast.error("Image is too large. Please upload a smaller image");
      }
    }
  };

  if (isLoading) {
    return <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-primary absolute top-1/2 left-1/2 " />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]  bg-cover bg-center">
        {iscoverPhotoLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <Image
            className="w-full h-full object-cover"
            src={imageUrl || profileData?.data?.coverUrl}
            width={1200}
            height={400}
            alt="cover image"
          />
        )}

      </div>

      <button
        type="button"
        className="cog-button absolute top-[410px] right-4 cursor-pointer z-[10000]"
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

      <main className="flex-1 -mt-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-y-3"
          >
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
                {watch("firstName") || profileData?.data?.client?.name?.firstName}{" "}
                {watch("lastName") || profileData?.data?.client?.name?.lastName}
              </h1>
              {/* <p className="text-gray-600">
                I&apos;m a healthcare and medical specialist
              </p> */}
            </div>
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="fname" className="block text-sm mb-2">
                    First name
                  </label>
                  <input
                    id="fname"
                    defaultValue={profileData?.data?.client?.name?.firstName || ""     }
                    {...register("firstName")}
                    // onChange={(e) => setValue("firstName", e.target.value)}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    placeholder="first name"
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="block text-sm mb-2">
                    Last name
                  </label>
                  <input
                    id="lname"
                    defaultValue={  profileData?.data?.client?.name?.lastName || ""  }
                    {...register("lastName")}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    // onChange={(e) => setValue("lastName", e.target.value)}
                    placeholder="last name"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="companyname" className="block text-sm mb-2">
                    Company name
                  </label>
                  <input
                    {...register("companyName")}
                    defaultValue={profileData?.data?.companyName || ""}
                    id="companyname"
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    placeholder="Write company name"
                  />
                </div>
                <div>
                  <label htmlFor="companyweb" className="block text-sm mb-2">
                    Company website
                  </label>
                  <input
                    id="companyweb"
                    {...register("companyWebsite")}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    placeholder="www.companyname.com"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phn" className="block text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phn"
                    defaultValue={profileData?.data?.phoneNumber || ""}
                    {...register("phoneNumber")}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    placeholder="0987654 456"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    defaultValue={profileData?.data?.client.email || ""}
                    className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                    placeholder="abc@xyz.com"
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
                  Problem areas or Skills needed
                </label>
                <input
                  id="problemArea"
                  {...register("problemAreas")}
                  defaultValue={profileData?.data?.problemAreas || ""}
                  className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                  placeholder="Write your Problem areas or Skills needed"
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
                  placeholder="Write your Description"
                  className="w-full border p-3 rounded-[10px]  focus:border-primary focus:outline-none"
                  rows={5}
                />
              </div>
              <div>
                <h3 className="text-sm mb-4">Industry / Service preferences</h3>
                <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2">
                  {servicesData.map((service, index) => {
                    // Determine if the service is selected
                    const isSelected =
                      watch("servicePreference") === service.backendValue ||
                      profileData?.data?.servicePreference === service.title;

                    const selectedClass = isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100";

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          // Update form state with the selected service
                          setValue("servicePreference", service.backendValue);
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
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <label className="block text-md mb-4">
                    Budget Preference
                  </label>
                  <div className="w-full py-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budgetMin" className="block text-sm mb-2">
                          Min Budget
                        </label>
                        <input
                          type="number"
                          id="budgetMin"
                          min={minPrice}
                          max={maxPrice}
                          // value={budgetMinValue}
                          value={budgetMinValue ?? ''}
                          onChange={(e) => setBudgetMinValue(Number(e.target.value))}
                          className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                        />
                      </div>
                      <div>
                        <label htmlFor="budgetMax" className="block text-sm mb-2">
                          Max Budget
                        </label>
                        <input
                          type="number"
                          id="budgetMax"
                          min={minPrice}
                          max={maxPrice}
                          value={budgetMaxValue ?? ""}
                          onChange={(e) => setBudgetMaxValue(Number(e.target.value))}
                          className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-md mb-4">
                    Project Duration Range
                  </label>
                  <div className="w-full py-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="durationMin" className="block text-sm mb-2">
                          Min Duration
                        </label>
                        <input
                          type="number"
                          id="durationMin"
                          min={minPrice}
                          max={maxPrice}
                          value={durationMinValue ??""}
                          onChange={(e) => setDurationMinValue(Number(e.target.value))}
                          className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                        />
                      </div>
                      <div>
                        <label htmlFor="durationMax" className="block text-sm mb-2">
                          Max Duration
                        </label>
                        <input
                          type="number"
                          id="durationMax"
                          min={minPrice}
                          max={maxPrice}
                          value={durationMaxValue ?? ""}
                          onChange={(e) => setDurationMaxValue(Number(e.target.value))}
                          className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  {/* Header Section */}
                  <div>
                    {inputs.map((inputValue, index) => (
                      <div key={index} className="flex items-center gap-2 my-2">
                        <input
                          type="text"
                          defaultValue={inputValue}
                          {...register(`projectPreference[${index}]`)}
                          onChange={(e) => {
                            const updatedInputs = [...inputs];
                            updatedInputs[index] = e.target.value;
                            setInputs(updatedInputs);
                          }}
                          placeholder="Write your project"
                          className="w-full border rounded-[8px] h-12 px-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteInput(index)}
                          className="text-white bg-red-500 hover:bg-red-700 rounded-[8px] px-4 py-2"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <label htmlFor="projectListing" className="block text-sm">
                      Project Listing (Optional)
                    </label>
                    <button
                      type="button"
                      className="text-black bg-[#FFC06B] hover:bg-[#df9739] hover:shadow-md rounded-[30px] px-[24px] py-[12px]"
                      onClick={handleAddInput}
                    >
                      Add Project
                    </button>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleProjectChange}
                  />

                  {/* Display Selected File */}
                  {selectProject && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Selected File:</strong> {selectProject.name}
                    </div>
                  )}
                </div>

                <textarea
                  // defaultValue={profileData?.data?.z === "null" ?  "": profileData?.data?.projectListing}
                  id="projectListing')}"
                  placeholder="Write your listing project"
                  {...register("projectListing")}
                  className="w-full border p-3 rounded-[10px] focus:border-primary focus:outline-none"
                  rows={5}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={` py-5 px-7 rounded-[50px] my-14 ${loading
                    ? "bg-gray-500 text-white"
                    : "bg-primary text-white "
                    }`}
                  disabled={loading}
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
