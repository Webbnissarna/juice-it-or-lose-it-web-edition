import { motion, Transition } from "framer-motion";

export default function ({ juice }: { juice: number }) {
  const juices = [
    { text: "Milk", color: "text-white" },
    { text: "Lemon juice", color: "text-yellow-800" },
    { text: "Orange juice", color: "text-orange-800" },
    { text: "Apple juice", color: "text-green-700" },
    { text: "Multivitamin juice", color: "text-orange-400" },
    { text: "Tropical juice", color: "text-red-700" },
  ];

  switch (juice) {
    case 0:
      return <div>{juice}</div>;
    case 1:
      return <div className="text-6xl font-extrabold">{juice}</div>;
    case 2:
      return (
        <div className="text-6xl font-extrabold">{juices[juice].text}</div>
      );
    case 3:
      return (
        <div className={`text-6xl font-extrabold ${juices[juice].color}`}>
          {juices[juice].text}
        </div>
      );
    case 4:
      return (
        <div className="relative">
          <Text
            main
            text={juices[juice].text}
            animate={"idle"}
            color={juices[juice].color}
            amplification={10}
          />
          <Text
            text={juices[juice].text}
            animate={"distort1"}
            color={juices[juice].color}
            amplification={10}
          />
        </div>
      );
    case 5:
      return (
        <div className="relative">
          <Text
            main
            text={juices[juice].text}
            animate="idle"
            color={juices[juice].color}
          />
          <Text
            text={juices[juice].text}
            animate="distort1"
            color="text-blue-800"
          />
          <Text
            text={juices[juice].text}
            animate="distort2"
            color="text-red-800"
          />
        </div>
      );
    default:
      return null;
  }
}

function Text({
  text,
  animate,
  color,
  main,
  amplification,
}: {
  text: string;
  animate: "idle" | "distort1" | "distort2";
  color: string;
  main?: boolean;
  amplification?: number;
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
      }  text-6xl font-extrabold ${color} whitespace-nowrap`}
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
