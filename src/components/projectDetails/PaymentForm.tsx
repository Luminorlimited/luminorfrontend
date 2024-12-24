'use client'

import Image from 'next/image'
import { useState } from 'react'
import visa from "@/assets/payment/visa.jpg"
import venmo from "@/assets/payment/venmo.png"
import paypal from "@/assets/payment/paypal.png"
import offer from "@/assets/images/offer.png"
import { FaArrowRightLong } from "react-icons/fa6";

import Link from 'next/link'

export default function PaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [saveCard, setSaveCard] = useState(false)

    return (
        <div className="min-h-screen lg:p-6">
            <div className="mx-auto max-w-[1300px] rounded-xl bg-white lg:p-6 md:p-6 p-1 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
                    {/* Left Column - Payment Form */}
                    <div className="space-y-6 lg:border md:border border-none lg:p-6 md:p-6 p-0 rounded-xl">
                        <div className="rounded-[8px] border-none bg-primary">
                            <div className="bg-[#F2FAFF] ml-1 border-none rounded-[8px] p-4">
                                Your card details are secure and payments will be held until the project is marked as completed
                            </div>

                        </div>

                        <div className="space-y-4">
                            <h2 className="text-base font-medium text-gray-900">Payment Options</h2>

                            <div className="relative rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        id="card"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="card" className="flex items-center gap-2 text-sm text-gray-700">Credit & Debit Cards

                                        <Image src={visa} alt="Visa" width={32} height={20} className="ml-auto" />
                                    </label>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="mt-4 space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm text-gray-700">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9101 1121"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">Expiration Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">First Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">Last Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="save-card"
                                                checked={saveCard}
                                                onChange={(e) => setSaveCard(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor="save-card" className="text-sm text-gray-600">
                                                Save card details
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-[8px] border-none bg-orange-400">
                                <div className="bg-orange-50 ml-1 border-none rounded-[8px] p-4">

                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                        <h3 className="text-sm font-medium text-gray-900">Payment Policy</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        If the project is not marked as completed one month after the specified end date,
                                        payment will be processed automatically
                                    </p>

                                </div>

                            </div>


                            <div className="space-y-4">
                                {/* PayPal */}
                                <div className="flex items-center gap-3 border py-4 px-3">
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="payment"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="paypal" className="flex items-center gap-2 text-sm text-gray-700">
                                        PayPal
                                        <Image src={paypal} alt="PayPal" width={80} height={20} />
                                    </label>
                                </div>

                                {/* Venmo */}
                                <div className="flex items-center gap-3 border py-4 px-3">
                                    <input
                                        type="radio"
                                        id="venmo"
                                        name="payment"
                                        value="venmo"
                                        checked={paymentMethod === 'venmo'}
                                        onChange={() => setPaymentMethod('venmo')}
                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="venmo" className="flex items-center gap-2 text-sm text-gray-700">
                                        Venmo
                                        <Image src={venmo} alt="Venmo" width={80} height={20} />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="rounded-xl border p-6">
                        <div className="flex gap-4">
                            <div className=" overflow-hidden rounded-lg">
                                <Image
                                    src={offer}
                                    alt="Consultant"
                                    width={122}
                                    height={96}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    I will setup and manage your startup business...
                                </h3>
                                <p className="text-sm text-gray-600">Business startup consultant</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Displays project name, payment amount, estimated date, and status.</span>
                                <span className="font-medium text-gray-900">£ 200</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-[#25314C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Service fee</span>
                                </div>
                                <span className="text-gray-600">(20%) £ 40.00</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-[#25314C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Delivery Time</span>
                                </div>
                                <span className="text-gray-600">14 days</span>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="space-y-2 border rounded-[10px] p-5 bg-[#FAFAFA]">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order From</span>
                                    <span className="text-gray-900">Jane Cooper</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order No</span>
                                    <span className="text-gray-900">#09876545</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Service fee</span>
                                    <span className="text-gray-900">£ 40.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery time</span>
                                    <span className="text-gray-900">14 days</span>
                                </div>
                                <hr className="border-gray-200" />

                                <div className="flex justify-between ">
                                    <span className="font-medium text-gray-900">Total Amount</span>
                                    <span className="font-medium text-gray-900">£ 240.00</span>
                                </div>
                            </div>


                            <Link href={'/payment-details'} className="w-full flex justify-center mt-12 bg-primary px-4 py-3 text-lg font-medium text-white rounded-[8px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 items-center gap-2">
                                Confirm & Pay <FaArrowRightLong/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

