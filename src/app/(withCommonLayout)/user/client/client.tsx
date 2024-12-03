/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from "next/image";
import React, { useState } from "react";
import { FaBuilding, FaCog, FaWrench, FaStethoscope, FaGraduationCap, FaDollarSign } from 'react-icons/fa';


export default function Client() {
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


   
    const [selectedService, setSelectedService] = useState<number | null>(null)

    const handleSelect = (index: number) => {
        if (selectedService === index) {
            setSelectedService(null); // Setting to `null`
        } else {
            setSelectedService(index); // Setting to `number`
        }
    };




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
                                src="/images/profilepix.jpg"
                                alt="John Watson"
                                width={160}
                                height={160}
                                className="rounded-full border-4 border-white object-cover w-40 h-40"
                            />
                            <button className="absolute bottom-4 right-4 bg-[#6C38FF] p-2 rounded-full">
                                <FaCog className="h-4 w-4 text-white" />
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
                                <label htmlFor="companyname" className="block text-sm mb-2">Company name *</label>
                                <input id="companyname" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="Write company name" />
                            </div>
                            <div>
                                <label htmlFor="companyweb" className="block text-sm mb-2">Company website *</label>
                                <input id="companyweb" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="www.companyname.com" />
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
                            <label className="block text-sm mb-2" htmlFor="problemArea">Problem areas or Skills needed</label>
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
                            <h3 className="text-sm mb-4">Industry / Service preferences</h3>
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

                        {/* Range Sliders (No change here, just kept as you had it originally) */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm mb-4">Budget Preference</label>
                                {/* <Slider
                                    getAriaLabel={() => 'Budget range'}
                                    value={budgetValue}
                                    onChange={handleBudgetChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={400}
                                    step={1}
                                    valueLabelPlacement="top"
                                    sx={{
                                        color: '#FFC06B', // Color for the progress (active track)
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#fff', // Color for the thumb (handle)
                                            border: '2px solid #FF9B00',
                                            boxShadow: '5px 7px 19px #9f9f9f'
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#E0E0E0', // Color for the rail (inactive portion)
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#FFC06B', // Color for the active track (progress color)
                                        }
                                    }}
                                /> */}
                                {/* Display the dynamically updated budget range */}
                                {/* <div className="text-sm text-gray-600">
                                    ${budgetValue[0]} - ${budgetValue[1]} 
                                </div> */}
                            </div>

                            {/* Project Duration Range Slider */}
                            <div>
                                <label className="block text-sm mb-4">Project Duration Range</label>
                                {/* <Slider
                                    getAriaLabel={() => 'Project duration range'}
                                    value={durationValue}
                                    onChange={handleDurationChange}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={14}
                                    step={1}
                                    valueLabelPlacement="top"
                                    sx={{
                                        color: '#FFC06B', // Color for the progress (active track)
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#fff', // Color for the thumb (handle)
                                            border: '2px solid #FF9B00',
                                            boxShadow: '5px 7px 19px #9f9f9f'
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#E0E0E0', // Color for the rail (inactive portion)
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#FFC06B', // Color for the active track (progress color)
                                        }
                                    }}
                                /> */}


                                {/* Display the dynamically updated duration range */}
                                {/* <div className="text-sm text-gray-600">
                                    {durationValue[0]} day - {durationValue[1]} days 
                                </div> */}
                            </div>
                        </div>

                        {/* Project Listing */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label htmlFor="projectdesc" className="block text-sm">Project Listing (Optional)</label>
                                <button className="text-[#6C38FF] border-[#6C38FF]">
                                    Add Project
                                </button>
                            </div>
                            <textarea
                                id="projectdesc"
                                placeholder="Write your Description"
                                className="w-full border p-3 rounded-[10px] focus:border-primary focus:outline-none"
                                rows={5}
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
