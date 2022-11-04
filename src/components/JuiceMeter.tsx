import React from "react";
import useJuice from "../hooks/useJuice";

export default function JuiceMeter({
  setJuice,
}: {
  setJuice: (value: number) => void;
}) {
  const juice = useJuice();
  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="juicemeter"
        className="text-7xl uppercase font-bold text-yellow-300"
        style={{
          textShadow: "2px 0 0 red,0 2px 0 red,-2px 0 0 red,0 -2px 0 red",
        }}
      >
        Juice meter
      </label>
      <input
        id={"juicemeter"}
        type="range"
        min={0}
        max={5}
        step={1}
        defaultValue={juice}
        onChange={(e) => {
          setJuice(e.currentTarget.valueAsNumber);
        }}
        className="min-w-full h-24"
      />
    </div>
  );
}
