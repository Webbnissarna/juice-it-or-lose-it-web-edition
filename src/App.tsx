import { useState, createContext, useEffect } from "react";
import JuiceProvider from "./JuiceProvider";
import JuiceMeter from "./components/JuiceMeter";
import TextContainer from "./components/TextContainer";
import JuiceIndicator from "./components/JuiceIndicator";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

function App() {
  const [juice, setJuice] = useState(0);
  const [compressing, setCompressing] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/juiceitorloseit.riv",
    artboard: "Juice",
    stateMachines: "Machine",
    autoplay: true,
  });

  useEffect(() => {
    if (rive) {
      rive.play();
    }
    return () => {};
  }, [rive]);

  useEffect(() => {
    if (dropInput && textInput) {
      if (juice > 3) {
        textInput.value = false;
      } else if (juice > 1) {
        dropInput.value = false;
        textInput.value = true;
      } else {
        dropInput.value = true;
        textInput.value = false;
      }
    }
  }, [juice]);

  const dropInput = useStateMachineInput(rive, "Machine", "drop");
  const textInput = useStateMachineInput(rive, "Machine", "text");

  return (
    <JuiceProvider value={juice}>
      <div className="h-36 w-full">
        {/* <Rive src="public/juiceitorloseit.riv" /> */}
        <RiveComponent />
      </div>
      <div className="mt-4 flex flex-col items-center gap-4">
        <JuiceMeter setJuice={setJuice} />
        <JuiceIndicator juice={juice} />
        <TextContainer
          compressing={compressing}
          setCompressing={setCompressing}
        />
      </div>
    </JuiceProvider>
  );
}

export default App;
