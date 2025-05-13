"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, LineChart, Network, Zap } from "lucide-react"
import { ModelArchitecture } from "@/components/deep-learning/model-architecture"
import { TrainingMetrics } from "@/components/deep-learning/training-metrics"
import { FeatureVisualization } from "@/components/deep-learning/feature-visualization"
import { ModelPerformance } from "@/components/deep-learning/model-performance"

export default function DeepLearningPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Deep Learning Stats</h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Accuracy</CardTitle>
            <div className="ml-auto rounded-md bg-blue-500/10 p-1">
              <Brain className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.1%</div>
            <p className="text-xs text-muted-foreground">+2.4% from last season</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Training Time</CardTitle>
            <div className="ml-auto rounded-md bg-yellow-500/10 p-1">
              <Zap className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">On GPU cluster</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Parameters</CardTitle>
            <div className="ml-auto rounded-md bg-green-500/10 p-1">
              <Network className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8M</div>
            <p className="text-xs text-muted-foreground">Transformer architecture</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Loss</CardTitle>
            <div className="ml-auto rounded-md bg-red-500/10 p-1">
              <LineChart className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.182</div>
            <p className="text-xs text-muted-foreground">Cross-entropy loss</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="architecture" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="architecture">Model Architecture</TabsTrigger>
          <TabsTrigger value="training">Training Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Visualization</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="architecture" className="space-y-6 py-4">
          <ModelArchitecture />
        </TabsContent>
        <TabsContent value="training" className="space-y-6 py-4">
          <TrainingMetrics />
        </TabsContent>
        <TabsContent value="features" className="space-y-6 py-4">
          <FeatureVisualization />
        </TabsContent>
        <TabsContent value="performance" className="space-y-6 py-4">
          <ModelPerformance />
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}
