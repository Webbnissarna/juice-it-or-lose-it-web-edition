import { AnimatePresence } from "framer-motion";
import { Dispatch, useState } from "react";
import CompressButton from "./CompressButton";
import CompressedString from "./CompressedString";
import TextInput from "./TextInput";

export default function TextContainer({
  compressing,
  setCompressing,
}: {
  compressing: boolean;
  setCompressing: Dispatch<boolean>;
}) {
  const [rawText, setRawText] = useState("");
  const [compressed, setCompressed] = useState(false);
  const compressTime = 2;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-start gap-4">
        <AnimatePresence>
          <TextInput
            onChange={setRawText}
            isCompressing={compressing}
            compressTime={compressTime}
            key={"textinput"}
          />
          <CompressButton
            onClick={() => {
              if (!compressing) {
                setCompressing(true);
                setCompressed(false);
                setTimeout(() => {
                  setCompressing(false);
                  setCompressed(true);
                }, compressTime * 1000);
              }
            }}
            isCompressing={compressing}
            compressTime={compressTime}
            key={"compress-button"}
          />
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {compressed && <CompressedString rawString={rawText} />}
      </AnimatePresence>
    </div>
  );
}
