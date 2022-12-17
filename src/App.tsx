import { useState, createContext } from "react";
import JuiceProvider from "./JuiceProvider";
import Lemon from "./components/Lemon";
import JuiceMeter from "./components/JuiceMeter";
import TextInput from "./components/TextInput";
import CompressButton from "./components/CompressButton";
import TextContainer from "./components/TextContainer";
import JuiceIndicator from "./components/JuiceIndicator";

function App() {
  const [juice, setJuice] = useState(0);
  return (
    <JuiceProvider value={juice}>
      <div className="mt-4 flex flex-col items-center gap-4">
        <JuiceMeter setJuice={setJuice} />
        <JuiceIndicator juice={juice} />
        <TextContainer />
      </div>
    </JuiceProvider>
  );
}

export default App;
