"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Confetti from "@/components/confetti";
import { LoginConnectButton } from "@/components/login-connect-button";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Award, ExternalLink, Gavel, ThumbsDown, ThumbsUp } from "lucide-react";

// Mock data for profiles
const mockProfiles = [
  {
    id: 1,
    handle: "alice.lens",
    name: "Alice",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Digital artist and NFT creator",
    posts: 127,
    followers: 3420,
  },
  {
    id: 2,
    handle: "bob.lens",
    name: "Bob",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Crypto enthusiast | Web3 developer",
    posts: 89,
    followers: 1250,
  },
  {
    id: 3,
    handle: "charlie.lens",
    name: "Charlie",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Sharing thoughts on DeFi and the future of finance",
    posts: 215,
    followers: 5600,
  },
  {
    id: 4,
    handle: "diana.lens",
    name: "Diana",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Artist • Writer • Creator",
    posts: 76,
    followers: 980,
  },
  {
    id: 5,
    handle: "evan.lens",
    name: "Evan",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Building the decentralized future | Solidity dev",
    posts: 132,
    followers: 2340,
  },
  {
    id: 6,
    handle: "fiona.lens",
    name: "Fiona",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Photography and blockchain technology",
    posts: 54,
    followers: 760,
  },
  {
    id: 7,
    handle: "greg.lens",
    name: "Greg",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Memes and dreams",
    posts: 310,
    followers: 8900,
  },
  {
    id: 8,
    handle: "hannah.lens",
    name: "Hannah",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Exploring web3 social graphs",
    posts: 92,
    followers: 1870,
  },
  {
    id: 9,
    handle: "ian.lens",
    name: "Ian",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Musician and NFT collector",
    posts: 63,
    followers: 1120,
  },
  {
    id: 10,
    handle: "julia.lens",
    name: "Julia",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Documenting my web3 journey",
    posts: 147,
    followers: 2560,
  },
];

export default function JudgePage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [direction, setDirection] = useState<"" | "left" | "right">("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [reputationScore, setReputationScore] = useState(75); // Mock reputation score
  const [mounted, setMounted] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const cardRef = useRef(null);
  const { toast } = useToast();
  const router = useRouter();
  const isMobile = useMobile();
  const { isLoggedIn } = useAuth();

  const currentProfile = mockProfiles[currentProfileIndex];
  const progress = (currentProfileIndex / mockProfiles.length) * 100;

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to connect page if user is not logged in
  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push("/connect");
    }
  }, [isLoggedIn, mounted, router]);

  useEffect(() => {
    if (currentProfileIndex >= 9) {
      setCompleted(true);
    }
  }, [currentProfileIndex]);

  const handleVote = (isUpvote: boolean) => {
    // Set exit direction for animation
    setExitDirection(isUpvote ? "right" : "left");

    // Show confetti for upvotes
    if (isUpvote) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    // Show toast notification
    toast({
      title: isUpvote ? "Profile Approved! 👍" : "Profile Flagged! 👎",
      description: `You've ${isUpvote ? "approved" : "flagged"} ${currentProfile.handle}. Your vote has been weighted by your reputation score.`,
      variant: isUpvote ? "default" : "destructive",
    });

    // Move to next profile after animation
    // Using a longer timeout to ensure the exit animation completes fully
    setTimeout(() => {
      setCurrentProfileIndex(prev => prev + 1);
      setExitDirection(null);
    }, 500);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setDragOffset(0);
    if (e.type === "touchstart") {
      setTouchStart((e as React.TouchEvent).touches[0].clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    let clientX: number;
    if (e.type === "touchmove") {
      clientX = (e as React.TouchEvent).touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    let newOffset: number;
    if (e.type === "touchmove" && touchStart !== null) {
      newOffset = clientX - touchStart;
    } else {
      newOffset = clientX - window.innerWidth / 2;
    }

    setDragOffset(newOffset);

    if (newOffset > 100) {
      setDirection("right");
    } else if (newOffset < -100) {
      setDirection("left");
    } else {
      setDirection("");
    }
  };

  const handleDragEnd = () => {
    if (direction === "right") {
      handleVote(true);
    } else if (direction === "left") {
      handleVote(false);
    }

    setIsDragging(false);
    setDragOffset(0);
    setDirection("");
    setTouchStart(null);
  };

  const handleFinish = () => {
    router.push("/");
    toast({
      title: "Judging Complete! 🎉",
      description: "Thank you for helping clean up the Lens network. Your contributions are valuable!",
    });
  };

  if (!mounted) return null;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container relative flex min-h-screen items-center justify-center px-4 py-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
            <div className="absolute -left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
            <div className="absolute -bottom-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="z-10 w-full max-w-md"
          >
            <Card className="overflow-hidden border-0 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-4 shadow-lg"
              >
                <Award className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400"
              >
                Judging Complete!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8 text-gray-600 dark:text-gray-300"
              >
                You've successfully judged 10 profiles. Your contributions help make the Lens network a better place!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50/50 p-4 dark:border-purple-800 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <h3 className="mb-2 flex items-center justify-center gap-2 font-medium">
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Your Impact:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    With your reputation score of {reputationScore}, your votes have a significant impact on the
                    network's trust system.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleFinish}
                    className="h-12 w-full border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-base text-white shadow-lg shadow-purple-200 hover:from-purple-700 hover:to-pink-700 dark:shadow-purple-900/30"
                  >
                    Return Home
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {showConfetti && <Confetti />}

      <div className="container relative flex min-h-screen flex-col py-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
          <div className="absolute -left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
          <div className="absolute -bottom-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
        </div>

        <header className="relative z-10 py-4">
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
                Profile {currentProfileIndex + 1} of {mockProfiles.length}
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

        <main className="relative z-10 flex flex-1 items-center justify-center py-8">
          <div
            className="relative w-full max-w-md"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProfileIndex}
                ref={cardRef}
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
                  <div className="relative flex h-24 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                    <Gavel className="h-8 w-8 text-white/80" />
                  </div>

                  <CardContent className="p-6 pt-0">
                    <div className="-mt-12 flex justify-center">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg dark:border-gray-800">
                        <AvatarImage src={currentProfile.avatar || "/placeholder.svg"} alt={currentProfile.name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-xl font-bold text-white">
                          {currentProfile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="mt-4 text-center">
                      <h2 className="text-2xl font-bold">{currentProfile.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@{currentProfile.handle}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <p className="text-center text-gray-600 dark:text-gray-300">{currentProfile.bio}</p>

                      <div className="flex justify-center gap-8 text-center">
                        <div>
                          <p className="font-bold">{currentProfile.posts}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
                        </div>
                        <div>
                          <p className="font-bold">{currentProfile.followers}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center gap-4">
                      <a
                        href={`https://hey.xyz/u/${currentProfile.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View on Hey.xyz
                      </a>
                      <a
                        href={`https://polygonscan.com/address/0x${currentProfile.id.toString(16)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Transactions
                      </a>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-16 w-16 rounded-full border-red-200 bg-red-50 text-red-500 shadow-md hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          onClick={() => handleVote(false)}
                        >
                          <ThumbsDown className="h-8 w-8" />
                          <span className="sr-only">Flag as Bot</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-16 w-16 rounded-full border-green-200 bg-green-50 text-green-500 shadow-md hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                          onClick={() => handleVote(true)}
                        >
                          <ThumbsUp className="h-8 w-8" />
                          <span className="sr-only">Approve Profile</span>
                        </Button>
                      </motion.div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        {isMobile
                          ? "Swipe left to flag as bot, right to approve"
                          : "Drag left to flag as bot, right to approve"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {direction === "left" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-red-500 p-2 text-white shadow-lg"
              >
                <ThumbsDown className="h-6 w-6" />
              </motion.div>
            )}

            {direction === "right" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-green-500 p-2 text-white shadow-lg"
              >
                <ThumbsUp className="h-6 w-6" />
              </motion.div>
            )}
          </div>
        </main>

        <footer className="container relative z-10 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Your reputation score: {reputationScore} • Vote weight: {(reputationScore / 100).toFixed(2)}x
          </p>
        </footer>
      </div>
    </div>
  );
}
