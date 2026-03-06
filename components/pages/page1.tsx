import Image from "next/image";

export default function Page1() {
    return (
        <div className="min-h-screen w-full bg-[#1b1b1b] p-16 pt-20 pr-24 relative ">
            <div className="w-full flex items-center gap-2">
                <Image 
                    src="/Visualize Every Algorithm (1).png" 
                    alt=""
                    width={35}    
                    height={26}
                />
                <p className="font-arimo text-[22px] font-bold text-white">DSA Visualizer</p>
            </div>
             <div className="absolute -right-20 top-10 z-9 opacity-80 rotate-20">
                <video
                    width="590" 
                    autoPlay 
                    loop 
                    muted 
                    className="rounded-lg"
                >
                    <source src="/stimualtion.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="absolute w-full  pr-34 z-10 ">
                <div className="text-[130px] text-[#fefefe] -tracking-widest ">Code.</div>
                <div className="text-[130px] text-[#fefefe] -tracking-widest text-center leading-12">Visualize.</div>
                <div className="text-[130px] text-[#fefefe] -tracking-widest font-bold text-end">Master.</div>
            </div>
            <div className="absolute left-16 bottom-[22.5%] w-116 text-[19px] leading-4.5 font-public-sans">Stop memorizing. Start seeing. An interactive playground to deconstruct complex algorithms into pixel-perfect animations.</div>
            
        </div>
    );
}                                                                                                   