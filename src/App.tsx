import { useState, createContext, useEffect } from "react";
import JuiceProvider from "./JuiceProvider";
import JuiceMeter from "./components/JuiceMeter";
import TextContainer from "./components/TextContainer";
import JuiceIndicator from "./components/JuiceIndicator";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import FormInformation from "./components/FormInformation";
import BackgroundBoard from "./components/BackgroundBoard";
import { LayoutGroup } from "framer-motion";

function App() {
  const [juice, setJuice] = useState(0);
  const [compressing, setCompressing] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/lemon.riv",
    artboard: "Lemon",
    stateMachines: "Machine",
    autoplay: true,
  });

  useEffect(() => {
    if (rive) {
      rive.play();
    }
    return () => {};
  }, [rive]);

  return (
    <JuiceProvider value={juice}>
      <div className="h-36 w-full">
        {/* <Rive src="public/juiceitorloseit.riv" /> */}
        <RiveComponent />
      </div>
      <div className="mt-4 flex flex-col items-center gap-12">
        <JuiceMeter setJuice={setJuice} />
        <JuiceIndicator juice={juice} compressing={compressing} />
        <BackgroundBoard>
          <>
            <FormInformation />
            <TextContainer
              compressing={compressing}
              setCompressing={setCompressing}
            />
          </>
        </BackgroundBoard>
      </div>
    </JuiceProvider>
  );
}

export default App;
