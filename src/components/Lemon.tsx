import { motion, Variants } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function Lemon({ isCompressing }: { isCompressing: boolean }) {
  const value = useJuice();

  if (value < 4 || !isCompressing) {
    return null;
  }

  const dropAnimation: Variants = {
    start: {
      y: [0, 25, 100],
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
      },
    },
  };
  const timeline: Variants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="flex h-40 justify-center gap-2"
      variants={timeline}
      animate={"start"}
      transition={{ repeat: Infinity }}
    >
      <Drop states={dropAnimation} />
      <Drop states={dropAnimation} />
      <Drop states={dropAnimation} />
      <Drop states={dropAnimation} />
    </motion.div>
  );
}

function Drop({ states }: { states: Variants }) {
  return (
    <motion.div
      className="h-12 w-8 rounded-full bg-yellow-200"
      variants={states}
    />
  );
}
