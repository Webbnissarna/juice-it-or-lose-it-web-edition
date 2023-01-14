import { useMemo } from "react";
import { default as ClipboardIcon } from "./icons/Clipboard";
import { motion } from "framer-motion";
import useJuice from "../hooks/useJuice";

export default function CompressedString({ rawString }: { rawString: string }) {
  const juice = useJuice();

  const compressedString = useMemo(() => {
    const s = Array.from(rawString).reduce((string, char, idx) => {
      if (idx % 2 === 0) {
        string += char;
      }
      return string;
    }, "");

    return s;
  }, []);

  switch (juice) {
    case 0:
      return (
        <div>
          <span>{compressedString}</span>
          <CopyToClipboardButton compressedString={compressedString} />
        </div>
      );
    case 1:
      return (
        <div className="flex w-full max-w-sm items-center justify-between gap-2">
          <span className="py-4 text-4xl font-bold">{compressedString}</span>
          <CopyToClipboardButton compressedString={compressedString} />
        </div>
      );
    case 2:
      return (
        <div className="flex w-full max-w-sm items-center justify-between gap-2">
          <span className="truncate py-4 text-4xl font-bold tracking-[-0.1em]">
            {compressedString}
          </span>
          <CopyToClipboardButton compressedString={compressedString} />
        </div>
      );
    case 3:
      return (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-sm items-center justify-between gap-2"
          id=""
        >
          <span className="truncate py-4 text-4xl font-bold tracking-[-0.1em]">
            {compressedString}
          </span>

          <CopyToClipboardButton compressedString={compressedString} />
        </motion.div>
      );
    case 4:
    case 5:
      return (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, width: 0 }}
          className="flex w-full max-w-sm items-center justify-between gap-2"
        >
          <div id="compressed string">
            {compressedString.split("").map((character) => {
              return (
                <motion.span
                  whileHover={{ y: -10 }}
                  className="inline-block py-4 text-4xl font-bold tracking-[-0.1em]"
                >
                  {character}
                </motion.span>
              );
            })}
          </div>
          <CopyToClipboardButton compressedString={compressedString} />
        </motion.div>
      );

    default:
      return null;
  }
}

function CopyToClipboardButton({
  compressedString,
}: {
  compressedString: string;
}) {
  return (
    <button
      className="h-fit w-fit cursor-pointer rounded-md border border-solid border-gray-800 p-2 hover:bg-gray-300"
      onClick={async (e) => {
        try {
          if (!navigator.clipboard) {
            throw new Error("No native support for clipboard events");
          }

          if (compressedString) {
            await navigator.clipboard.writeText(compressedString);
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <ClipboardIcon />
    </button>
  );
}
