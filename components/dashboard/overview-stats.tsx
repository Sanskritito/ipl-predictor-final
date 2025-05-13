"use client"

import { BarChart3, Brain } from "lucide-react"

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">ML Predictions</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-bold">1,284</span>
          <span className="text-xs text-muted-foreground">matches</span>
        </div>
        <div className="mt-1"></div>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">DL Accuracy</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-bold">82.1%</span>
          <span className="text-xs text-muted-foreground">correct</span>
        </div>
        <div className="mt-1"></div>
      </div>
    </div>
  )
}
