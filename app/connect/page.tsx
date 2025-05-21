"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginConnectButton } from "@/components/login-connect-button";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLensReputation } from "@/hooks/use-lens-reputation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, Gavel, Loader2, Shield } from "lucide-react";

export default function ConnectPage() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const { hasMintedReputation, isLoading: isLoadingNFT } = useLensReputation();

  // Ensure animations only run after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to judge page if user is already logged in and has minted reputation
  useEffect(() => {
    // Only redirect when both auth and NFT status have loaded
    if (isAuthLoading || isLoadingNFT) return;

    if (isLoggedIn && hasMintedReputation) {
      router.push("/judge");
    }
  }, [isLoggedIn, hasMintedReputation, isLoadingNFT, isAuthLoading, router]);

  if (!mounted) return null;

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container relative h-full px-4">
        <div className="absolute left-6 top-6 z-20">
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
        <div className="flex h-full items-center justify-center">
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
            style={{ maxHeight: "90vh" }}
          >
            <Card className="max-h-full overflow-auto border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 pb-4 pt-4 text-center dark:from-purple-500/20 dark:to-pink-500/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-3 shadow-lg"
                >
                  <Gavel className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CardTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl text-transparent dark:from-purple-400 dark:to-pink-400">
                    Connect Your Lens Profile
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Sign in with your Lens account to start judging profiles and cleaning up the network.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/50 p-3 dark:border-amber-800 dark:from-amber-900/20 dark:to-amber-800/20"
                >
                  <div className="flex gap-3">
                    <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      You need to have minted the LensReputation NFT to participate as a judge.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="dark:to-gray-750 rounded-lg border bg-gradient-to-r from-purple-50 to-indigo-50/50 p-3 dark:from-gray-800"
                >
                  <h3 className="mb-2 flex items-center gap-2 font-medium">
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    What happens after connecting:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "You'll be shown random Lens profiles",
                      "Vote thumbs up or down on profiles",
                      "Your votes are weighted by your reputation",
                      "All votes are stored on-chain",
                    ].map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-xs text-white shadow-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col pb-4 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex w-full flex-col gap-3 sm:flex-row"
                >
                  {isLoggedIn && (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                      {isLoadingNFT ? (
                        <Button
                          variant="default"
                          className="w-full bg-purple-600 text-white hover:bg-purple-700"
                          disabled
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                        </Button>
                      ) : hasMintedReputation ? (
                        <Button
                          variant="default"
                          className="w-full bg-purple-600 text-white hover:bg-purple-700"
                          asChild
                        >
                          <Link href="/judge" className="flex items-center justify-center gap-2">
                            <Gavel className="h-5 w-5" />
                            Go Judge
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="default" className="w-full bg-amber-500 text-white hover:bg-amber-600" asChild>
                          <Link
                            href="https://lensreputation.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1"
                          >
                            <Award className="h-4 w-4" />
                            <span className="whitespace-nowrap text-sm">Mint reputation</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={isLoggedIn ? "flex-1" : "flex w-full justify-center"}
                    style={!isLoggedIn ? { maxWidth: "240px", margin: "0 auto" } : {}}
                  >
                    <LoginConnectButton />
                  </motion.div>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
