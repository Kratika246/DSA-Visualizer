"use client";

import useVisualizerStore from "@/store/useVisualizerStore";
import ButtonUI from "../ui/ButtonUI";
import AutoToggle from "../ui/AutoToggle";

const ControlPanel = () => {
  const {
    steps,
    play,
    pause,
    reset,
    next,
    prev,
    speed,
    setSpeed,
    isPlaying,
    currStep,
  } = useVisualizerStore();

  const isDisabled = !steps.length;

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-6">
      
      {/* Playback Controls */}
      <div className="flex items-center gap-3">
        <ButtonUI variant="prev" onClick={prev}/>

        {!isPlaying ? (
          <ButtonUI variant="play" onClick={play}/>
        ) : (
          <ButtonUI variant="pause" onClick={pause}/>
        )}

        <ButtonUI variant="next" onClick={next}/>

        <ButtonUI variant="reset" onClick={reset}/>
      </div>

      {/* Speed Control */}
<div className="flex items-center gap-3 w-64 select-none">
  
  <span className="text-xs text-gray-500 tracking-wide">
    Speed
  </span>

  {/* Minus */}
  <button
    onClick={() => setSpeed( Math.max(100, speed - 100))}
    className="text-gray-500 text-sm px-1 hover:text-gray-300 transition "
    aria-label="Decrease speed"
  >
    +
  </button>

  {/* Slider */}
  <input
    type="range"
    min={100}
    max={1000}
    step={100}
    value={speed}
    onChange={(e) => setSpeed(Number(e.target.value))}
    className="
      w-full h-0.5 appearance-none bg-gray-700/40 rounded-full cursor-pointer

      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:h-3
      [&::-webkit-slider-thumb]:w-3
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-gray-300
      [&::-webkit-slider-thumb]:transition
      [&::-webkit-slider-thumb]:hover:scale-110

      [&::-moz-range-thumb]:h-3
      [&::-moz-range-thumb]:w-3
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-gray-300
      [&::-moz-range-thumb]:border-none
    "
  />

  {/* Plus */}
  <button
    onClick={() => setSpeed(Math.min(1000, speed + 100))}
    className="text-gray-500 text-sm px-1 hover:text-gray-300 transition"
    aria-label="Increase speed"
  >
    −
  </button>
</div>
      <AutoToggle/>
    </div>
  );
};

export default ControlPanel;
