"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThumbsDown, ThumbsUp, Gavel, Award, ExternalLink, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Confetti from "@/components/confetti"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

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
]

export default function JudgePage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [direction, setDirection] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [reputationScore, setReputationScore] = useState(75) // Mock reputation score
  const [mounted, setMounted] = useState(false)
  const [exitDirection, setExitDirection] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const cardRef = useRef(null)
  const { toast } = useToast()
  const router = useRouter()
  const isMobile = useMobile()

  const currentProfile = mockProfiles[currentProfileIndex]
  const progress = (currentProfileIndex / mockProfiles.length) * 100

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (currentProfileIndex >= mockProfiles.length) {
      setCompleted(true)
    }
  }, [currentProfileIndex])

  const handleVote = (isUpvote) => {
    // Set exit direction for animation
    setExitDirection(isUpvote ? "right" : "left")

    // Show confetti for upvotes
    if (isUpvote) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }

    // Show toast notification
    toast({
      title: isUpvote ? "Profile Approved! 👍" : "Profile Flagged! 👎",
      description: `You've ${isUpvote ? "approved" : "flagged"} ${currentProfile.handle}. Your vote has been weighted by your reputation score.`,
      variant: isUpvote ? "default" : "destructive",
    })

    // Move to next profile after animation
    setTimeout(() => {
      setCurrentProfileIndex((prev) => prev + 1)
      setExitDirection(null)
    }, 300)
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    setDragOffset(0)
    if (e.type === "touchstart") {
      setTouchStart(e.touches[0].clientX)
    }
  }

  const handleDragMove = (e) => {
    if (!isDragging) return

    let clientX
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }

    let newOffset
    if (e.type === "touchmove" && touchStart !== null) {
      newOffset = clientX - touchStart
    } else {
      newOffset = clientX - window.innerWidth / 2
    }

    setDragOffset(newOffset)

    if (newOffset > 100) {
      setDirection("right")
    } else if (newOffset < -100) {
      setDirection("left")
    } else {
      setDirection("")
    }
  }

  const handleDragEnd = () => {
    if (direction === "right") {
      handleVote(true)
    } else if (direction === "left") {
      handleVote(false)
    }

    setIsDragging(false)
    setDragOffset(0)
    setDirection("")
    setTouchStart(null)
  }

  const handleFinish = () => {
    router.push("/")
    toast({
      title: "Judging Complete! 🎉",
      description: "Thank you for helping clean up the Lens network. Your contributions are valuable!",
    })
  }

  if (!mounted) return null

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container relative flex items-center justify-center min-h-screen py-12 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
            <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md z-10"
          >
            <Card className="overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
              >
                Judging Complete!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-600 dark:text-gray-300 mb-8"
              >
                You've successfully judged 10 profiles. Your contributions help make the Lens network a better place!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="font-medium mb-2 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-200 dark:shadow-purple-900/30 h-12 text-base"
                  >
                    Return Home
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {showConfetti && <Confetti />}

      <div className="container relative min-h-screen flex flex-col py-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
        </div>

        <header className="relative z-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md group-hover:bg-purple-50 dark:group-hover:bg-gray-700 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Gavel className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    LensCourt
                  </h1>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-800"
              >
                <Award className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                Rep Score: {reputationScore}
              </Badge>
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

        <main className="flex-1 relative z-10 flex items-center justify-center py-8">
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
            <AnimatePresence>
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
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full"
              >
                <Card className="overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="relative h-24 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Gavel className="w-8 h-8 text-white/80" />
                  </div>

                  <CardContent className="p-6 pt-0">
                    <div className="flex justify-center -mt-12">
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
                        <AvatarImage src={currentProfile.avatar || "/placeholder.svg"} alt={currentProfile.name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl font-bold">
                          {currentProfile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-center mt-4">
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
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View on Hey.xyz
                      </a>
                      <a
                        href={`https://polygonscan.com/address/0x${currentProfile.id.toString(16)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
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
                          className="rounded-full h-16 w-16 bg-red-50 hover:bg-red-100 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 shadow-md"
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
                          className="rounded-full h-16 w-16 bg-green-50 hover:bg-green-100 border-green-200 text-green-500 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30 shadow-md"
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
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full shadow-lg z-20"
              >
                <ThumbsDown className="h-6 w-6" />
              </motion.div>
            )}

            {direction === "right" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full shadow-lg z-20"
              >
                <ThumbsUp className="h-6 w-6" />
              </motion.div>
            )}
          </div>
        </main>

        <footer className="relative z-10 container py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Your reputation score: {reputationScore} • Vote weight: {(reputationScore / 100).toFixed(2)}x
          </p>
        </footer>
      </div>
    </div>
  )
}
