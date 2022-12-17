import React, { useState } from "react";
import CompressButton from "./CompressButton";
import Lemon from "./Lemon";
import TextInput from "./TextInput";

export default function TextContainer() {
  const [rawText, setRawText] = useState("");
  const [compressing, setCompressing] = useState(false);
  const compressTime = 2;
  return (
    <div>
      <div className="flex items-start justify-start gap-4">
        <div>
          <TextInput
            onChange={setRawText}
            isCompressing={compressing}
            compressTime={compressTime}
          />
          <Lemon isCompressing={compressing} />
        </div>
        <CompressButton
          onClick={() => {
            if (!compressing) {
              setCompressing(true);
              setTimeout(() => {
                setCompressing(false);
              }, compressTime * 1000);
            }
          }}
          isCompressing={compressing}
          compressTime={compressTime}
        />
      </div>
    </div>
  );
}
