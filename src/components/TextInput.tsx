import React, { useEffect, useState } from "react";
import { motion, useAnimationControls, Variants } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function TextInput({
  onChange,
  isCompressing,
}: {
  onChange: (value: string) => void;
  isCompressing: boolean;
}) {
  const juice = useJuice();
  const controls = useAnimationControls();

  useEffect(() => {
    if (juice < 4) {
      console.log("reset text input rotation");
      controls.start({ rotateZ: 0 });
    } else if (juice > 3 && isCompressing) {
      controls.start(
        {
          scaleX: [1, 0.3, 1],
          scaleY: [1, 1, 0.3],
        },
        { repeat: Infinity, repeatType: "reverse", duration: 0.3 }
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
