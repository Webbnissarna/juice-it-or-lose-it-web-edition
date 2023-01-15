import useJuice from "../hooks/useJuice";

export default function FormInformation({}) {
  const juice = useJuice();

  const paragraphs = ["", "", "", "", ""];

  return <p>{paragraphs[juice]}</p>;
}
