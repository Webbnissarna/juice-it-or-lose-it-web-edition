import React, { useEffect } from "react";

import { motion, useAnimationControls, Variants } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function CompressButton({
  onClick,
  isCompressing,
  compressTime,
}: {
  onClick: () => void;
  isCompressing: boolean;
  compressTime: number;
}) {
  const juice = useJuice();
  const animationController = useAnimationControls();
  const juiceLevels = [
    "",
    "bg-black px-4 py-2 text-white",
    "bg-black px-4 py-2 text-white shadow-md font-bold",
    "bg-black px-4 py-2 text-white shadow-md font-bold hover:bg-gray-800 active:shadow-sm",
    "rounded-md bg-black px-4 py-2 font-bold text-white shadow-md hover:bg-gray-800 active:shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none tracking-wider hover:tracking-tighter w-full",
  ];

  const animations: Variants = {
    idle: {
      rotateZ: 0,
    },
    start: {
      rotateZ: 40,
    },
    animate: {
      rotateZ: [0, 28, 32, 35, 37, 45],
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isCompressing && juice === 4) {
      animationController.start("animate");
    }
    return () => {
      animationController.start("idle");
    };
  }, [isCompressing]);

  return (
    <motion.button
      onClick={() => {
        onClick();
      }}
      disabled={isCompressing}
      className={juiceLevels[juice] + " origin-top-left uppercase"}
      variants={animations}
      animate={animationController}
    >
      {isCompressing ? "compressing" : "Compress"}
    </motion.button>
  );
}
