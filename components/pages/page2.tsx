import Image from "next/image";

export default function Page2 () {
    return (
        <div className="min-h-screen w-full bg-[#161616] p-16 max-md:p-8">
            <h1 className="text-[75px] w-full text-end text-white -tracking-widest font-arimo leading-16 max-md:text-[40px] max-md:text-center max-md:leading-tight max-md:mt-8">FEATURE <br />HIGHLIGHTS</h1>
            <div className="flex mt-20 justify-between max-md:flex-col max-md:mt-12 max-md:items-center max-md:gap-12">
                <div className="w-44 -tracking-widest leading-6 max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
                    <Image
                        src='/ControlPanel.png'
                        alt=""
                        width={230}
                        height={21}
                        className="max-md:w-auto max-md:h-[21px]"
                    />
                    <h2 className="text-[25px] uppercase my-8 text-white max-md:text-[22px] max-md:my-6">Interactive States</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5 max-md:text-[16px] max-md:text-center text-white">Scrub through time with 'Prev' and 'Next' to see exact variable shifts.</p>
                </div>
                <div className="w-44 -tracking-widest leading-6 max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
                    <Image
                        src='/Recursion.png'
                        alt=""
                        height={50}
                        width={70}
                    />
                    <h2 className="text-[25px] uppercase my-8 text-white max-md:text-[22px] max-md:my-6">recursion tracking</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5 max-md:text-[16px] max-md:text-center text-white">Auto-generate complex recursion trees and track the call stack depth in real-time.</p>
                </div>
                <div className="w-44 -tracking-widest leading-6 max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
                    <Image
                        src='/Globe.png'
                        alt=""
                        width={100}
                        height={21}
                    />
                    <h2 className="text-[25px] uppercase mt-3 mb-8 text-white max-md:text-[22px] max-md:my-6">Variety of concepts</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5 max-md:text-[16px] max-md:text-center text-white">From simple Bubble Sort to advanced DP Knapsack and N-Queens.</p>
                </div>
            </div>
        </div>
    );
}