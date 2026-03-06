"use client";

import { useEffect } from "react"; // Added useEffect
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import useVisualizerStore from "@/store/useVisualizerStore";
import { useParams } from "next/navigation"; // Added useParams
import Link from "next/link";

export const algos = [
  { label: "Bubble Sort", key: "bubble" },
  { label: "Selection Sort", key: "selection" },
  { label: "Insertion Sort", key: "insertion" },
  { label: "Merge Sort", key: "merge" },
];

const AlgoSelector = () => {
  const params = useParams(); // Hook to grab the [algorithm] from the URL
  const { algorithm, setAlgorithm } = useVisualizerStore();

  // 1. Sync Store with URL
  // This ensures that if the sidebar changes the URL, the store updates, 
  // which then moves the "active-bg" highlight below.
  useEffect(() => {
    if (params?.algorithm) {
      const currentAlgo = params.algorithm as string;
      if (currentAlgo !== algorithm) {
        setAlgorithm(currentAlgo);
      }
    }
  }, [params?.algorithm, setAlgorithm, algorithm]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        padding: "4px",
        borderRadius: "6px",
        border: "0.5px solid rgba(209,213,220,0.25)",
        background: "rgba(209,213,220,0.03)",
        width: "100%", // Changed "full" to "100%" for MUI compatibility
      }}
    >
      {algos.map((algo) => {
        // 2. Local active check
        const isThisAlgoActive = algorithm === algo.key;

        return (
          <Link
            key={algo.key}
            href={`/sorting/${algo.key}`}
            onClick={() => setAlgorithm(algo.key)}
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "4px 10px",
              borderRadius: "6px",
              zIndex: 1,
              textDecoration: "none" // Clean up link styles
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: isThisAlgoActive
                  ? "rgba(209,213,220,1)"
                  : "rgba(209,213,220,0.55)",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                position: "relative",
                zIndex: 2,
              }}
            >
              {algo.label}
            </Typography>

            <AnimatePresence>
              {isThisAlgoActive && (
                <motion.div
                  layoutId="algo-active-bg" // Keeps the "sliding" animation
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(209,213,220,0.08)",
                    borderRadius: "6px",
                    zIndex: 1,
                  }}
                />
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </Box>
  );
};

export default AlgoSelector;