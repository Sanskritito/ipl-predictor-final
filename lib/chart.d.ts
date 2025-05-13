import type React from "react"
// This is a type definition file for the ChartContainer component
declare module "@/components/ui/chart" {
  interface ChartConfig {
    teamA: {
      label: string
      color: string
    }
    teamB: {
      label: string
      color: string
    }
  }

  interface ChartContainerProps {
    config: ChartConfig
    children: React.ReactNode
  }

  export const ChartContainer: React.FC<ChartContainerProps>
}
