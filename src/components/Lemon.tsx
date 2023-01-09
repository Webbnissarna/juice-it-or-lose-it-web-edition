import { motion, Variants } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function Lemon({ isCompressing }: { isCompressing: boolean }) {
  const value = useJuice();

  // if (value < 4 || !isCompressing) {
  //   return null;
  // }

  const dropAnimation: Variants = {
    start: {
      y: [0, 100],
      opacity: [0, 1],
      transition: {
        repeat: Infinity,
        type: "spring",
        stiffness: 2000,
        mass: 1,
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
      className="relative flex h-40 justify-center gap-2"
      variants={timeline}
      animate={"start"}
      transition={{ repeat: Infinity }}
      id="drops"
    >
      <Squeeze states={dropAnimation}>
        <Squeeze states={dropAnimation} />
      </Squeeze>
    </motion.div>
  );
}

function Squeeze({
  states,
  children,
}: {
  states: Variants;
  children?: React.ReactNode;
}) {
  return (
    <motion.div className="flex justify-between gap-2" variants={states}>
      <Drop states={states} />
      {children}
      <Drop states={states} />
    </motion.div>
  );
}

function Drop({ states }: { states: Variants }) {
  return (
    <motion.div
      className="top-0 h-12 w-8 rounded-full bg-yellow-200"
      variants={states}
    />
  );
}
