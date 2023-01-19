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

  const textColor = "text-yellow-500";

  switch (juice) {
    case 0:
      return <span>{compressedString}</span>;
    case 1:
      return (
        <span className={`py-4 text-4xl font-bold`}>{compressedString}</span>
      );
    case 2:
      return (
        <div className="flex w-full max-w-sm items-center justify-between gap-2">
          <span
            className={`truncate py-4 text-4xl font-bold tracking-[-0.1em] ${textColor}`}
          >
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
          <span
            className={`${textColor} truncate py-4 text-4xl font-bold tracking-[-0.1em]`}
          >
            {compressedString}
          </span>

          <CopyToClipboardButton compressedString={compressedString} />
        </motion.div>
      );
    case 4:
      return (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, width: 0 }}
          className="flex w-full max-w-sm items-center justify-between gap-2"
        >
          <motion.div
            id="compressed string"
            className="flex flex-nowrap gap-1"
            exit={{ width: 0, overflowX: "hidden" }}
          >
            {compressedString.split("").map((character, idx) => {
              if (idx > 23) {
                return null;
              }
              if (idx > 20) {
                return (
                  <motion.span
                    whileHover={{ y: -10 }}
                    className={`${textColor} inline-block py-4 text-4xl font-bold tracking-[-0.1em]`}
                    key={idx}
                  >
                    {"."}
                  </motion.span>
                );
              }
              return (
                <motion.span
                  whileHover={{ y: -10 }}
                  className={`${textColor} inline-block py-4 text-4xl font-bold tracking-[-0.1em]`}
                  key={idx}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.div>
          {juice > 2 ? (
            <CopyToClipboardButton compressedString={compressedString} />
          ) : null}
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
      className="h-fit w-fit cursor-pointer rounded-md border border-solid border-yellow-800 p-2 text-yellow-500 hover:bg-yellow-100"
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
