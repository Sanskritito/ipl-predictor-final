"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface FeatureImportanceProps {
  featureData?: Array<{ feature: string; importance: number }>
}

export function FeatureImportance({ featureData }: FeatureImportanceProps) {
  // Use the provided feature data or fallback to default data
  const data = featureData || [
    {
      feature: "Head to Head",
      importance: 25,
    },
    {
      feature: "Venue Advantage",
      importance: 20,
    },
    {
      feature: "Recent Form",
      importance: 18,
    },
    {
      feature: "Team Strength",
      importance: 15,
    },
    {
      feature: "Toss Factor",
      importance: 12,
    },
    {
      feature: "Player Availability",
      importance: 10,
    },
  ]

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Feature Importance</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
            <XAxis type="number" domain={[0, 30]} />
            <YAxis type="category" dataKey="feature" width={100} />
            <Tooltip
              formatter={(value) => [`${value}%`, "Importance"]}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="importance"
              radius={[0, 4, 4, 0]}
              fill="#3b82f6"
              label={{ position: "right", formatter: (value) => `${value}%` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
