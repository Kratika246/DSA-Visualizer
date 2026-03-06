"use client";

import ArrayInput from "./ArrayInput";
import AlgoSelector from "./AlgoSelector";
import ButtonUI from "../../ui/ButtonUI";
import { useState } from "react";

const InputPanel = () => {


  return (
    <div
      className=" w-full flex justify-center px-4 pt-6 "
    >
      <div
        className=" w-full max-w-2xl flex flex-col gap-6 p-4 rounded-xl border border-gray-700/30 bg-transparent"
      >
        <AlgoSelector />
        <div className="flex">
            <ArrayInput/>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
