import { useContext } from "react";
import { JuiceContext } from "../JuiceProvider";

export default function useJuice() {
  const value = useContext(JuiceContext);

  return value;
}
