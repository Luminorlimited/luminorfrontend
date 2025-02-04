"use client";

// import Image, { StaticImageData } from "next/image";
// import { Heart } from "lucide-react";
// import { cn } from "@/lib/utils";
import { useState } from "react";
// import p1 from "@/assets/1.png";
// import p2 from "@/assets/2.png";
// import p3 from "@/assets/3.png";
// import p4 from "@/assets/4.png";
// import p5 from "@/assets/5.png";
// import p6 from "@/assets/6.png";
import featuredbg from "@/assets/images/featuredbg.png";
import Button from "../common/Button";
import FeaturedProject from "./FeaturedProject";

// interface Service {
//   id: number;
//   img: string | StaticImageData;
//   category: string;
//   title: string;
//   consultant: string;
//   rating: number;
//   reviews: number;
//   price: number;
//   image: string;
// }

// const services: Service[] = [
//   {
//     id: 1,
//     img: p1,
//     category: "Business consultancy and Management",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 2,
//     img: p2,
//     category: "Engineering services",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 3,
//     img: p3,
//     category: "Technical services",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 4,
//     img: p4,
//     category: "Healthcare and Medical consultancy",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 5,
//     img: p5,
//     category: "Education and Training",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 6,
//     img: p6,
//     category: "Legal and financial services",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 7,
//     img: p1,
//     category: "Business consultancy and Management",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 8,
//     img: p2,
//     category: "Engineering services",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 9,
//     img: p3,
//     category: "Technical services",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 10,
//     img: p4,
//     category: "Healthcare and Medical consultancy",
//     title: "I will setup and manage your startup business...",
//     consultant: "Adam Smith",
//     rating: 5.0,
//     reviews: 123,
//     price: 50,
//     image: "/placeholder.svg?height=400&width=300",
//   },
// ];

// function ServiceCard() {
//   const [isLiked, setIsLiked] = useState(false);

//   return (
//     <div className="group relative bg-white overflow-hidden shadow-lg transition-shadow rounded-xl">
//       <div className="relative">
//         <div
//           className="absolute top-4 right-4 z-10 cursor-pointer"
//           onClick={() => setIsLiked(!isLiked)}
//         >
//           <Heart
//             className={cn(
//               isLiked ? "fill-red-600 stroke-red-600" : "text-white"
//             )}
//           />
//         </div>
//         <div className="max-h-72 overflow-hidden">
//           <Image
//             src={service.img}
//             alt={`${service.consultant} - ${service.category}`}
//             width={420}
//             height={320}
//             className="object-cover hover:scale-105 transition-all duration-500"
//           />
//         </div>
//       </div>
//       <div className="px-6 pt-5 pb-6 space-y-3 hover:bg-[#777980]/10">
//         <div className="flex justify-between items-center">
//           <p className="bg-[#74C5FF33] rounded-full px-3 py-1 w-auto text-xs">
//             {service.category}
//           </p>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               <span className=" ml-1 text-2xl text-textColor-secondary">★</span>
//               <span className="font-semibold">{service.rating}</span>
//             </div>
//             <span className="text-sm font-normal text-textColor-secon">
//               ({service.reviews})
//             </span>
//           </div>
//         </div>
//         <h3 className="text-xl font-bold line-clamp-2">{service.title}</h3>
//         <div className="pt-2 flex items-center justify-between">
//           <span className="text-xl font-normal text-textColor-secondary">
//             {service.consultant}
//           </span>
//           <div className="text-xl font-normal">
//             From <span className="text-2xl font-medium">${service.price}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function FeatureServices() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      className="py-[40px] md:py-[72px] lg:py-[96px]"
      style={{
        backgroundImage: `url(${featuredbg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-xl md:text-xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            Feature Services
          </h1>
        </div>
        <div className="mb-[40px]">
          {/* {services.slice(0, showAll ? services.length : 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))} */}
          <FeaturedProject />
        </div>
        <Button
          className="inline mx-auto rounded-[30px]"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Explore More Services"}
        </Button>
      </div>
    </section>
  );
}
