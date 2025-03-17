"use client";
import { cn } from "@/lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from '@/assets/notfound.json'

const NotFoundAnimation = () => {
    return (
        <Player
            autoplay
            loop
            src={notfound}
            className={cn("w-[300px] h-screen")}
        ></Player>
    );
};

export default NotFoundAnimation;