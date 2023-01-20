import useJuice from "../hooks/useJuice";

type Props = {};

export default function FormInformation({}: Props) {
  const juice = useJuice();

  const paragraphs = [
    "Enter text",
    "Enter text",
    "Enter text which you want to compress",
    "Enter text which you want to compress",
    "Enter the text you want to slice and dice below",
  ];
  const styles = [
    "",
    "text-lg",
    "text-lg text-yellow-400 font-semibold",
    "text-lg text-yellow-400 font-semibold",
    "text-lg text-yellow-400 font-semibold",
  ];
  const textColors = [
    "",
    "",
    "selection:text-green-700",
    "selection:text-orange-300",
    "selection:text-red-700",
  ];

  return (
    <p className={`${styles[juice]} ${textColors[juice]}`}>
      {paragraphs[juice]}
    </p>
  );
}
