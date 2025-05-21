import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/types/account";
import { motion } from "framer-motion";
import { ExternalLink, Gavel, ThumbsDown, ThumbsUp } from "lucide-react";

interface AccountCardProps {
  account: Account;
  onVote: (isUpvote: boolean) => void;
  dragOffset: number;
  isMobile: boolean;
  exitDirection: "left" | "right" | null;
}

export function AccountCard({ account, onVote, dragOffset, isMobile, exitDirection }: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: dragOffset,
        rotate: dragOffset * 0.05,
      }}
      exit={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              opacity: 0,
              rotate: exitDirection === "right" ? 30 : -30,
            }
          : { opacity: 0, scale: 0.8 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.4 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
        <div className="relative flex h-20 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
          <Gavel className="h-8 w-8 text-white/80" />
        </div>

        <CardContent className="p-4 pt-0">
          <div className="-mt-10 flex justify-center">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg dark:border-gray-800">
              <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-xl font-bold text-white">
                {account.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-3 text-center">
            <h2 className="text-xl font-bold">{account.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{account.handle}</p>
          </div>

          <div className="mt-3 space-y-3">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">{account.bio}</p>

            <div className="flex justify-center gap-8 text-center">
              <div>
                <p className="font-bold">{account.posts}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div>
                <p className="font-bold">{account.followers}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-4">
            <a
              href={`https://hey.xyz/u/${account.handle.replace("lens/", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:underline dark:text-purple-400"
            >
              <ExternalLink className="h-3 w-3" />
              View on Hey.xyz
            </a>
            {/* <a
              href={`https://polygonscan.com/address/0x${account.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:underline dark:text-purple-400"
            >
              <ExternalLink className="h-3 w-3" />
              View Transactions
            </a> */}
          </div>

          <div className="mt-5 flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 rounded-full border-red-200 bg-red-50 text-red-500 shadow-md hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                onClick={() => onVote(false)}
              >
                <ThumbsDown className="h-7 w-7" />
                <span className="sr-only">Flag as Bot</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 rounded-full border-green-200 bg-green-50 text-green-500 shadow-md hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                onClick={() => onVote(true)}
              >
                <ThumbsUp className="h-7 w-7" />
                <span className="sr-only">Approve Account</span>
              </Button>
            </motion.div>
          </div>

          <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>{isMobile ? "Swipe left to flag, right to approve" : "Drag left to flag, right to approve"}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
