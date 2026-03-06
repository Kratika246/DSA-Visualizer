"use client";
import useVisualizerStore from "@/store/useVisualizerStore"
import { RecursionAlgorithms } from "@/types/Step";
import NumberInput from "./NumberInput";
import MultiInput from "./MultiInput";

const InputPanel = () => {
    const { algorithm } = useVisualizerStore();
    
    // Early return if no algorithm
    if (!algorithm) return null;
    
    // Check if algorithm exists in RecursionAlgorithms
    const algorithmConfig = RecursionAlgorithms[algorithm];
    
    if (!algorithmConfig) {
        console.warn(`Algorithm "${algorithm}" not found in RecursionAlgorithms`);
        return null;
    }
    
    // Safe to access inputKind now
    const inputKind = algorithmConfig.inputKind;

    return (
        <>
            {inputKind === "single" && <NumberInput />}
            {inputKind === "multi" && <MultiInput />}
        </>
    );
}

export default InputPanel;