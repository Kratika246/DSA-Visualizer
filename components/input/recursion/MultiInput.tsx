import ButtonUI from "@/components/ui/ButtonUI";
import useVisualizerStore from "@/store/useVisualizerStore";
import { useState } from "react";
import { RecursionAlgorithms } from "@/types/Step";


const MultiInput = () => {
    const [input, setInput] = useState<number[]>([]);
      const {
        setData, algorithm
      } = useVisualizerStore();
    const config = RecursionAlgorithms[algorithm?algorithm:""];
      const parseInput = (s : String) => {
        let temp= s.split(",");
        setInput((input) => [...input, ...temp.map((t)=>(parseInt(t.trim())))]);
      }
      const visualize = () =>{
        setData({mode: "recursion", data: {args: input}});
        console.log(input);
      }
  return (
      <div className="flex flex-col w-full gap-6">
        {config.inputs.map((input: any, index: number) => (
          <div className="flex w-full gap-6  " key={input.key}>
            <div className="w-full max-w-2xs  flex flex-col gap-2">

            {/* Label */}
            <label className="text-sm text-[rgba(209_213_220_/0.75)]">
              Enter {input.label}
            </label>

            {/* Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={input.key}
                key={input.key}
                className="
                  w-full
                  px-4
                  py-2
                  text-sm
                  bg-transparent
                  border
                  border-gray-700/40
                  rounded-md
                  text-gray-200
                  placeholder-gray-500
                  outline-none
                  transition-all

                  focus:border-[rgba(209_213_220_/0.5)]
                  focus:border-[0.5px]
                  focus:bg-[rgba(209_213_220_/0.05)]
                "
                onChange={(e)=>parseInput(e.target.value)}
              />

              {/* Helper text */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {input.type} only
              </span>
            </div>

            {/* Hint */}
            {input.type=="array"?(<p className="text-xs text-gray-500 ">
              Separate numbers with commas or spaces
            </p>):""}
          </div>
          </div> 

        ))}
        <div className="flex align-middle h-9"><ButtonUI variant="visualize" onClick={visualize}/> </div>
        
      </div>
  )
}

export default MultiInput