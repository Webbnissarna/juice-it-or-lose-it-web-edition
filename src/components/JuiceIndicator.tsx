import { motion, Transition, Variants } from "framer-motion";

export default function ({
  juice,
  compressing,
}: {
  juice: number;
  compressing: boolean;
}) {
  const juices = [
    { text: "Water", color: "text-white" },
    { text: "Cucumber water", color: "text-blue-400" },
    { text: "Apple juice", color: "text-green-700" },
    { text: "Orange juice", color: "text-orange-300" },
    { text: "Tropical juice", color: "text-red-700" },
  ];

  switch (juice) {
    case 0:
      return <div>{juices[juice].text}</div>;
    case 1:
      return (
        <div className={`text-2xl font-extrabold ${juices[juice].color}`}>
          {juices[juice].text}
        </div>
      );
    case 2:
      return (
        <div className={`text-3xl font-extrabold ${juices[juice].color}`}>
          {juices[juice].text}
        </div>
      );
    case 3:
      return (
        <div className={`text-4xl font-extrabold ${juices[juice].color}`}>
          {juices[juice].text}
        </div>
      );
    case 4:
      return (
        <JuiceText text={juices[juice].text} isCompressing={compressing} />
      );
    default:
      return null;
  }
}

function JuiceText({
  text,
  isCompressing,
}: {
  text: string;
  isCompressing: boolean;
}) {
  const variants: Variants = {
    idle: {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    compress: {
      clipPath: "inset(100% 0% 0% 0%)",
    },
  };

  return (
    <motion.span
      variants={variants}
      initial="idle"
      // animate={isCompressing ? "compress" : "idle"}
      whileHover={"compress"}
      className={`bg-gradient-to-t from-red-700 to-transparent bg-clip-text p-2 text-5xl font-extrabold text-transparent`}
      transition={{ duration: 5 }}
    >
      {text}
    </motion.span>
  );
}

function Text({
  text,
  animate,
  color,
  main,
  amplification,
  fontSize = "text-6xl",
}: {
  text: string;
  animate: "idle" | "distort1" | "distort2";
  color: string;
  main?: boolean;
  amplification?: number;
  fontSize?: string;
}) {
  const animations = {
    idle: {
      top: 0,
      left: 0,
    },
    distort1: {
      top: [-0.5, -0.5, -0.5, 0, 0.5, 0.5, 0.5, 0, -0.5],
      left: [-0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, -0.5, -0.5],
    },
    distort2: {
      top: [0.5, 0, -0.5, -0.5, -0.5, 0, 0.5, 0.5, 0.5],
      left: [0.5, 0.5, 0.5, 0, -0.5, -0.5, -0.5, 0, 0.5],
    },
  };

  const amplitude = amplification ?? 5;
  animations.distort1.left = amplify({
    amplification: amplitude,
    values: animations.distort1.left,
  });
  animations.distort2.left = amplify({
    amplification: amplitude,
    values: animations.distort2.left,
  });
  animations.distort2.top = amplify({
    amplification: amplitude,
    values: animations.distort2.top,
  });

  const times = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
  const transition: Transition = {
    duration: 0.2,
    ease: "linear",
    repeat: Infinity,
    times: times,
  };
  return (
    <motion.span
      variants={animations}
      transition={transition}
      initial={"idle"}
      animate={animate}
      className={`${
        main ? "" : "absolute left-0 -z-10"
      } ${fontSize} font-extrabold ${color} whitespace-nowrap`}
    >
      {text}
    </motion.span>
  );
}

function amplify({
  amplification,
  values,
}: {
  amplification: number;
  values: Array<number>;
}) {
  return values.map((value) => value * amplification);
}
