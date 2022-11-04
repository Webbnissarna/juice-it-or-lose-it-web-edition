import React, { useState } from "react";
import CompressButton from "./CompressButton";
import Lemon from "./Lemon";
import TextInput from "./TextInput";

export default function TextContainer() {
  const [rawText, setRawText] = useState("");
  const [compressing, setCompressing] = useState(false);
  return (
    <div>
      <div className="flex items-start justify-start gap-4">
        <div>
          <TextInput onChange={setRawText} isCompressing={compressing} />
          <Lemon isCompressing={compressing} />
        </div>
        <CompressButton
          onClick={() => {
            console.log("compressing");
            if (!compressing) {
              setCompressing(true);
              setTimeout(() => {
                setCompressing(false);
              }, 2000);
            }
          }}
          isCompressing={compressing}
        />
      </div>
    </div>
  );
}
