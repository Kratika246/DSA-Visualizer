import Image from "next/image";

export default function Page2 () {
    return (
        <div className="min-h-screen w-full bg-[#161616] p-16">
            <h1 className="text-[75px] w-full text-end text-white -tracking-widest font-arimo leading-16">FEATURE <br />HIGHLIGHTS</h1>
            <div className="flex mt-20 justify-between">
                <div className="w-44 -tracking-widest leading-6">
                    <Image
                        src='/ControlPanel.png'
                        alt=""
                        width={230}
                        height={21}
                    />
                    <h2 className="text-[25px] uppercase my-8">Interactive States</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5">Scrub through time with 'Prev' and 'Next' to see exact variable shifts.</p>
                </div>
                 <div className="w-44 -tracking-widest leading-6">
                    <Image
                        src='/Recursion.png'
                        alt=""
                        height={50}
                        width={70}
                    />
                    <h2 className="text-[25px] uppercase my-8">recursion tracking</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5">Auto-generate complex recursion trees and track the call stack depth in real-time.</p>
                </div>
                 <div className="w-44 -tracking-widest leading-6">
                    <Image
                        src='/Globe.png'
                        alt=""
                        width={100}
                        height={21}
                    />
                    <h2 className="text-[25px] uppercase mt-3 mb-8">Variety of concepts</h2>
                    <p className="font-public-sans text-[20px] opacity-50 text-justify tracking-wider leading-5">From simple Bubble Sort to advanced DP Knapsack and N-Queens.</p>
                </div>
            </div>
        </div>
    );
}