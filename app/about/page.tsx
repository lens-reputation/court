"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Gavel, Shield, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container relative py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-4"
            >
              <Gavel className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
            >
              About LensCourt
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-600 dark:text-gray-300"
            >
              A community-driven approach to identifying bots on the Lens network
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
                  <CardTitle className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    How It Works
                  </CardTitle>
                  <CardDescription>The mechanics behind LensCourt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {[
                    {
                      step: 1,
                      title: "Connect Your Lens Account",
                      description:
                        "Sign in with your Lens profile to start judging. You must have minted the LensReputation NFT to participate.",
                    },
                    {
                      step: 2,
                      title: "Judge 10 Random Profiles",
                      description:
                        "You'll be shown 10 random Lens profiles. For each one, you can vote with a thumbs up (authentic) or thumbs down (bot/untrustworthy).",
                    },
                    {
                      step: 3,
                      title: "Reputation-Weighted Voting",
                      description:
                        "Your votes are weighted based on your LensReputation NFT score. The higher your reputation, the more impact your votes have.",
                    },
                    {
                      step: 4,
                      title: "On-Chain Transparency",
                      description:
                        "All voting data (profile, votes, and weights) is stored on a custom smart contract to ensure transparency and prevent manipulation.",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
                  <CardTitle className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    Why LensCourt?
                  </CardTitle>
                  <CardDescription>The benefits of our community-driven approach</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
                        title: "Network Security",
                        description:
                          "By identifying and flagging bots, we help maintain the integrity and security of the Lens network.",
                      },
                      {
                        icon: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
                        title: "Community Empowerment",
                        description:
                          "LensCourt puts the power in the hands of the community, allowing users to collectively determine what's authentic.",
                      },
                      {
                        icon: <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
                        title: "Reputation Matters",
                        description:
                          "Your reputation score gives weight to your judgments, incentivizing positive contributions to the ecosystem.",
                      },
                      {
                        icon: <Gavel className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
                        title: "Gamified Experience",
                        description:
                          "The judging process is designed to be fun and engaging, making it feel like a game rather than a chore.",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 p-4 rounded-xl shadow-md"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-white dark:bg-gray-800 w-8 h-8 rounded-lg shadow-sm flex items-center justify-center">
                            {feature.icon}
                          </div>
                          <h3 className="font-medium">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
                  <CardTitle className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    The LensReputation NFT
                  </CardTitle>
                  <CardDescription>Understanding the reputation system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    The LensReputation NFT is a dynamic token that represents your standing in the Lens community. Your
                    reputation score is calculated based on:
                  </motion.p>

                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300"
                  >
                    {[
                      "Length of time in the Lens ecosystem",
                      "Quality and quantity of content posted",
                      "Engagement with other users",
                      "Previous judging accuracy",
                      "Overall community contributions",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    The higher your reputation score, the more weight your votes carry in the LensCourt system. This
                    ensures that trusted community members have a stronger voice in determining what's authentic.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
              className="text-center pt-8"
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
