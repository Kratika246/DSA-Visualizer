"use client"
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const VideoCard = ({ title, imgSrc, videoSrc, href}: { title: string, imgSrc: string, videoSrc: string, href: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link href={href} className="max-md:w-full">
            <div className="group relative h-75 w-64 overflow-hidden rounded-xl border-[0.2px] border-[#ffffff3b] cursor-pointer max-md:w-full max-md:h-[300px]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* 1. Static Image Layer (Fades out on hover) */}
                <Image
                    src={imgSrc}
                    alt={`${title} Visualizer`}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="absolute opacity-50 z-10 object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                {/* 2. Video Layer (Fades in and plays on hover) */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                />
                
                <div className="absolute bottom-0 w-full p-4 z-20">
                    <p className="font-public-sans text-white text-[24px] mb-2">{title}</p>
                    <div className="h-px w-full bg-[#ffffff3b]"></div>
                </div>
            </div>
        </Link>
    );
};

export default function Page3(){
    
    return (
        <div className="w-full min-h-screen bg-[#161616] p-16 max-md:p-8 max-md:pb-16">
            <h1 className="text-[90px] text-white font-arimo uppercase -tracking-widest max-md:text-[50px] max-md:text-center max-md:leading-tight max-md:mt-8">choose path</h1>
            <div className="flex justify-around mt-20 max-md:flex-col max-md:items-stretch max-md:mt-12 max-md:gap-8">
                <VideoCard 
                    title="Sorting Suite" 
                    imgSrc="/Bars.png" 
                    videoSrc="/Bars.mp4" 
                    href="/sorting/bubble"
                />
                <VideoCard 
                    title="Recursion Lab" 
                    imgSrc="/Stimulation.png" 
                    videoSrc="/stimualtion.mp4"
                    href="/recursion/fibonacci" 
                />
                <VideoCard 
                    title="Data Structures" 
                    imgSrc="/ds.png" 
                    videoSrc="/Ds (1).mp4"
                    href="ds/stack" 
                />
            </div>
        </div>
    );
}