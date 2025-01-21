'use client'

import Image from 'next/image'
import { useState } from 'react'
import visa from "@/assets/payment/visa.jpg"
// import venmo from "@/assets/payment/venmo.png"
// import paypal from "@/assets/payment/paypal.png"
import offer from "@/assets/images/offer.png"
import { FaArrowRightLong } from "react-icons/fa6";
// import Link from 'next/link'
import { PaymentInfoStepProps } from './PaymentInfoStep'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'next/navigation'
// import useDecodedToken from '../common/DecodeToken'
import { useGetProfileQuery } from '@/redux/api/userApi'
import { useOfferpaymentMutation } from '@/redux/api/paymentApi'
// import { useGetProfileByIdQuery } from '@/redux/api/userApi'
// import useDecodedToken from '../common/DecodeToken'


const PaymentForm: React.FC<PaymentInfoStepProps> = ({ getSingleOffer, requirementdata }) => {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [saveCard, setSaveCard] = useState(false);
    const { data: getprofile } = useGetProfileQuery(null)


    const offerId = useParams()
    const customerId = getprofile?.data?.client?.stripe?.customerId
    const amount = getSingleOffer?.data?.totalPrice
    // const token = useDecodedToken()


    console.log("My requirement data is", requirementdata);

    // const paymentData = {
    //     data: {
    //         amount: amount,
    //         customerId: customerId,
    //         paymentMethodId: paymentMethod?.id,
    //         retireProfessionalId: token?.id,
    //         offerId: offerId.id,
    //         caption: requirementdata.captions,
    //         additionalMessage: requirementdata.additionalMessage
    //     }

    // }

    // Assuming `useOfferpaymentMutation` exists
    const [offerPayment] = useOfferpaymentMutation({});




    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe or Elements not loaded');
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            console.error('Card element not found');
            return;
        }

        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error.message);
            return;
        }
        const formData = new FormData();



        const data = {

            customerId: customerId,
            paymentMethodId: stripePaymentMethod?.id,

            offerId: offerId.id,
            caption: requirementdata?.captions,

            additionalMessage: requirementdata?.additionalMessage,


        }
        console.log(amount, "check amount")
        console.log(requirementdata.clientRequirement, "check client requirement")
        formData.append("data", JSON.stringify(data));
        if (requirementdata?.clientRequirement && requirementdata.clientRequirement.length > 0) {
            requirementdata.clientRequirement.forEach((upload: { file: File }, index: number) => {
                if (upload.file instanceof File) {
                    formData.append("clientRequirement", upload.file); // Append each file under the same key
                } else {
                    console.warn(`Invalid file at index ${index}:`, upload.file);
                }
            });
        } else {
            console.warn("No valid files in clientRequirement");
        }


        try {
            const response = await offerPayment((formData));

            if (response.data) {
                console.log('Payment successful:', response.data);
                alert('Payment Successful!');
                // Redirect or update the UI as needed
            } else {
                console.error('Payment failed:', response.error);
                alert('Payment Failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during payment process:', err);
            alert('An error occurred. Please try again.');
        }
    };
    console.log('My offer is', getSingleOffer?.data?.hourlyFee.delivery);




    return (
        <div className="lg:p-6">
            <div className="mx-auto max-w-[1300px] rounded-xl bg-white md:p-6 p-1 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
                    {/* Left Column - Payment Form */}
                    <div className="space-y-6 lg:border md:border border-none rounded-xl">
                        <div className="rounded-[8px] border-none bg-primary">
                            <div className="bg-[#F2FAFF] ml-1 border-none rounded-[8px] p-4">
                                Your card details are secure and payments will be held until the project is marked as completed
                            </div>

                        </div>

                        <form id="paymentForm" onSubmit={handleSubmit} className="space-y-4">
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
                                    <label htmlFor="card" className="flex items-center gap-2 text-sm text-gray-700">
                                        Credit & Debit Cards
                                        <Image src={visa} alt="Visa" width={32} height={20} className="ml-auto" />
                                    </label>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="mt-4 space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm text-gray-700">Card Number</label>
                                            <CardNumberElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': {
                                                                color: '#aab7c4',
                                                            },
                                                        },
                                                        invalid: {
                                                            color: '#9e2146',
                                                        },
                                                    },
                                                }}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">Expiration Date</label>
                                                <CardExpiryElement
                                                    options={{
                                                        style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                    color: '#aab7c4',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#9e2146',
                                                            },
                                                        },
                                                    }}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm text-gray-700">CVV</label>
                                                <CardCvcElement
                                                    options={{
                                                        style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                    color: '#aab7c4',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#9e2146',
                                                            },
                                                        },
                                                    }}
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


                        </form>
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
                                    {getSingleOffer?.data?.projectName}
                                </h3>
                                <p className="text-sm text-gray-600">{getSingleOffer?.data?.description}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Displays project name, payment amount, estimated date, and status.</span>
                                <span className="font-medium text-gray-900">£ {getSingleOffer?.data?.totalReceive}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-[#25314C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Service fee</span>
                                </div>
                                <span className="text-gray-600">(20%)</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-[#25314C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Delivery Time</span>
                                </div>
                                <span className="text-gray-600">  {getSingleOffer?.data?.milestones.reduce((total: number, milestone: any) => total + milestone.delivery, 0) | getSingleOffer?.data?.hourlyFee.delivery | getSingleOffer?.data?.flatFeedelivery}</span>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="space-y-2 border rounded-[10px] p-5 bg-[#FAFAFA]">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order From</span>
                                    <span className="text-gray-900">Jane Cooper</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order No</span>
                                    <span className="text-gray-900">{getSingleOffer?.data?._id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Service fee</span>
                                    <span className="text-gray-900">
                                        £ {getSingleOffer?.data?.serviceFee}
                                    </span>

                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery time</span>
                                    <span className="text-gray-900">
                                        {getSingleOffer?.data?.milestones.reduce((total: number, milestone: any) => total + milestone.delivery, 0) | getSingleOffer?.data?.hourlyFee.delivery | getSingleOffer?.data?.flatFeedelivery}
                                              
                                    </span>

                                </div>
                                <hr className="border-gray-200" />

                                <div className="flex justify-between ">
                                    <span className="font-medium text-gray-900">Total Amount</span>
                                    <span className="font-medium text-gray-900">£ {getSingleOffer?.data?.totalPrice}</span>
                                </div>
                            </div>


                            <button onClick={() => document.getElementById('paymentForm')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))} className="w-full flex justify-center mt-12 bg-primary px-4 py-3 text-lg font-medium text-white rounded-[8px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 items-center gap-2">
                                Confirm & Pay <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm

