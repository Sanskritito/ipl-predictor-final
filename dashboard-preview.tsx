"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Brain, Cpu } from "lucide-react"
import { OverviewStats } from "./components/dashboard/overview-stats"
import { PredictionSummary } from "./components/dashboard/prediction-summary"
import { RecentPredictions } from "./components/dashboard/recent-predictions"
import { ModelAccuracy } from "./components/dashboard/model-accuracy"
import { TeamComparison } from "./components/dashboard/team-comparison"
import { UpcomingMatches } from "./components/dashboard/upcoming-matches"

export default function DashboardPreview() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image src="/images/ipl_logo.png" alt="IPL Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-700 dark:text-blue-400">IPL Match Predictor</h1>
          </div>
        </div>
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <OverviewStats />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Team Comparison</CardTitle>
                    <CardDescription>Performance metrics for selected teams</CardDescription>
                  </div>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <TeamComparison />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Model Accuracy</CardTitle>
                  <CardDescription>Prediction accuracy by model type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ModelAccuracy />
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Matches</CardTitle>
                  <CardDescription>Next 5 scheduled IPL matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingMatches />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Predictions</CardTitle>
                  <CardDescription>Latest match predictions and outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentPredictions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="predictions" className="space-y-6">
            <PredictionSummary />
          </TabsContent>
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Machine Learning</CardTitle>
                  <div className="ml-auto rounded-md bg-primary/10 p-1">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76.4%</div>
                  <p className="text-xs text-muted-foreground">Trained on 2008-2022, tested on 2023-2024</p>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-[76%] rounded-full bg-primary"></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Deep Learning</CardTitle>
                  <div className="ml-auto rounded-md bg-blue-500/10 p-1">
                    <Brain className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82.1%</div>
                  <p className="text-xs text-muted-foreground">Trained on 2008-2022, tested on 2023-2024</p>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-[82%] rounded-full bg-blue-500"></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Quantum ML</CardTitle>
                  <div className="ml-auto rounded-md bg-purple-500/10 p-1">
                    <Cpu className="h-4 w-4 text-purple-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">88.7%</div>
                  <p className="text-xs text-muted-foreground">Trained on 2008-2022, tested on 2023-2024</p>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-[89%] rounded-full bg-purple-500"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
