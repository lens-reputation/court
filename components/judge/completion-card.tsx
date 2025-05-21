import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface CompletionCardProps {
  reputationScore: number;
  onFinish: () => void;
}

export function CompletionCard({ reputationScore, onFinish }: CompletionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="z-10 w-full max-w-md"
    >
      <Card className="overflow-hidden border-0 bg-white/90 p-5 text-center shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-4 shadow-lg"
        >
          <Award className="h-8 w-8 text-white" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400"
        >
          Judging Complete!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-5 text-sm text-gray-600 dark:text-gray-300"
        >
          You've successfully judged 10 accounts. Your contributions help make the Lens network a better place!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50/50 p-3 dark:border-purple-800 dark:from-purple-900/20 dark:to-indigo-900/20">
            <h3 className="mb-1 flex items-center justify-center gap-2 text-sm font-medium">
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Your Impact:
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              With your reputation score of {reputationScore}, your votes have a significant impact on the network.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onFinish}
              className="h-10 w-full border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-sm text-white shadow-lg shadow-purple-200 hover:from-purple-700 hover:to-pink-700 dark:shadow-purple-900/30"
            >
              Return Home
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
