"use client"

import { useState, useEffect } from "react"
import { getTeamLogo } from "@/lib/team-logos"
import Image from "next/image"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts"

interface TeamTrendsProps {
  teamA: string
  teamB: string
  theme: string
}

export function TeamTrends({ teamA, teamB, theme }: TeamTrendsProps) {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<any[]>([])
  const [performanceData, setPerformanceData] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setFormData(generateFormData(teamA, teamB))
      setPerformanceData(generatePerformanceData(teamA, teamB))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [teamA, teamB])

  // Generate form data for both teams
  const generateFormData = (teamA: string, teamB: string) => {
    const seasons = ["2019", "2020", "2021", "2022", "2023", "2024"]

    // Team-specific win rates
    const teamWinRates: Record<string, number[]> = {
      "Royal Challengers Bangalore": [45, 50, 55, 60, 58, 62],
      "Chennai Super Kings": [65, 60, 58, 55, 62, 64],
      "Mumbai Indians": [68, 65, 60, 55, 52, 58],
      "Kolkata Knight Riders": [50, 48, 52, 55, 58, 60],
      "Delhi Capitals": [52, 55, 58, 54, 50, 52],
      "Punjab Kings": [45, 48, 50, 48, 52, 50],
      "Rajasthan Royals": [48, 50, 52, 55, 58, 56],
      "Sunrisers Hyderabad": [55, 52, 50, 48, 52, 54],
      "Gujarat Titans": [0, 0, 0, 65, 62, 60],
      "Lucknow Super Giants": [0, 0, 0, 60, 58, 56],
    }

    // Get win rates for selected teams or use default values
    const teamAWinRates = teamWinRates[teamA] || [50, 52, 54, 56, 58, 60]
    const teamBWinRates = teamWinRates[teamB] || [50, 52, 54, 56, 58, 60]

    return seasons.map((season, index) => ({
      season,
      [teamA]: teamAWinRates[index],
      [teamB]: teamBWinRates[index],
    }))
  }

  // Generate performance data for both teams
  const generatePerformanceData = (teamA: string, teamB: string) => {
    // Team-specific performance metrics
    const teamMetrics: Record<string, { avgScore: number; powerplay: number; deathOvers: number }> = {
      "Royal Challengers Bangalore": { avgScore: 185, powerplay: 55, deathOvers: 52 },
      "Chennai Super Kings": { avgScore: 175, powerplay: 52, deathOvers: 48 },
      "Mumbai Indians": { avgScore: 178, powerplay: 54, deathOvers: 50 },
      "Kolkata Knight Riders": { avgScore: 172, powerplay: 50, deathOvers: 46 },
      "Delhi Capitals": { avgScore: 170, powerplay: 51, deathOvers: 45 },
      "Punjab Kings": { avgScore: 182, powerplay: 60, deathOvers: 45 },
      "Rajasthan Royals": { avgScore: 174, powerplay: 53, deathOvers: 47 },
      "Sunrisers Hyderabad": { avgScore: 168, powerplay: 48, deathOvers: 44 },
      "Gujarat Titans": { avgScore: 172, powerplay: 50, deathOvers: 48 },
      "Lucknow Super Giants": { avgScore: 174, powerplay: 52, deathOvers: 47 },
    }

    // Get metrics for selected teams or use default values
    const teamAMetrics = teamMetrics[teamA] || { avgScore: 175, powerplay: 52, deathOvers: 48 }
    const teamBMetrics = teamMetrics[teamB] || { avgScore: 175, powerplay: 52, deathOvers: 48 }

    return [
      { name: "Average Score", [teamA]: teamAMetrics.avgScore, [teamB]: teamBMetrics.avgScore },
      { name: "Powerplay Avg", [teamA]: teamAMetrics.powerplay, [teamB]: teamBMetrics.powerplay },
      { name: "Death Overs Avg", [teamA]: teamAMetrics.deathOvers, [teamB]: teamBMetrics.deathOvers },
    ]
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 relative mr-3">
            <Image
              src={getTeamLogo(teamA) || "/placeholder.svg?height=64&width=64"}
              alt={teamA || "Team A"}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-bold text-lg">{teamA || "Team A"}</h3>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">VS</div>
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Team Trends</div>
        </div>
        <div className="flex items-center">
          <h3 className="font-bold text-lg text-right">{teamB || "Team B"}</h3>
          <div className="w-16 h-16 relative ml-3">
            <Image
              src={getTeamLogo(teamB) || "/placeholder.svg?height=64&width=64"}
              alt={teamB || "Team B"}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>Win Rate Trends</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="season" />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value) => [`${value}%`]}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={teamA}
                name={teamA}
                stroke={theme === "dark" ? "#3b82f6" : "#2563eb"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey={teamB}
                name={teamB}
                stroke={theme === "dark" ? "#8b5cf6" : "#7c3aed"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>
          Performance Comparison
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Legend />
              <Bar dataKey={teamA} name={teamA} fill={theme === "dark" ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
              <Bar dataKey={teamB} name={teamB} fill={theme === "dark" ? "#8b5cf6" : "#7c3aed"} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
