import Link from "next/link";
import { LoginConnectButton } from "@/components/login-connect-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Gavel } from "lucide-react";

interface JudgeHeaderProps {
  currentIndex: number;
  totalAccounts: number;
  reputationScore: number;
}

export function JudgeHeader({ currentIndex, totalAccounts, reputationScore }: JudgeHeaderProps) {
  const progress = (currentIndex / totalAccounts) * 100;

  return (
    <header className="relative z-10 pb-2 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2">
            <div className="rounded-full bg-white p-1.5 shadow-md transition-colors group-hover:bg-purple-50 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex items-center gap-1.5">
              <Gavel className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
                LensCourt
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-purple-200 bg-white/80 backdrop-blur-sm dark:border-purple-800 dark:bg-gray-800/80"
          >
            <Award className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            Rep Score: {reputationScore}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <LoginConnectButton />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Account {currentIndex + 1} of {totalAccounts}
          </span>
          <span className="text-gray-600 dark:text-gray-300">{Math.floor(progress)}% complete</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-gray-200 dark:bg-gray-700"
          indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
        />
      </div>
    </header>
  );
}
