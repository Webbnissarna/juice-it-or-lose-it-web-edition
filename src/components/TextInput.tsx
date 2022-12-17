import React, { useEffect, useState } from "react";
import { motion, useAnimationControls, Variants } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function TextInput({
  onChange,
  isCompressing,
  compressTime,
}: {
  onChange: (value: string) => void;
  isCompressing: boolean;
  compressTime: number;
}) {
  const juice = useJuice();
  const controls = useAnimationControls();

  const times = [0.0, 0.25, 0.5, 0.7, 0.85, 1];
  const scaleY = [1, 1.1, 1.3, 1.4, 1.45, 2];
  const scaleX = [1, 0.8, 0.65, 0.6, 0.55, 0.05];

  useEffect(() => {
    if (juice < 4) {
      controls.start({ rotateZ: 0 });
    } else if (juice > 3 && isCompressing) {
      controls.start(
        {
          scaleX: scaleX,
          scaleY: scaleY,
        },
        { duration: compressTime, times: times, ease: "easeIn" }
      );
    } else if (!isCompressing) {
      controls.stop();
      controls.start({
        scaleX: 1,
        scaleY: 1,
      });
    }
  }, [juice, isCompressing]);

  const juiceLevels = [
    "",
    "p-2",
    "p-2 rounded-md",
    "shadow-md p-2 border-solid rounded-md",
    "shadow-md p-2 border-solid rounded-md",
    "shadow-md p-2 border-solid rounded-md",
  ];
  return (
    <div className="">
      <motion.input
        type={"text"}
        placeholder={"Some text"}
        className={juiceLevels[juice]}
        onChange={(e) => {
          if (juice > 3 && !isCompressing) {
            controls.start({ rotateZ: Math.random() * juice * 2 - 3 });
          }
          onChange(e.currentTarget.value);
        }}
        disabled={isCompressing}
        animate={controls}
      />
    </div>
  );
}
