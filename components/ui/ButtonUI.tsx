"use client";

import { Button } from "@mui/material";
import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { HiMiniChartBar } from "react-icons/hi2";

type ButtonVariant = 
  | "play"
  | "pause"
  | "next"
  | "prev"
  | "reset"
  | "visualize";

const iconMap: Record<ButtonVariant, ReactNode | null> = {
  play: <FaPlay size={14} />,
  pause: <FaPause size={14} />,
  next: <RxArrowRight size={18} />,
  prev: <RxArrowLeft size={18} />,
  reset: <FaRedo size={14} />,
  visualize: <HiMiniChartBar />
};

const MotionButton = motion.create(Button);

const ButtonUI = ({ variant, onClick }: { variant?: ButtonVariant, onClick: ()=>void}) => {
  const icon = variant ? iconMap[variant] : null;

  const [isClient, setIsClient] = useState(false);
  useEffect(()=>{
    setIsClient(true);
  },[]);

return (
  isClient ? (
    <MotionButton
      onClick={onClick}
      variant="outlined"
      whileHover="hover"
      sx={{
  color: "rgba(209, 213, 220, 0.75)", // slightly dim default
  textTransform: "none",
  borderWidth: "0.5px",
  borderColor: "rgba(209, 213, 220, 0.25)",
  transition: "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",

  "&:hover": {
    color: "white", // FULL brightness
    borderWidth: "0.5px",
    borderColor: "rgba(209, 213, 220, 0.35)",
    backgroundColor: "rgba(209, 213, 220, 0.05)",
  },
}}

          >
      <motion.div
        style={{ display: "flex", alignItems: "center", color: "#d1d5dc"}}
        variants={{
          hover: {
            x: -5,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 15,
            },
          },
        }}
      >
        {variant}
        <motion.div
          style={{ marginLeft: 8, display: "flex", opacity: 0, x: -10 }}
          variants={{
            hover: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
              },
            },
          }}
        >
          {icon && (
  <motion.div
    style={{ marginLeft: 8, display: "flex", opacity: 0, x: -10 }}
    variants={{
      hover: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 15,
        },
      },
    }}
  >
    {icon}
  </motion.div>
)}

        </motion.div>
      </motion.div>
    </MotionButton>
  ) : (
    <div></div>
  )
);
};

export default ButtonUI;