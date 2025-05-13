"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"

export function ModelPerformance() {
  // Sample performance by season data
  const seasonalPerformanceData = [
    { season: "2018", accuracy: 0.68, f1Score: 0.67, auc: 0.72 },
    { season: "2019", accuracy: 0.71, f1Score: 0.7, auc: 0.74 },
    { season: "2020", accuracy: 0.73, f1Score: 0.72, auc: 0.76 },
    { season: "2021", accuracy: 0.75, f1Score: 0.74, auc: 0.78 },
    { season: "2022", accuracy: 0.78, f1Score: 0.77, auc: 0.8 },
    { season: "2023", accuracy: 0.8, f1Score: 0.79, auc: 0.82 },
    { season: "2024", accuracy: 0.82, f1Score: 0.81, auc: 0.84 },
  ]

  // Sample confidence distribution data
  const confidenceDistributionData = [
    { confidence: "50-55%", correct: 52, incorrect: 48 },
    { confidence: "55-60%", correct: 57, incorrect: 43 },
    { confidence: "60-65%", correct: 63, incorrect: 37 },
    { confidence: "65-70%", correct: 68, incorrect: 32 },
    { confidence: "70-75%", correct: 72, incorrect: 28 },
    { confidence: "75-80%", correct: 77, incorrect: 23 },
    { confidence: "80-85%", correct: 82, incorrect: 18 },
    { confidence: "85-90%", correct: 87, incorrect: 13 },
    { confidence: "90-95%", correct: 92, incorrect: 8 },
    { confidence: "95-100%", correct: 96, incorrect: 4 },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Performance by Season</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="season" />
                <YAxis domain={[0.6, 0.9]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip
                  formatter={(value) => [`${(value * 100).toFixed(1)}%`]}
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Accuracy"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="f1Score"
                  name="F1 Score"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="auc"
                  name="AUC"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Confidence Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={confidenceDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="confidence" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="correct"
                  name="Correct Predictions"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="incorrect"
                  name="Incorrect Predictions"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
