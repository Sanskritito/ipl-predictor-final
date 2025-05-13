"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface VenuePerformanceProps {
  venue: string
}

export function VenuePerformance({ venue }: VenuePerformanceProps) {
  // Generate sample data based on venue
  const generateData = () => {
    const teams = ["CSK", "MI", "RCB", "KKR", "DC", "PBKS", "RR", "SRH"]

    return teams
      .map((team) => {
        const matches = Math.floor(Math.random() * 15) + 5
        const wins = Math.floor(Math.random() * matches)
        return {
          name: team,
          matches,
          wins,
          winRate: Math.round((wins / matches) * 100),
        }
      })
      .sort((a, b) => b.winRate - a.winRate)
  }

  const data = generateData()

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="matches" name="Matches Played" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="wins" name="Matches Won" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="winRate" name="Win Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
