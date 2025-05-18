import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Shield, ThumbsDown, ThumbsUp, Users } from "lucide-react"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Community Stats</h1>
            <p className="text-gray-600 dark:text-gray-300">
              See how the community is helping clean up the Lens network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Profiles Judged
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="text-3xl font-bold">24,871</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Judges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="text-3xl font-bold">1,342</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Bots Identified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="text-3xl font-bold">3,127</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Voting Distribution</CardTitle>
                <CardDescription>How the community is voting on profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 text-green-500 mr-2" />
                        <span>Authentic Profiles</span>
                      </div>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-green-500 rounded-full" />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsDown className="w-4 h-4 text-red-500 mr-2" />
                        <span>Flagged as Bots</span>
                      </div>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2 bg-gray-200 dark:bg-gray-700">
                      <div className="h-full bg-red-500 rounded-full" />
                    </Progress>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Most Trusted Handle</div>
                      <div className="font-medium">@lens_official</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Most Flagged Handle</div>
                      <div className="font-medium">@crypto_bot_3821</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Judge Activity</CardTitle>
                <CardDescription>Weekly judging activity</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-[200px]">
                    <div className="absolute bottom-0 left-0 w-full flex items-end justify-between h-full px-2">
                      <div className="w-8 bg-purple-500 h-[30%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[45%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[60%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[80%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[65%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[90%] rounded-t-md"></div>
                      <div className="w-8 bg-purple-500 h-[75%] rounded-t-md"></div>
                    </div>
                    <div className="absolute bottom-[-25px] left-0 w-full flex items-end justify-between px-2">
                      <div className="w-8 text-center text-xs">Mon</div>
                      <div className="w-8 text-center text-xs">Tue</div>
                      <div className="w-8 text-center text-xs">Wed</div>
                      <div className="w-8 text-center text-xs">Thu</div>
                      <div className="w-8 text-center text-xs">Fri</div>
                      <div className="w-8 text-center text-xs">Sat</div>
                      <div className="w-8 text-center text-xs">Sun</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Judges</CardTitle>
                <CardDescription>Users with the highest reputation scores and most judgments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Sarah.lens", score: 98, judgments: 1243 },
                    { name: "crypto_mike.lens", score: 95, judgments: 987 },
                    { name: "web3_guru.lens", score: 92, judgments: 876 },
                    { name: "nft_collector.lens", score: 90, judgments: 754 },
                    { name: "defi_expert.lens", score: 89, judgments: 701 },
                    { name: "blockchain_dev.lens", score: 87, judgments: 689 },
                  ].map((judge, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{judge.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Score: {judge.score} • {judge.judgments} judgments
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
