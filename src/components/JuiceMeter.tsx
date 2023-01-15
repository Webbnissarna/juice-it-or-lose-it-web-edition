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
        className="text-7xl font-extrabold uppercase text-yellow-300"
        style={{
          textShadow: "4px 0 0 red,0 4px 0 red,-4px 0 0 red,0 -4px 0 red",
        }}
      >
        Juice meter
      </label>
      <input
        id={"juicemeter"}
        type="range"
        min={0}
        max={4}
        step={1}
        defaultValue={juice}
        onChange={(e) => {
          setJuice(e.currentTarget.valueAsNumber);
        }}
        className="h-24 min-w-full text-green-700"
      />
    </div>
  );
}
