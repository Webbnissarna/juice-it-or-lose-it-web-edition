import React, { createContext } from "react";

export const JuiceContext = createContext(0);

export default function JuiceProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: number;
}) {
  return (
    <JuiceContext.Provider value={value}>{children}</JuiceContext.Provider>
  );
}
