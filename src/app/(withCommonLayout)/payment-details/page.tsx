'use client'

import {  FormEvent } from 'react'
import Button from '@/components/common/Button'
import Link from 'next/link'
import CheckBox from '@/components/common/checkbox/CheckBox'
import { useRouter } from 'next/navigation'

interface ProjectDetails {
    name: string
    orderNumber: string
    serviceFee: number
    totalAmount: number
}

export default function Page() {

    const projectDetails: ProjectDetails = {
        name: 'Business Startup Consultant',
        orderNumber: '#09876545',
        serviceFee: 40.00,
        totalAmount: 240.00
    }

    const router = useRouter()
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     // Handle form submission
    //     console.log('Form submitted')
    //     router.push('/deliver-details')
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form submitted'); // Debugging
        router.push('/deliver-details'); // Navigate to the payment page
    };

    // const handleClick = () => {
    // }

    return (
        <div className="min-h-screen container  p-4 md:p-6">
            <div className="max-w-[869px] rounded-lg bg-white lg:p-6 md:p-6 p-0  shadow-sm">
                <div className="space-y-6">
                    {/* Header */}
                    <div className='flex flex-col gap-[17px]'>
                        <div className='text-[16px] flex gap-2'>
                            <Link href={'/'} className='text-gray-700'>Home - </Link>
                            <Link href={'/payment-details'} className='font-semibold'>Payement-Details</Link>
                        </div>
                        <h1 className="text-[32px] font-semibold">Payment Details for Retired Professionals</h1>
                        <p className="mt-1 text-lg text-[#4A4C56]">
                            Please fill in your bank details below to receive payments once <br/> your project is completed.
                        </p>
                    </div>

                    {/* Project Overview */}
                    <div className="space-y-4">
                        <h2 className="text-[32px] font-semibold ">Project Overview</h2>
                        <div className="space-y-2 text-[24px]">
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-black font-semibold">Project Name:</span>
                                <span className="font-medium text-[#4A4C56]">{projectDetails.name}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-black font-semibold">Order Number:</span>
                                <span className="font-medium text-[#4A4C56]">{projectDetails.orderNumber}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-black font-semibold">Service Fee:</span>
                                <span className="font-medium text-[#4A4C56]">£{projectDetails.serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-black font-semibold">Total Amount:</span>
                                <span className="font-medium text-[#4A4C56]">£{projectDetails.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bank Transfer Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Transfer Information</h2>
                            <div className="space-y-4 lg:border md:border border-none lg:p-8 md:p-5 p-1 rounded-[15px]">
                                <div>
                                    <label htmlFor="accountHolder" className="block text-sm font-medium text-black mb-1">
                                        Account Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        id="accountHolder"
                                        name="accountHolder"
                                        required
                                        placeholder='Holder Name'
                                        className="w-full  border border-gray-300 text-sm rounded-[10px] placeholder:text-gray-400 focus:border-primary px-4 py-5 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bankName" className="block text-sm font-medium text-black mb-1">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        id="bankName"
                                        name="bankName"
                                        required
                                        placeholder='Bank Name'
                                        className="w-full  border border-gray-300 text-sm rounded-[10px] placeholder:text-gray-400 focus:border-primary px-4 py-5 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="accountNumber" className="block text-sm font-medium text-black mb-1">
                                        Bank Account Number
                                    </label>
                                    <input
                                        type="text"
                                        id="accountNumber"
                                        name="accountNumber"
                                        required
                                        placeholder='1234  5678  9101  1121'
                                        className="w-full  border border-gray-300 text-sm rounded-[10px] placeholder:text-gray-400 focus:border-primary px-4 py-5 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bankAddress" className="block text-sm font-medium text-black mb-1">
                                        Bank Address
                                    </label>
                                    <input
                                        type="text"
                                        id="bankAddress"
                                        name="bankAddress"
                                        required
                                        placeholder='MM/YY'
                                        className="w-full  border border-gray-300 text-sm rounded-[10px] placeholder:text-gray-400 focus:border-primary px-4 py-5 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="reference" className="block text-sm font-medium text-black mb-1">
                                        Payment Reference (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="reference"
                                        name="reference"
                                        placeholder='123'

                                        className="w-full  border border-gray-300 text-sm rounded-[10px] placeholder:text-gray-400 focus:border-primary px-4 py-5 focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <CheckBox />
                                <label htmlFor="confirm" className="text-sm text-gray-600">
                                    I confirm the details are accurate and authorize payment to this account.
                                </label>
                            </div>

                            {/* <Link href={'/payment-details'}> */}
                            <Button type='submit'  className='w-full'>Submit & Save Payment Detais</Button>
                            {/* </Link>  */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

