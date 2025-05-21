import { motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface DirectionIndicatorProps {
  direction: "left" | "right" | "";
}

export function DirectionIndicator({ direction }: DirectionIndicatorProps) {
  if (direction === "") return null;

  return (
    <>
      {direction === "left" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-red-500 p-2 text-white shadow-lg"
        >
          <ThumbsDown className="h-5 w-5" />
        </motion.div>
      )}

      {direction === "right" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-green-500 p-2 text-white shadow-lg"
        >
          <ThumbsUp className="h-5 w-5" />
        </motion.div>
      )}
    </>
  );
}
