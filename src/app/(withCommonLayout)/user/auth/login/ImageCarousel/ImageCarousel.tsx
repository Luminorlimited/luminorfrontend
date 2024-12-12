"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import loginimg from "@/assets/images/loginimg1.png";

interface Slide {
    image: string | StaticImageData;
    title: string;
}

const slides: Slide[] = [
    {
        image: loginimg,
        title: "Best Site for Consultants to Share Expertise and Connect Globally",
    },
    {
        image: loginimg,
        title: "Connect with Expert Consultants Worldwide",
    },
    {
        image: loginimg,
        title: "Share Your Professional Expertise",
    },
];

export default function ImageCarousel() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slideCount = slides.length;

    // Auto-slide logic
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideCount);
        }, 5000); // Slide every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [slideCount]);

    // const handlePrevious = () => {
    //     setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    // };

    // const handleNext = () => {
    //     setCurrentSlide((prev) => (prev + 1) % slideCount);
    // };

    return (
        <div className="relative w-full h-[750px] overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 rounded-r-[15px] overflow-hidden transition-transform duration-500 ${index === currentSlide ? "translate-x-0" : "translate-x-full"
                        }`}
                    style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            className="object-cover w-full h-full"
                            priority={index === currentSlide} // Optimize the current image
                        />
                        <div className="absolute inset-0 bg-[#31313133] bg-opacity-5"></div> {/* Black overlay */}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute bottom-16 left-12  py-4 px-6 rounded-lg ">
                        <h2 className="text-xl font-bold text-white leading-tight">{slide.title}</h2>
                    </div>
                </div>
            ))}

            {/* Navigation buttons */}
            {/* <button
                aria-label="Previous slide"
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                aria-label="Next slide"
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90"
            >
                <ChevronRight className="w-6 h-6" />
            </button> */}

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer border ${index === currentSlide ? "bg-white border-white " : "bg-transparent  border-white"}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}