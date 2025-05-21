"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "@/components/confetti";
// Judge Components
import { AccountCard } from "@/components/judge/account-card";
import { CompletionCard } from "@/components/judge/completion-card";
import { DirectionIndicator } from "@/components/judge/direction-indicator";
import { JudgeFooter } from "@/components/judge/judge-footer";
import { JudgeHeader } from "@/components/judge/judge-header";
import { LoadingState } from "@/components/judge/loading-state";
import { PageLayout } from "@/components/judge/page-layout";
import { useDragGesture } from "@/hooks/use-drag-gesture";
import { useLensReputation } from "@/hooks/use-lens-reputation";
import { useMobile } from "@/hooks/use-mobile";
import { fetchAccounts } from "@/lib/lens/accounts";
import { Account } from "@/types/account";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export default function JudgePage() {
  // State management
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reputationScore, setReputationScore] = useState(75); // Mock reputation score
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  // Hooks
  const router = useRouter();
  const isMobile = useMobile();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuthStore();
  const { hasMintedReputation, isLoading: isLoadingNFT } = useLensReputation();
  const { isDragging, dragOffset, direction, handleDragStart, handleDragMove, handleDragEnd } = useDragGesture();

  // Current account data
  const currentAccount = accounts[currentAccountIndex];

  // Fetch accounts from Lens Protocol
  useEffect(() => {
    const loadAccounts = async () => {
      setIsLoadingAccounts(true);
      try {
        const fetchedAccounts = await fetchAccounts(10);
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("Error loading accounts:", error);
        toast.error("Failed to load accounts. Please try again later.");
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    if (hasPermission) {
      loadAccounts();
    }
  }, [hasPermission]);

  // Check permissions before mounting the component
  useEffect(() => {
    // Wait until both auth and NFT status have loaded
    if (isAuthLoading || isLoadingNFT) return;

    // Check if user has permission to view this page
    if (!isLoggedIn || !hasMintedReputation) {
      router.push("/connect");
      return;
    }

    // Only set permission to true if user is logged in and has minted reputation
    setHasPermission(true);
  }, [isLoggedIn, hasMintedReputation, isLoadingNFT, isAuthLoading, router]);

  // Check for completion
  useEffect(() => {
    if (accounts.length > 0 && currentAccountIndex >= accounts.length - 1) {
      setCompleted(true);
    }
  }, [currentAccountIndex, accounts]);

  // Vote handler
  const handleVote = (isUpvote: boolean) => {
    // Set exit direction for animation
    setExitDirection(isUpvote ? "right" : "left");

    // Show confetti for upvotes
    if (isUpvote) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    // Show toast notification
    if (isUpvote) {
      toast.success("Account Approved! 👍", {
        description: `You've approved ${currentAccount.handle}. Your vote has been weighted by your reputation score.`,
      });
    } else {
      toast.error("Account Flagged! 👎", {
        description: `You've flagged ${currentAccount.handle}. Your vote has been weighted by your reputation score.`,
      });
    }

    // Move to next account after animation
    setTimeout(() => {
      setCurrentAccountIndex(prev => prev + 1);
      setExitDirection(null);
    }, 500);
  };

  // Drag gesture handler
  const handleDragEndWithVote = () => {
    handleDragEnd(dir => {
      if (dir === "right") {
        handleVote(true);
      } else if (dir === "left") {
        handleVote(false);
      }
    });
  };

  // Completion handler
  const handleFinish = () => {
    router.push("/");
    toast.success("Judging Complete! 🎉", {
      description: "Thank you for helping clean up the Lens network. Your contributions are valuable!",
    });
  };

  // Loading state
  if (isLoadingNFT || isLoadingAccounts || hasPermission === null) {
    return <LoadingState />;
  }

  // Completion state
  if (completed) {
    return (
      <PageLayout>
        <div className="container relative flex h-full items-center justify-center px-4">
          <CompletionCard reputationScore={reputationScore} onFinish={handleFinish} />
        </div>
      </PageLayout>
    );
  }

  // Main judging interface
  return (
    <PageLayout>
      {showConfetti && <Confetti />}

      <div className="container relative flex h-full flex-col">
        <JudgeHeader
          currentIndex={currentAccountIndex}
          totalAccounts={accounts.length}
          reputationScore={reputationScore}
        />

        <main className="relative z-10 flex flex-1 items-center justify-center py-2">
          <div
            className="relative w-full max-w-md"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEndWithVote}
            onMouseLeave={handleDragEndWithVote}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEndWithVote}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <AnimatePresence mode="wait">
              <AccountCard
                key={currentAccountIndex}
                account={currentAccount}
                onVote={handleVote}
                dragOffset={dragOffset}
                isMobile={isMobile}
                exitDirection={exitDirection}
              />
            </AnimatePresence>

            <DirectionIndicator direction={direction} />
          </div>
        </main>

        <JudgeFooter reputationScore={reputationScore} />
      </div>
    </PageLayout>
  );
}
