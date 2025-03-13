"use client";
import { cn } from "@/lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieJson from "@/assets/loader.json";

const LoaderAnimation = () => {
    return (
        <Player
            autoplay
            loop
            src={lottieJson}
            className={cn("w-[300px] h-screen")}
        ></Player>
    );
};

export default LoaderAnimation;
