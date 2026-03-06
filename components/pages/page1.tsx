import Image from "next/image";

export default function Page1() {
    return (
        <div className="min-h-screen w-full bg-[#1b1b1b] p-16 pt-20 pr-24 relative max-md:p-6 max-md:pt-10 max-md:pr-6">
            <div className="w-full flex items-center gap-2 max-md:relative max-md:z-20">
                <Image 
                    src="/Visualize Every Algorithm (1).png" 
                    alt=""
                    width={35}    
                    height={26}
                />
                <p className="font-arimo text-[22px] font-bold text-white max-md:text-[18px]">DSA Visualizer</p>
            </div>
            <div className="absolute -right-20 top-10 z-9 opacity-80 rotate-20 max-md:top-32 max-md:-right-8 max-md:z-0 max-md:opacity-30 max-md:rotate-12 max-md:w-[350px]">
                <video
                    width="590" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="rounded-lg"
                >
                    <source src="/stimualtion.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="absolute w-full pr-34 z-10 max-md:pr-6 max-md:top-[12%] max-md:left-6 max-md:mt-8">
                <div className="text-[130px] text-[#fefefe] -tracking-widest max-md:text-[60px] max-md:leading-none">Code.</div>
                <div className="text-[130px] text-[#fefefe] -tracking-widest text-center leading-12 max-md:text-[60px] max-md:text-left max-md:leading-none max-md:mt-4">Visualize.</div>
                <div className="text-[130px] text-[#fefefe] -tracking-widest font-bold text-end max-md:text-[60px] max-md:text-left max-md:mt-4">Master.</div>
            </div>
            <div className="absolute left-16 bottom-[22.5%] w-116 text-[19px] leading-4.5 font-public-sans max-md:left-6 max-md:bottom-[5%] max-md:text-[16px] max-md:w-[calc(100%-3rem)] max-md:leading-6 max-md:z-20 max-md:text-white">Stop memorizing. Start seeing. An interactive playground to deconstruct complex algorithms into pixel-perfect animations.</div>
        </div>
    );
}