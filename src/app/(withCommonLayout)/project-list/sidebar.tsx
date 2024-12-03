'use client'

import * as React from "react"
import { HiChevronUp, HiChevronDown } from "react-icons/hi"

export default function Sidebar() {
    const [durationValue, setDurationValue] = React.useState(14)
    const [budgetValue, setBudgetValue] = React.useState(500)
    const [openSections, setOpenSections] = React.useState({
        industry: true,
        timeline: true,
        skillType: true
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    return (
        <div className="container mx-auto my-4">
            <div className="w-full max-w-md space-y-4 p-4  font-sans border rounded-[15px]">
                {/* Industry Section */}
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

                {/* Timeline Section */}
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

                {/* Skill Type Section */}
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
                                <span className="text-gray-600">legal and financial services</span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Project Duration Range */}
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold">Project Duration Range</h2>
                    <input
                        type="range"
                        min="1"
                        max="14"
                        value={durationValue}
                        onChange={(e) => setDurationValue(Number(e.target.value))}
                        className="w-full mb-4"
                    />
                    <div className="rounded-lg border bg-gray-50 p-3 text-center">
                        {durationValue === 1 ? '1 day' : `1 day - ${durationValue} days`}
                    </div>
                </div>

                {/* Budget Range */}
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold">Budget Range</h2>
                    <input
                        type="range"
                        min="100"
                        max="500"
                        step="100"
                        value={budgetValue}
                        onChange={(e) => setBudgetValue(Number(e.target.value))}
                        className="w-full mb-4"
                    />
                    <div className="rounded-lg border bg-gray-50 p-3 text-center">
                        ${budgetValue === 100 ? '100' : `100 - $${budgetValue}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

