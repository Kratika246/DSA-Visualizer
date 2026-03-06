import ButtonUI from "@/components/ui/ButtonUI";
import useVisualizerStore from "@/store/useVisualizerStore";
import { useState } from "react";
const NumberInput = () => {
  const {setData} = useVisualizerStore();
  const [input, setInput] = useState<number[]>([]);

  const visualize = () => {
    setData({mode: "recursion", data:{args: input}});
  };
  return (
    <div className="flex justify-center gap-6 -mt-7 w-full">
      <div className="   flex flex-col gap-2">

      {/* Label */}
      <label className="text-sm text-[rgba(209_213_220_/0.75)]">
        Enter Argument
      </label>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="e.g. 5"
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
          onChange={(e)=>setInput([parseInt(e.target.value.trim())])}
        />

        {/* Helper text */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          Integer only
        </span>
      </div>
      
    </div>
    <div className="flex align-middle px-4 h-9 mt-7 mb-3"><ButtonUI variant="visualize" onClick={visualize}/> </div>
    </div>
        
  );
};

export default NumberInput;
