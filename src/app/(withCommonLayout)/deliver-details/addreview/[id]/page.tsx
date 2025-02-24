'use client'

// import OrderCard from '@/components/reviewdetails/OrderCard'
import { Star } from 'lucide-react'
import Button from '@/components/common/Button'
import { Controller, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useClientReviewMutation, useProfessionalAddReviewMutation } from '@/redux/Api/reviewApi';
import { useDecodedToken } from '@/components/common/DecodeToken';
import { useGetSingleUserQuery } from '@/redux/Api/dashboard/userapi';
// import { useRouter } from 'next/navigation';

// import OrderCard from '@/components/reviewdetails/OrderCard';




export default function FeedbackForm() {
    const { handleSubmit, control, reset, setValue, watch } = useForm({
        defaultValues: {
            rating: 0,
            feedback: '',
            // user: '',
        },
    });
    const userId = useParams()
    const id = userId?.id

    const token = useDecodedToken()
    const [clientReview] = useProfessionalAddReviewMutation()
    const [professionalReview] = useClientReviewMutation()
    const {data:getProfileById}= useGetSingleUserQuery(id)

console.log("my profile is ", getProfileById);
    const maxLength = 700;
    const feedbackValue = watch('feedback');
    const ratingValue = watch('rating');
 
    const router = useRouter()
    const handleHome = () => {
        router.push('/')
    }
    const onSubmit = async (data: any) => {
        // console.log("My data is", data);
        if (!data.feedback.trim() || data.rating <= 0) {
            alert("Please provide both feedback and a rating.");
            return;
        }

        try {

            if (token?.role === "client") {
                const res = await professionalReview({ id, data });
                if (res?.data) {
                    toast.success("Thanks for review!!!");
                    reset();
                    router.push('/')

                } else {
                    toast.error("You are unauthorized.");
                }
            } else {
                const res = await clientReview({ id, data });


                if (res?.data) {
                    toast.success("Thanks for review!!!");
                    reset();
                    router.push('/')

                } else {
                    toast.error("You are unauthorized.");
                }
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("An error occurred.");
        }
    };

    return (
        <div className="container flex lg:flex-row flex-col items-start p-6 gap-6">
            <div className="space-y-6 max-w-[800px]">
                {/* Header */}
                <h1 className="text-xl text-gray-600">Public Feedback</h1>

                {/* Title */}
                <h2 className="text-[24px] font-semibold text-gray-900 max-w-3xl">
                    Share your experience with the community, how <b>{getProfileById?.data?.retireProfessional?.name?.firstName || getProfileById?.data?.client?.name?.firstName}</b> was  as a Consultant
                </h2>

                {/* Star Rating */}
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setValue('rating', star)}
                            onMouseEnter={() => setValue('rating', star)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= ratingValue ? 'fill-[#FFA500] stroke-[#FFA500]' : 'stroke-[#FFA500]'}`}
                            />
                        </button>
                    ))}
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Write about the consultant</h3>
                    <div className="relative">
                        <Controller
                            name="feedback"
                            control={control}
                            rules={{ maxLength: maxLength }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="w-full min-h-[200px] p-6 text-gray-700 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Share your experience working with the consultant..."
                                />
                            )}
                        />
                        <div className="absolute bottom-4 right-4 text-gray-500">
                            {feedbackValue.length}/{maxLength}
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <Button className='bg-gray-500 rounded-[25px]' onClick={handleHome}>Skip</Button>
                        <Button className='rounded-[25px]' onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
