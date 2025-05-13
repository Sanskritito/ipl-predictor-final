"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "ML Model",
    winProbability: 65,
    confidence: 72,
    color: "#3b82f6",
  },
  {
    name: "Deep Learning",
    winProbability: 68,
    confidence: 78,
    color: "#8b5cf6",
  },
]

export function ModelComparison() {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Model Comparison</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value) => [`${value}%`]}
              contentStyle={{
                borderRadius: "0.5rem",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar dataKey="winProbability" name="Win Probability" radius={[4, 4, 0, 0]} fill="#3b82f6" />
            <Bar dataKey="confidence" name="Confidence" radius={[4, 4, 0, 0]} fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
