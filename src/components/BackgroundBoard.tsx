import React from "react";
import useJuice from "../hooks/useJuice";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function BackgroundBoard({ children }: Props) {
  const juice = useJuice();

  if (juice > 1) {
    return (
      <motion.div className="mx-[-50%] flex min-h-[300px] w-full flex-col items-center gap-12 bg-gray-800 p-8">
        {children}
      </motion.div>
    );
  }
  return <div>{children}</div>;
}
