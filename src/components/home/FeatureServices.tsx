"use client";

import Image, { StaticImageData } from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import p1 from "@/assets/1.png";
import p2 from "@/assets/2.png";
import p3 from "@/assets/3.png";
import p4 from "@/assets/4.png";
import p5 from "@/assets/5.png";
import p6 from "@/assets/6.png";

interface Service {
  id: number;
  img: string | StaticImageData;
  category: string;
  title: string;
  consultant: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    img: p1,
    category: "Business consultancy and Management",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    img: p2,
    category: "Engineering services",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    img: p3,
    category: "Technical services",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    img: p4,
    category: "Healthcare and Medical consultancy",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    img: p5,
    category: "Education and Training",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    img: p6,
    category: "Legal and financial services",
    title: "I will setup and manage your startup business...",
    consultant: "Adam Smith",
    rating: 5.0,
    reviews: 123,
    price: 50,
    image: "/placeholder.svg?height=400&width=300",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-white overflow-hidden shadow-lg transition-shadow rounded-xl">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 "
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={cn(
              "text-xl",
              isLiked
                ? "fill-red-500 stroke-red-500"
                : "stroke-textColor-smallText"
            )}
          />
        </Button>
        <Image
          src={service.img}
          alt={`${service.consultant} - ${service.category}`}
          width={420}
          height={320}
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <p className="bg-[#74C5FF33] rounded-full px-3 py-1 w-auto text-xs">
            {service.category}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className=" ml-1 text-2xl">★</span>
              <span className="font-semibold">{service.rating}</span>
            </div>
            <span className="text-muted-foreground">({service.reviews})</span>
          </div>
        </div>
        <h3 className="font-medium line-clamp-2">{service.title}</h3>
        <div className="pt-2 flex items-center justify-between border-t">
          <span className="text-sm text-muted-foreground">
            {service.consultant}
          </span>
          <div className="text-sm">
            From <span className="font-semibold">${service.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureServices() {
  return (
    <section className="py-[40px] md:py-[72px] lg:py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-xl md:text-xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            Feature Services
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
