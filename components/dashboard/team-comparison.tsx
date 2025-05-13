"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "CSK",
    winRate: 62,
    avgScore: 175,
    avgWickets: 6.2,
  },
  {
    name: "MI",
    winRate: 60,
    avgScore: 178,
    avgWickets: 6.8,
  },
  {
    name: "RCB",
    winRate: 48,
    avgScore: 182,
    avgWickets: 5.9,
  },
  {
    name: "KKR",
    winRate: 52,
    avgScore: 168,
    avgWickets: 7.1,
  },
  {
    name: "DC",
    winRate: 45,
    avgScore: 165,
    avgWickets: 6.5,
  },
  {
    name: "PBKS",
    winRate: 42,
    avgScore: 172,
    avgWickets: 6.3,
  },
  {
    name: "RR",
    winRate: 50,
    avgScore: 170,
    avgWickets: 6.7,
  },
  {
    name: "SRH",
    winRate: 47,
    avgScore: 167,
    avgWickets: 6.4,
  },
]

export function TeamComparison() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="winRate" name="Win Rate (%)" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="avgScore" name="Avg. Score" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
