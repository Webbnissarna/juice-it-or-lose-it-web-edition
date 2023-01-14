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
    "bg-green-500 px-4 py-2 text-green-900",
    "bg-green-500 px-4 py-2 text-green-900 shadow-md font-bold",
    "bg-green-500 px-4 py-2 text-green-900 shadow-md font-bold hover:bg-green-400 active:shadow-sm",
    "bg-green-500 px-4 py-2 text-green-900 shadow-md font-bold hover:bg-green-400 active:shadow-sm disabled:bg-green-300 disabled:text-green-500 disabled:shadow-none",
    "rounded-md bg-green-500 px-4 py-2 font-bold text-green-900 shadow-md hover:bg-green-400 active:shadow-sm disabled:bg-green-300 disabled:text-green-500 disabled:shadow-none",
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
    if (isCompressing && juice > 4) {
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
      className={juiceLevels[juice] + " origin-top-left"}
      variants={animations}
      animate={animationController}
    >
      {isCompressing ? "compressing" : "Compress string"}
    </motion.button>
  );
}
