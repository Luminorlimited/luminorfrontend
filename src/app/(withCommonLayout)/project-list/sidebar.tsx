'use client'

import { usePathname } from "next/navigation"
import * as React from "react"
import { useCallback, useState } from "react"
import { HiChevronUp, HiChevronDown } from "react-icons/hi"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function Sidebar() {
    const [openSections, setOpenSections] = React.useState({
        industry: true,
        timeline: true,
        skillType: true
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const minGap = 0;
    const minPrice = 1;
    const maxPrice = 400;

    const [budgetMinValue, setBudgetMinValue] = useState(1);
    const [budgetMaxValue, setBudgetMaxValue] = useState(400);
    const [durationMinValue, setDurationMinValue] = useState(1);
    const [durationMaxValue, setDurationMaxValue] = useState(400);

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

    const pathName = usePathname()

    return (
        <div className="my-4 w-full max-w-md space-y-4 p-4 font-sans border rounded-[15px] lg:overflow-auto overflow-y-scroll">
            <div className="rounded-2xl border bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('industry')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <h2 className="text-lg font-semibold">Industry</h2>
                    {openSections.industry ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
                </button>
                {openSections.industry && (
                    <div className="space-y-3 p-4 pt-0">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                            <span className="font-medium">Tech</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Marketing</span>
                        </label>
                        {Array(3).fill(null).map((_, i) => (
                            <label key={i} className="flex items-center space-x-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                <span className="text-gray-600">Finance</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('timeline')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <h2 className="text-lg font-semibold">Timeline</h2>
                    {openSections.timeline ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
                </button>
                {openSections.timeline && (
                    <div className="space-y-3 p-4 pt-0">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                            <span className="font-medium">Short Term</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Long Term</span>
                        </label>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('skillType')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <h2 className="text-lg font-semibold">Skill Type</h2>
                    {openSections.skillType ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
                </button>
                {openSections.skillType && (
                    <div className="space-y-3 p-4 pt-0">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                            <span className="font-medium">Business consultancy and management</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Engineering services</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Technical services</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Healthcare and medical consultancy</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Education and training</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-gray-600">Legal and financial services</span>
                        </label>
                    </div>
                )}
            </div>

            {pathName === '/project-list' ? (
                <div className="grid grid-rows-2 gap-6 bg-white p-4 shadow-md rounded-[15px]">
                    <div>
                        <label className="block text-lg mb-4 font-medium">Project Duration Range</label>
                        <div className="w-full py-8">
                            <div className="relative h-2 mb-8">
                                <div className="absolute w-full h-full bg-gray-200 rounded-full" />
                                <div
                                    className="absolute h-full bg-primary rounded-full"
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
                                ${durationMinValue} - ${durationMaxValue}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg mb-4 font-medium">Budget Range</label>
                        <div className="w-full py-8">
                            <div className="relative h-2 mb-8">
                                <div className="absolute w-full h-full bg-gray-200 rounded-full" />
                                <div
                                    className="absolute h-full bg-primary rounded-full"
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
                                ${budgetMinValue} - ${budgetMaxValue}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-rows-1 gap-6 bg-white p-4 shadow-md rounded-[15px]">
                    <div>
                        <label className="block text-lg mb-4 font-medium">Location</label>
                        <div className="w-full py-8">
                            <div className="relative h-2 mb-8">
                                <div className="absolute w-full h-full bg-gray-200 rounded-full" />
                                <div
                                    className="absolute h-full bg-primary rounded-full"
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
                                ${budgetMinValue} - ${budgetMaxValue}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden text-white rounded-[10px] mt-3 bg-primary ">
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] ">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

