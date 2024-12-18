/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from "next/image";
import React, { useState } from "react";
import {  FaCog } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai'
import CheckBox from "@/components/common/checkbox/CheckBox";
import { useForm } from "react-hook-form";
import BusinesSvg from "@/components/svg/BusinesSvg";
import SettingSvg from "@/components/svg/Settings";
import TechnicalSvg from "@/components/svg/TechnicalSvg";
import HealthSvg from "@/components/svg/HealthSvg";
import Education from "@/components/svg/Education";
import Financial from "@/components/svg/Financial";


export default function Professional() {

    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        // Handle file drop here
    }
    const servicesData = [
        {
            icon: <BusinesSvg />,
            title: "Business consultancy and management",
            description: "Business consultancy and management"
        },
        {
            icon: <SettingSvg />,
            title: "Engineering services",
            description: "Engineering services"
        },
        {
            icon: <TechnicalSvg />,
            title: "Technical services",
            description: "Technical services"
        },
        {
            icon: <HealthSvg />,
            title: "Healthcare and medical consultancy",
            description: "Healthcare and medical consultancy"
        },
        {
            icon: <Education />,
            title: "Education and training",
            description: "Education and training"
        },
        {
            icon: <Financial />,
            title: "Legal and financial services",
            description: "Legal and financial services"
        }
    ];


  

    const [selectedImage, setSelectedImage] = useState('/images/profilepix.jpg')

    const handleImageChange = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setSelectedImage(imageURL)
        }
    }




    const { register, handleSubmit, setValue,  watch, reset } = useForm();

    const handleSubmitForm = async (data: any) => {
        console.log(data)
        reset()

    }

    const watchSelectedService = watch("selectedService");


    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}

            {/* Header with gradient */}
            <div className="bg-cover bg-center h-[324px]" style={{ backgroundImage: 'url(/images/profilebanner.png)' }} />

            {/* Main Content */}
            <main className="flex-1 -mt-24">
                <div className="max-w-[1100px] mx-auto px-6">
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        {/* Profile Section */}
                        <div className="relative text-center mb-12">
                            <div className="relative inline-block">
                                <Image
                                    src={selectedImage}
                                    alt="profile-img"
                                    width={160}
                                    height={160}
                                    className="rounded-full border-4 border-white object-cover w-40 h-40"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="fileInput"
                                    className="hidden-input hidden"
                                    onChange={() => handleImageChange}
                                />
                                {/* Cog button to trigger file input */}
                                <button
                                    className="cog-button absolute bottom-5 right-0"
                                    onClick={() => {
                                        const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
                                        if (fileInput) {
                                            fileInput.click();
                                        }
                                    }}
                                >
                                    <div className="p-2 bg-white hover:bg-slate-100 hover:scale-105  transition-all rounded-full">
                                        <FaCog className="cog-icon text-3xl text-primary " />
                                    </div>
                                </button>


                            </div>

                            <h1 className="text-2xl font-semibold mt-4">John Watson</h1>
                            <p className="text-gray-600">Im a healthcare and medical specialist</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">


                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fname" className="block text-sm mb-2">First name</label>
                                    <input id="fname" {...register("fname", { required: "First name is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" />
                                </div>
                                <div>
                                    <label htmlFor="lname" className="block text-sm mb-2">Last name</label>
                                    <input id="lname" {...register("lname", { required: "Last name is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" />
                                </div>
                            </div>



                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phn" className="block text-sm mb-2">Phone Number *</label>
                                    <input {...register("phone", { required: "phone required" })} id="phn" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="0987654 456" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2">Email *</label>
                                    <input id="email" {...register("email")} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="abc@xyz.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2" htmlFor="loc">Location *</label>
                                <input id="loc" {...register("loc")} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="USA" />
                            </div>

                            <div>
                                <label className="block text-sm mb-2" htmlFor="problemArea">Bio (Under 30 word)</label>
                                <input id="problemArea" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" {...register("bio")} placeholder="I'm a healthcare and medical specialist" />
                            </div>

                            <div>
                                <label htmlFor="mainDesc" className="block text-sm mb-2">Description</label>
                                <textarea
                                    id="mainDesc"
                                    {...register("maindesc")}
                                    placeholder="Write your Description"
                                    className="w-full border p-3 rounded-[10px]  focus:border-primary focus:outline-none"
                                    rows={5}
                                />
                            </div>

                            {/* Industry Preferences */}
                            <div>
                                <h3 className="text-sm mb-4">Skills / Expertise</h3>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {servicesData.map((service, index) => {
                                        const isSelected = watchSelectedService === index;
                                        const selectedClass = isSelected
                                            ? "bg-primary text-white"
                                            : "bg-slate-100";

                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setValue("selectedService", index)}
                                                className={`flex flex-col shadow-md items-center gap-2 px-[13px] py-[13px] rounded-[12px] ${selectedClass} cursor-pointer transition-all `}
                                            >
                                                {/* <Icon /> */}
                                                <div className="w-12 h-12">{service.icon}</div>
                                                <span className="text-[14px] pt-2 font-[400] text-left">{service.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                {/* <label className="block text-sm mb-2" htmlFor="prefProject">Abailabil*</label> */}
                                <select {...register('abailability')} id="countries" className="border outline-none focus:outline-none focus:border-primary rounded-[10px] w-full py-3 px-2">
                                    <option selected>Availability</option>
                                    <option value="US">United States</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2" htmlFor="prefProject">Preferred Projects*</label>
                                <input {...register('project')} id="prefProject" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="Write your Preferred Project" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2" htmlFor="hourlyRate">Hourly Rate (USD) *</label>
                                <input {...register('hourlyRate')} id="hourlyRate" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="$100" />
                            </div>

                            {/* Project Listing */}

                            <div className="flex items-center gap-3">
                                <CheckBox /><p>Project Based Pricing</p>
                            </div>
                            <div
                                className={`relative p-8 rounded-[15px] border-2 border-dashed hover:border-slate-700 transition-all ${isDragging ? "border-gray-400 rounded-xl bg-gray-50" : "border-gray-200"
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
                                        <p className="mt-1 text-sm text-gray-500">Upload or drag and drop</p>
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
                                    accept=".pdf,.docx,.doc,.rtf,.txt"
                                    {...register("file", { required: true })} // Add validation rules
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // Extract necessary file properties
                                            const fileName = file.name;
                                            const filePath = file.webkitRelativePath || file.name; // Fallback to name if relative path is unavailable
                                            const fileType = file.type;

                                            // Check if required fields are present
                                            if (!fileName || !filePath || !fileType) {
                                                console.error("Missing required file properties");
                                            } else {
                                                console.log("File Selected:", { fileName, filePath, fileType });

                                                // Process the file (e.g., update state or form data)
                                                // Example: Save file details in state
                                                setValue("fileDetails", { fileName, filePath, fileType });
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex justify-center">
                                <button className="bg-primary py-5 px-7 rounded-[50px] my-14 text-white">
                                    Save Information
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
