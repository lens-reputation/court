"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Loader2, Shield, Award, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ConnectPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate connection to Lens
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/judge")
    }, 2000)
  }

  if (!mounted) return null

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
          <Card className="overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg"
              >
                <Gavel className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Connect Your Lens Profile
                </CardTitle>
                <CardDescription className="mt-2">
                  Sign in with your Lens account to start judging profiles and cleaning up the network.
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-lg border border-amber-200 dark:border-amber-800 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20"
              >
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    You need to have minted the LensReputation NFT to participate as a judge. Your reputation score will
                    determine the weight of your votes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-lg border p-4 bg-gradient-to-r from-purple-50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-750"
              >
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  What happens after connecting:
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "You'll be shown 10 random Lens profiles",
                    "Vote thumbs up (authentic) or down (bot/untrustworthy)",
                    "Your votes are weighted by your reputation score",
                    "All votes are stored on-chain for transparency",
                  ].map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs shadow-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-200 dark:shadow-purple-900/30 h-12 text-base"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      Connect Lens Profile <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
