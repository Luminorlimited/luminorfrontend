'use client'

// import OrderCard from '@/components/reviewdetails/OrderCard'
import { Star } from 'lucide-react'
import Button from '@/components/common/Button'

import { useState } from 'react'
// import OrderCard from '@/components/reviewdetails/OrderCard';


export default function FeedbackForm() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const maxLength = 700;

    const handleSubmit = () => {
        console.log('Rating:', rating);
        console.log('Feedback:', feedback);
        if (feedback.trim() && rating > 0) {
            alert("Feedback successfully submitted!");
            // Reset form after submission
            setRating(0);
            setFeedback('');
        } else {
            alert("Please provide both feedback and a rating.");
        }
    };

    return (
        <div className="container flex lg:flex-row flex-col items-start p-6 gap-6">
            <div className="space-y-6 max-w-[800px]">
                {/* Header */}
                <h1 className="text-xl text-gray-600">Public Feedback</h1>

                {/* Title */}
                <h2 className="text-[24px] font-semibold text-gray-900 max-w-3xl">
                    Share your experience with the community, how was John Watson as a Consultant
                </h2>

                {/* Star Rating */}
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                    ? 'fill-[#FFA500] stroke-[#FFA500]'
                                    : 'stroke-[#FFA500]'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Write about the consultant</h3>
                    <div className="relative">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value.slice(0, maxLength))}
                            className="w-full min-h-[200px] p-6 text-gray-700 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Share your experience working with the consultant..."
                        />
                        <div className="absolute bottom-4 right-4 text-gray-500">
                            {feedback.length}/{maxLength}
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <Button className='bg-gray-500 rounded-[25px]' onClick={() => setFeedback('')}>Skip</Button>
                        <Button className='rounded-[25px]' onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>

            {/* <OrderCard/> */}
        </div>
    );
}