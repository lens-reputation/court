"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gavel, Shield, Trophy, Users, ArrowRight, Star, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <header className="container z-10 flex items-center justify-between py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <Gavel className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            LensCourt
          </h1>
        </motion.div>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/stats"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Stats
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900"
            >
              <Link href="/connect">Connect Lens</Link>
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="container relative pt-12 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
            <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg"
                  >
                    <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text"
                  >
                    Community-powered moderation
                  </motion.span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                >
                  Be the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    Judge
                  </span>{" "}
                  of the Lens Network
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg text-gray-600 dark:text-gray-300"
                >
                  Help clean up the Lens ecosystem by identifying bots and rewarding authentic profiles in a fun,
                  gamified experience.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
                  >
                    <Link href="/connect" className="flex items-center gap-2">
                      Start Judging <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900"
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">1,342+</span> judges already active
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-md aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl transform rotate-3 scale-[0.97]"></div>

                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Gavel className="w-12 h-12 text-white/80" />
                  </div>

                  <div className="p-6 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 -mt-16 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-xl font-bold">
                      JD
                    </div>

                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-lg">John.lens</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Web3 Developer & NFT Collector</p>
                    </div>

                    <div className="mt-6 w-full flex justify-between">
                      <div className="text-center">
                        <p className="font-bold">127</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">3.2K</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">95%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Trust Score</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-center cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotate: [0, -15, 0, 15, 0] }}
                          transition={{ duration: 0.5, delay: 1, repeat: 2, repeatDelay: 3 }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-500"
                          >
                            <path
                              d="M17 2H19.67C20.236 1.99993 20.7859 2.17518 21.2376 2.49995C21.6893 2.82472 22.0185 3.27799 22.17 3.8L22.76 6C22.79 6.15 22.79 6.3 22.77 6.45C22.7566 6.57428 22.7278 6.69668 22.685 6.815L21.62 9.795C21.39 10.375 21 10.865 20.5 11.215C20 11.575 19.4 11.765 18.78 11.765H13V6C13 4.9 13.9 4 15 4H17ZM11 11.765H4C2.9 11.765 2 10.865 2 9.765V6C2 4.9 2.9 4 4 4H11V11.765ZM17 4H15V9.765H18.78C19.13 9.765 19.46 9.655 19.73 9.455C20 9.255 20.21 8.965 20.33 8.635L21.39 5.655C21.4007 5.62997 21.4077 5.60345 21.411 5.576C21.4122 5.56733 21.4122 5.55867 21.411 5.55L20.82 3.35C20.75 3.12 20.61 2.93 20.41 2.795C20.2056 2.66648 19.9669 2.59949 19.725 2.6L17 2.6V4ZM11 13.765V17.765C11 19.965 9.2 21.765 7 21.765C4.8 21.765 3 19.965 3 17.765V13.765H11ZM9 15.765H5V17.765C5 18.865 5.9 19.765 7 19.765C8.1 19.765 9 18.865 9 17.765V15.765Z"
                              fill="currentColor"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center justify-center cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, 0, -15, 0] }}
                          transition={{ duration: 0.5, delay: 2, repeat: 2, repeatDelay: 3 }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500"
                          >
                            <path
                              d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Reputation Score</p>
                    <p className="text-sm font-bold">85/100</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -left-6 top-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  <p className="text-xs font-medium">Top Judge</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">How LensCourt Works</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our community-driven approach helps identify bots and maintain the integrity of the Lens network
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                  title: "Reputation-Weighted",
                  description:
                    "Your LensReputation NFT score gives your votes more impact, rewarding trusted community members.",
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                  title: "Community-Driven",
                  description:
                    "Collectively decide which profiles are authentic and which are bots through a democratic process.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                  title: "Transparent & Secure",
                  description: "All votes are stored on-chain for complete transparency and tamper-proof results.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 p-8 rounded-xl shadow-lg shadow-purple-100 dark:shadow-purple-900/10"
                >
                  <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-lg shadow-md flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to be a Judge?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join our community of judges and help make the Lens network a better place for everyone.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
                >
                  <Link href="/connect" className="flex items-center gap-2">
                    Start Judging Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-8 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 LensCourt. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Privacy
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
