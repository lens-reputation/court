import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

export function LoadingState() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container relative flex h-full items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
          <div className="absolute -left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
          <div className="absolute -bottom-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10 w-full max-w-md"
        >
          <Card className="overflow-hidden border-0 bg-white/90 p-5 text-center shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400/40 to-pink-400/40 p-4">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                <Gavel className="h-8 w-8 text-purple-400" />
              </motion.div>
            </div>
            <Skeleton className="mx-auto mb-3 h-7 w-3/5 bg-purple-100 dark:bg-purple-900/60" />
            <Skeleton className="mx-auto mb-5 h-4 w-4/5 bg-gray-100 dark:bg-gray-700" />
            <div className="space-y-4">
              <div className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50/50 to-indigo-50/30 p-3 dark:border-purple-800/50 dark:from-purple-900/10 dark:to-indigo-900/10">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-purple-200 dark:bg-purple-800" />
                  <Skeleton className="h-4 w-24 bg-gray-100 dark:bg-gray-700" />
                </div>
                <Skeleton className="h-3 w-full bg-gray-100 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-10 w-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800" />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
