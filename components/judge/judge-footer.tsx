import { Account } from "@/types/account";

interface JudgeFooterProps {
  reputationScore: number;
}

export function JudgeFooter({ reputationScore }: JudgeFooterProps) {
  return (
    <footer className="container relative z-10 py-2 text-center text-xs text-gray-500 dark:text-gray-400">
      <p>
        Your reputation score: {reputationScore} • Vote weight: {(reputationScore / 100).toFixed(2)}x
      </p>
    </footer>
  );
}
