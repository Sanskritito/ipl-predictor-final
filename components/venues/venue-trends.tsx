"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

interface VenueTrendsProps {
  venue: string
}

export function VenueTrends({ venue }: VenueTrendsProps) {
  // Generate sample venue trend data based on the venue
  const getVenueTrendData = () => {
    const seasons = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"]

    // Base trend data
    const baseTrends = seasons.map((season) => ({
      season,
      avgScore: Math.floor(Math.random() * 20) + 160,
      battingFirstWin: Math.floor(Math.random() * 20) + 40,
      avgWickets: Math.floor(Math.random() * 2) + 6,
    }))

    // Customize based on venue
    if (venue.includes("Chinnaswamy")) {
      // Chinnaswamy is known for high scores
      baseTrends.forEach((item) => {
        item.avgScore += 15
        item.battingFirstWin -= 5
      })
    } else if (venue.includes("Chidambaram")) {
      // Chennai is known for spin-friendly conditions
      baseTrends.forEach((item) => {
        item.avgWickets += 1
        item.battingFirstWin += 8
      })
    } else if (venue.includes("Wankhede")) {
      // Wankhede favors chasing
      baseTrends.forEach((item) => {
        item.battingFirstWin -= 8
      })
    }

    return baseTrends
  }

  const trendData = getVenueTrendData()

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="season" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avgScore"
            name="Avg. Score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="battingFirstWin"
            name="Batting First Win %"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgWickets"
            name="Avg. Wickets"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
