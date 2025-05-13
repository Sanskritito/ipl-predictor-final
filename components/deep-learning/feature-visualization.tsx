"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function FeatureVisualization() {
  // Sample feature importance data
  const featureImportanceData = [
    { feature: "Head-to-Head Record", importance: 0.18, color: "#3b82f6" },
    { feature: "Recent Form", importance: 0.16, color: "#8b5cf6" },
    { feature: "Home Advantage", importance: 0.14, color: "#10b981" },
    { feature: "Team Strength", importance: 0.12, color: "#f59e0b" },
    { feature: "Player Availability", importance: 0.1, color: "#ef4444" },
    { feature: "Toss Factor", importance: 0.09, color: "#06b6d4" },
    { feature: "Pitch Conditions", importance: 0.08, color: "#ec4899" },
    { feature: "Weather", importance: 0.07, color: "#6366f1" },
    { feature: "Tournament Stage", importance: 0.06, color: "#14b8a6" },
  ].sort((a, b) => b.importance - a.importance)

  // Sample feature correlation data
  const featureCorrelationData = [
    { feature: "Head-to-Head Record", win: 0.72, loss: 0.28 },
    { feature: "Recent Form", win: 0.68, loss: 0.32 },
    { feature: "Home Advantage", win: 0.65, loss: 0.35 },
    { feature: "Team Strength", win: 0.62, loss: 0.38 },
    { feature: "Player Availability", win: 0.58, loss: 0.42 },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Feature Importance</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureImportanceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" domain={[0, 0.2]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <YAxis type="category" dataKey="feature" width={150} />
                <Tooltip
                  formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Importance"]}
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {featureImportanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Feature Correlation with Win/Loss</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureCorrelationData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <YAxis type="category" dataKey="feature" width={150} />
                <Tooltip
                  formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Correlation"]}
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="win" name="Win Correlation" fill="#10b981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="loss" name="Loss Correlation" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
