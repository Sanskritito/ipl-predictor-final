"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface HistoricalMatchupsProps {
  teamA: string
  teamB: string
}

export function HistoricalMatchups({ teamA, teamB }: HistoricalMatchupsProps) {
  // Generate some sample data based on the teams
  const generateData = () => {
    const seasons = ["2019", "2020", "2021", "2022", "2023", "2024"]
    return seasons.map((season) => {
      const teamAWins = Math.floor(Math.random() * 3)
      const teamBWins = Math.floor(Math.random() * 3)
      return {
        season,
        [teamA]: teamAWins,
        [teamB]: teamBWins,
      }
    })
  }

  const data = generateData()

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Historical Matchups</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="season" />
            <YAxis domain={[0, 3]} />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey={teamA}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey={teamB}
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#3b82f6]"></div>
          <span className="text-sm">{teamA}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#8b5cf6]"></div>
          <span className="text-sm">{teamB}</span>
        </div>
      </div>
    </div>
  )
}
