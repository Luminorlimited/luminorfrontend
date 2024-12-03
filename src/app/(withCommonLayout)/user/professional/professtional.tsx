/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from "next/image";
import React, { useState } from "react";
import { FaBuilding, FaCog, FaWrench, FaStethoscope, FaGraduationCap, FaDollarSign } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai'
import CheckBox from "@/components/common/checkbox/CheckBox";


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
            icon: FaBuilding,
            title: "Business consultancy and management",
            description: "Business consultancy and management"
        },
        {
            icon: FaCog,
            title: "Engineering services",
            description: "Engineering services"
        },
        {
            icon: FaWrench,
            title: "Technical services",
            description: "Technical services"
        },
        {
            icon: FaStethoscope,
            title: "Healthcare and medical consultancy",
            description: "Healthcare and medical consultancy"
        },
        {
            icon: FaGraduationCap,
            title: "Education and training",
            description: "Education and training"
        },
        {
            icon: FaDollarSign,
            title: "Legal and financial services",
            description: "Legal and financial services"
        }
    ];

    const [selectedService, setSelectedService] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        if (selectedService === index) {
            setSelectedService(null); // Deselect if the same index is selected
        } else {
            setSelectedService(index); // Select the new index
        }
    };


    const [selectedImage, setSelectedImage] = useState('/images/profilepix.jpg')

    const handleImageChange = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setSelectedImage(imageURL)
        }
    }



    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}

            {/* Header with gradient */}
            <div className="bg-cover bg-center h-[324px]" style={{ backgroundImage: 'url(/images/profilebanner.png)' }} />

            {/* Main Content */}
            <main className="flex-1 -mt-24">
                <div className="max-w-[1100px] mx-auto px-6">
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
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fname" className="block text-sm mb-2">First name</label>
                                <input id="fname" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" defaultValue="John" />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block text-sm mb-2">Last name</label>
                                <input id="lname" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" defaultValue="Watson" />
                            </div>
                        </div>



                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phn" className="block text-sm mb-2">Phone Number *</label>
                                <input id="phn" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="0987654 456" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">Email *</label>
                                <input id="email" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="abc@xyz.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2" htmlFor="loc">Location *</label>
                            <input id="loc" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="USA" />
                        </div>

                        <div>
                            <label className="block text-sm mb-2" htmlFor="problemArea">Bio (Under 30 word)</label>
                            <input id="problemArea" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="I'm a healthcare and medical specialist" />
                        </div>

                        <div>
                            <label htmlFor="mainDesc" className="block text-sm mb-2">Description</label>
                            <textarea
                                id="mainDesc"
                                placeholder="Write your Description"
                                className="w-full border p-3 rounded-[10px]  focus:border-primary focus:outline-none"
                                rows={5}
                            />
                        </div>

                        {/* Industry Preferences */}
                        <div>
                            <h3 className="text-sm mb-4">Skills / Expertise</h3>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                {servicesData.map((service, index) => {
                                    const Icon = service.icon;
                                    const isSelected = selectedService === index
                                    const selectedClass = isSelected ? 'bg-primary   text-white rounded-lg' : 'bg-slate-100';

                                    return (
                                        <div key={index} onClick={() => handleSelect(index)} className={`flex flex-col items-center gap-2 p-4 rounded-lg ${selectedClass} rounded-xl cursor-pointer transition-all`}
                                        >
                                            <Icon className="h-6 w-6" />
                                            <span className="text-xs text-center">{service.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2" htmlFor="prefProject">Preferred Projects*</label>
                            <select id="countries" className="border outline-none focus:outline-none focus:border-primary rounded-[10px] w-full py-3">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm mb-2" htmlFor="prefProject">Preferred Projects*</label>
                            <input id="prefProject" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="Write your Preferred Project" />
                        </div>
                        <div>
                            <label className="block text-sm mb-2" htmlFor="hourlyRate">Hourly Rate (USD) *</label>
                            <input id="hourlyRate" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="$100" />
                        </div>

                        {/* Project Listing */}

                        <div className="flex items-center gap-3">
                            <CheckBox /><p>Project Based Pricing</p>
                        </div>
                        <div className={`  relative p-8 rounded-[15px] border-2 border-dashed hover:border-slate-700 transition-all ${isDragging ? 'border-gray-400 rounded-xl bg-gray-50' : 'border-gray-200'} transition-colors duration-200`}
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

                                <button
                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    <AiOutlineUpload className="w-4 h-4" />
                                    Upload
                                </button>
                            </div>

                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf,.docx,.doc,.rtf,.txt"
                                onChange={(e) => {
                                    // Handle file selection here
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        // Process the file
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
                </div>
            </main>
        </div>
    );
}
