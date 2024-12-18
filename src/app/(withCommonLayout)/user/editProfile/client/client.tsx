'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {  FaCog } from 'react-icons/fa';
import BusinesSvg from "@/components/svg/BusinesSvg";
import SettingSvg from "@/components/svg/Settings";
import TechnicalSvg from "@/components/svg/TechnicalSvg";
import HealthSvg from "@/components/svg/HealthSvg";
import Education from "@/components/svg/Education";
import Financial from "@/components/svg/Financial";


export default function Client() {
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





   



    const minGap = 0;
    const minPrice = 1;
    const maxPrice = 400;

    // State for Budget Preference Slider
    const [budgetMinValue, setBudgetMinValue] = useState(1);
    const [budgetMaxValue, setBudgetMaxValue] = useState(400);

    // State for Project Duration Slider
    const [durationMinValue, setDurationMinValue] = useState(1);
    const [durationMaxValue, setDurationMaxValue] = useState(400);

    // Handlers for Budget Preference Slider
    const handleBudgetMinChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), budgetMaxValue - minGap);
            setBudgetMinValue(value);
        },
        [budgetMaxValue]
    );

    const handleBudgetMaxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(event.target.value), budgetMinValue + minGap);
            setBudgetMaxValue(value);
        },
        [budgetMinValue]
    );

    const getBudgetProgressStyle = useCallback(() => {
        const left = ((budgetMinValue - minPrice) / (maxPrice - minPrice)) * 100;
        const right = 100 - ((budgetMaxValue - minPrice) / (maxPrice - minPrice)) * 100;
        return {
            left: `${left}%`,
            right: `${right}%`,
        };
    }, [budgetMinValue, budgetMaxValue]);

    // Handlers for Project Duration Slider
    const handleDurationMinChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), durationMaxValue - minGap);
            setDurationMinValue(value);
        },
        [durationMaxValue]
    );

    const handleDurationMaxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(event.target.value), durationMinValue + minGap);
            setDurationMaxValue(value);
        },
        [durationMinValue]
    );

    const getDurationProgressStyle = useCallback(() => {
        const left = ((durationMinValue - minPrice) / (maxPrice - minPrice)) * 100;
        const right = 100 - ((durationMaxValue - minPrice) / (maxPrice - minPrice)) * 100;
        return {
            left: `${left}%`,
            right: `${right}%`,
        };
    }, [durationMinValue, durationMaxValue]);



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
                        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-y-3">

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fname" className="block text-sm mb-2">First name</label>
                                    <input id="fname" {...register("fname", { required: "First name is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="first name" />
                                </div>
                                <div>
                                    <label htmlFor="lname" className="block text-sm mb-2">Last name</label>
                                    <input id="lname"  {...register("lname", { required: "Last name is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="last name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="companyname" className="block text-sm mb-2">Company name *</label>
                                    <input {...register("companyname", { required: "Company name is required" })} id="companyname" className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="Write company name" />
                                </div>
                                <div>
                                    <label htmlFor="companyweb" className="block text-sm mb-2">Company website *</label>
                                    <input id="companyweb" {...register("companyweb", { required: "Company website is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="www.companyname.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phn" className="block text-sm mb-2">Phone Number *</label>
                                    <input id="phn" {...register("phn", { required: "Phone number is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="0987654 456" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2">Email *</label>
                                    <input id="email" {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Enter a valid email",
                                        },
                                    })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="abc@xyz.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2" htmlFor="loc">Location *</label>
                                <input id="loc"  {...register("loc", { required: "Location is required" })} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="USA" />
                            </div>

                            <div>
                                <label className="block text-sm mb-2" htmlFor="problemArea">Problem areas or Skills needed</label>
                                <input id="problemArea" {...register("problemArea")} className="w-full border outline-none focus:outline-none focus:border-primary rounded-[10px] p-3" placeholder="I'm a healthcare and medical specialist" />
                            </div>

                            <div>
                                <label htmlFor="mainDesc" className="block text-sm mb-2">Description</label>
                                <textarea
                                    id="mainDesc"
                                    {...register("mainDesc")}
                                    placeholder="Write your Description"
                                    className="w-full border p-3 rounded-[10px]  focus:border-primary focus:outline-none"
                                    rows={5}
                                />
                            </div>

                            {/* Industry Preferences */}
                            <div>
                                <h3 className="text-sm mb-4">Industry / Service preferences</h3>
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

                            {/* Range Sliders (No change here, just kept as you had it originally) */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm mb-4">Budget Preference</label>
                                    <div className="w-full py-3">
                                        <div className="relative h-2 mb-8">
                                            <div className="absolute w-full h-full bg-gray-200 rounded-full" />
                                            <div
                                                className="absolute h-full bg-amber-400 rounded-full"
                                                style={getBudgetProgressStyle()}
                                            />
                                            <input
                                                type="range"
                                                min={minPrice}
                                                max={maxPrice}
                                                value={budgetMinValue}
                                                onChange={handleBudgetMinChange}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                                            />
                                            <input
                                                type="range"
                                                min={minPrice}
                                                max={maxPrice}
                                                value={budgetMaxValue}
                                                onChange={handleBudgetMaxChange}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                                            />
                                        </div>
                                        <div className="w-full p-4 text-center border rounded-lg border-gray-200">
                                            <span {...register('minBudget')}>${budgetMinValue}</span>
                                            <span> - </span>

                                            <span {...register('maxBudget')}>${budgetMaxValue}</span>

                                        </div>
                                    </div>
                                </div>

                                {/* Project Duration Slider */}
                                <div>
                                    <label className="block text-sm mb-4">Project Duration Range</label>
                                    <div className="w-full py-3">
                                        <div className="relative h-2 mb-8">
                                            <div className="absolute w-full h-full bg-gray-200 rounded-full" />
                                            <div
                                                className="absolute h-full bg-amber-400 rounded-full"
                                                style={getDurationProgressStyle()}
                                            />
                                            <input
                                                type="range"
                                                min={minPrice}
                                                max={maxPrice}
                                                value={durationMinValue}
                                                onChange={handleDurationMinChange}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                                            />
                                            <input
                                                type="range"
                                                min={minPrice}
                                                max={maxPrice}
                                                value={durationMaxValue}
                                                onChange={handleDurationMaxChange}
                                                className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                                            />
                                        </div>
                                        <div className="w-full p-4 text-center border rounded-lg border-gray-200">

                                            <span {...register('minDuration')}>${durationMinValue}</span>
                                            <span> - </span>

                                            <span {...register('maxDuration')}>${durationMaxValue}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="projectdesc" className="block text-sm">Project Listing (Optional)</label>
                                    <button className="text-[#6C38FF] border-[#6C38FF]">
                                        Add Project
                                    </button>
                                </div>
                                <textarea
                                    id="projectdesc"
                                    {...register('projectDesc')}
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
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
}
