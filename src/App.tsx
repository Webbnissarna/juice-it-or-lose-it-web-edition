import { useState, createContext } from "react";
import JuiceProvider from "./JuiceProvider";
import Lemon from "./components/Lemon";
import JuiceMeter from "./components/JuiceMeter";
import TextInput from "./components/TextInput";
import CompressButton from "./components/CompressButton";
import TextContainer from "./components/TextContainer";

function App() {
  const [juice, setJuice] = useState(0);
  return (
    <JuiceProvider value={juice}>
      <div className="flex flex-col items-center gap-4 mt-4">
        <JuiceMeter setJuice={setJuice} />
        <span>{juice}</span>
        <TextContainer />
      </div>
    </JuiceProvider>
  );
}

export default App;
