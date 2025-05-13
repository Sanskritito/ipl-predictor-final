"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import Image from "next/image"

interface PlayerComparisonProps {
  teamA: string
  teamB: string
  theme: string
}

const placeholder = "/placeholder.svg?height=50&width=50"

export function PlayerComparison({ teamA, teamB, theme }: PlayerComparisonProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [teamA, teamB])

  // Get team-specific players based on selected team
  const getTeamPlayers = (team: string) => {
    // Hardcoded data for each team
    switch (team) {
      case "Royal Challengers Bangalore":
        return [
          { name: "Virat Kohli", role: "Batsman", impact: 92, img: placeholder },
          { name: "Faf du Plessis", role: "Batsman (Captain)", impact: 85, img: placeholder },
          { name: "Glenn Maxwell", role: "All-rounder", impact: 88, img: placeholder },
        ]
      case "Punjab Kings":
        return [
          { name: "Shikhar Dhawan", role: "Batsman", impact: 86, img: placeholder },
          { name: "Sam Curran", role: "All-rounder", impact: 83, img: placeholder },
          { name: "Arshdeep Singh", role: "Bowler", impact: 80, img: placeholder },
        ]
      case "Chennai Super Kings":
        return [
          { name: "MS Dhoni", role: "WK-Batsman", impact: 85, img: placeholder },
          { name: "Ravindra Jadeja", role: "All-rounder", impact: 82, img: placeholder },
          { name: "Ruturaj Gaikwad", role: "Batsman", impact: 78, img: placeholder },
        ]
      case "Mumbai Indians":
        return [
          { name: "Rohit Sharma", role: "Batsman (Captain)", impact: 88, img: placeholder },
          { name: "Jasprit Bumrah", role: "Bowler", impact: 90, img: placeholder },
          { name: "Suryakumar Yadav", role: "Batsman", impact: 86, img: placeholder },
        ]
      case "Kolkata Knight Riders":
        return [
          { name: "Shreyas Iyer", role: "Batsman (Captain)", impact: 84, img: placeholder },
          { name: "Andre Russell", role: "All-rounder", impact: 87, img: placeholder },
          { name: "Sunil Narine", role: "All-rounder", impact: 85, img: placeholder },
        ]
      case "Delhi Capitals":
        return [
          { name: "Rishabh Pant", role: "WK-Batsman (Captain)", impact: 86, img: placeholder },
          { name: "Axar Patel", role: "All-rounder", impact: 82, img: placeholder },
          { name: "Kuldeep Yadav", role: "Bowler", impact: 79, img: placeholder },
        ]
      case "Rajasthan Royals":
        return [
          { name: "Sanju Samson", role: "WK-Batsman (Captain)", impact: 83, img: placeholder },
          { name: "Jos Buttler", role: "WK-Batsman", impact: 89, img: placeholder },
          { name: "Yuzvendra Chahal", role: "Bowler", impact: 84, img: placeholder },
        ]
      case "Sunrisers Hyderabad":
        return [
          { name: "Kane Williamson", role: "Batsman", impact: 84, img: placeholder },
          { name: "Bhuvneshwar Kumar", role: "Bowler", impact: 82, img: placeholder },
          { name: "T Natarajan", role: "Bowler", impact: 80, img: placeholder },
        ]
      case "Gujarat Titans":
        return [
          { name: "Hardik Pandya", role: "All-rounder (Captain)", impact: 87, img: placeholder },
          { name: "Rashid Khan", role: "Bowler", impact: 89, img: placeholder },
          { name: "Shubman Gill", role: "Batsman", impact: 85, img: placeholder },
        ]
      case "Lucknow Super Giants":
        return [
          { name: "KL Rahul", role: "Batsman (Captain)", impact: 86, img: placeholder },
          { name: "Nicholas Pooran", role: "WK-Batsman", impact: 83, img: placeholder },
          { name: "Avesh Khan", role: "Bowler", impact: 81, img: placeholder },
        ]
      default:
        return [
          { name: "Player 1", role: "Batsman", impact: 80, img: placeholder },
          { name: "Player 2", role: "All-rounder", impact: 75, img: placeholder },
          { name: "Player 3", role: "Bowler", impact: 70, img: placeholder },
        ]
    }
  }

  const keyPlayersA = getTeamPlayers(teamA)
  const keyPlayersB = getTeamPlayers(teamB)

  // Adjust player comparison data based on teams
  const getPlayerComparisonData = () => {
    // Create team-specific data
    const teamAStrengths = {
      "Royal Challengers Bangalore": { batting: 95, bowling: 75, fielding: 82, experience: 90, form: 88 },
      "Chennai Super Kings": { batting: 88, bowling: 85, fielding: 80, experience: 92, form: 84 },
      "Mumbai Indians": { batting: 90, bowling: 88, fielding: 85, experience: 90, form: 82 },
      "Kolkata Knight Riders": { batting: 85, bowling: 87, fielding: 88, experience: 84, form: 86 },
      "Delhi Capitals": { batting: 86, bowling: 84, fielding: 82, experience: 80, form: 85 },
      "Punjab Kings": { batting: 88, bowling: 80, fielding: 78, experience: 80, form: 82 },
      "Rajasthan Royals": { batting: 87, bowling: 83, fielding: 80, experience: 82, form: 84 },
      "Sunrisers Hyderabad": { batting: 82, bowling: 88, fielding: 83, experience: 81, form: 80 },
      "Gujarat Titans": { batting: 84, bowling: 86, fielding: 85, experience: 82, form: 88 },
      "Lucknow Super Giants": { batting: 85, bowling: 84, fielding: 83, experience: 80, form: 86 },
    }

    const teamAData = teamAStrengths[teamA as keyof typeof teamAStrengths] || {
      batting: 85,
      bowling: 80,
      fielding: 80,
      experience: 80,
      form: 80,
    }

    const teamBData = teamAStrengths[teamB as keyof typeof teamAStrengths] || {
      batting: 85,
      bowling: 80,
      fielding: 80,
      experience: 80,
      form: 80,
    }

    return [
      { name: "Batting", playerA: teamAData.batting, playerB: teamBData.batting },
      { name: "Bowling", playerA: teamAData.bowling, playerB: teamBData.bowling },
      { name: "Fielding", playerA: teamAData.fielding, playerB: teamBData.fielding },
      { name: "Experience", playerA: teamAData.experience, playerB: teamBData.experience },
      { name: "Form", playerA: teamAData.form, playerB: teamBData.form },
    ]
  }

  const playerComparisonData = getPlayerComparisonData()

  // Adjust performance data based on teams
  const getPlayerPerformanceData = () => {
    // Create team-specific data
    const teamPerformance = {
      "Royal Challengers Bangalore": { runs: 580, strikeRate: 160, wickets: 8, economy: 8.5, catches: 9 },
      "Chennai Super Kings": { runs: 540, strikeRate: 150, wickets: 10, economy: 7.8, catches: 11 },
      "Mumbai Indians": { runs: 560, strikeRate: 155, wickets: 12, economy: 8.0, catches: 10 },
      "Kolkata Knight Riders": { runs: 520, strikeRate: 145, wickets: 14, economy: 7.5, catches: 12 },
      "Delhi Capitals": { runs: 530, strikeRate: 148, wickets: 11, economy: 7.9, catches: 9 },
      "Punjab Kings": { runs: 550, strikeRate: 158, wickets: 9, economy: 8.2, catches: 8 },
      "Rajasthan Royals": { runs: 540, strikeRate: 152, wickets: 10, economy: 8.1, catches: 10 },
      "Sunrisers Hyderabad": { runs: 510, strikeRate: 142, wickets: 15, economy: 7.4, catches: 11 },
      "Gujarat Titans": { runs: 530, strikeRate: 146, wickets: 13, economy: 7.6, catches: 12 },
      "Lucknow Super Giants": { runs: 540, strikeRate: 150, wickets: 12, economy: 7.8, catches: 10 },
    }

    const teamAData = teamPerformance[teamA as keyof typeof teamPerformance] || {
      runs: 520,
      strikeRate: 145,
      wickets: 10,
      economy: 8.0,
      catches: 10,
    }

    const teamBData = teamPerformance[teamB as keyof typeof teamPerformance] || {
      runs: 520,
      strikeRate: 145,
      wickets: 10,
      economy: 8.0,
      catches: 10,
    }

    return [
      { name: "Runs", playerA: teamAData.runs, playerB: teamBData.runs },
      { name: "Strike Rate", playerA: teamAData.strikeRate, playerB: teamBData.strikeRate },
      { name: "Wickets", playerA: teamAData.wickets, playerB: teamBData.wickets },
      { name: "Economy", playerA: teamAData.economy, playerB: teamBData.economy },
      { name: "Catches", playerA: teamAData.catches, playerB: teamBData.catches },
    ]
  }

  const playerPerformanceData = getPlayerPerformanceData()

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>
            {teamA || "Team A"} Key Players
          </h3>
          <div className="space-y-4">
            {keyPlayersA.map((player) => (
              <div
                key={player.name}
                className={`flex items-center p-3 rounded-lg ${
                  theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4">
                  <Image src={player.img || "/placeholder.svg"} alt={player.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{player.name}</h4>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{player.role}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  <span className="font-bold">{player.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>
            {teamB || "Team B"} Key Players
          </h3>
          <div className="space-y-4">
            {keyPlayersB.map((player) => (
              <div
                key={player.name}
                className={`flex items-center p-3 rounded-lg ${
                  theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4">
                  <Image src={player.img || "/placeholder.svg"} alt={player.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{player.name}</h4>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{player.role}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-purple-100 text-purple-700 border border-purple-200"
                  }`}
                >
                  <span className="font-bold">{player.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>
          Player Skill Comparison
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={playerComparisonData}>
              <PolarGrid stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
              <PolarAngleAxis dataKey="name" stroke={theme === "dark" ? "#e5e7eb" : "#374151"} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
              <Radar
                name={teamA || "Team A"}
                dataKey="playerA"
                stroke={theme === "dark" ? "#3b82f6" : "#2563eb"}
                fill={theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.2)"}
                fillOpacity={0.6}
              />
              <Radar
                name={teamB || "Team B"}
                dataKey="playerB"
                stroke={theme === "dark" ? "#8b5cf6" : "#7c3aed"}
                fill={theme === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(124, 58, 237, 0.2)"}
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>
          Player Performance Stats
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={playerPerformanceData}>
              <XAxis dataKey="name" stroke={theme === "dark" ? "#94a3b8" : "#64748b"} fontSize={12} />
              <YAxis stroke={theme === "dark" ? "#94a3b8" : "#64748b"} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
              />
              <Legend />
              <Bar
                dataKey="playerA"
                name={teamA || "Team A"}
                fill={theme === "dark" ? "#3b82f6" : "#2563eb"}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="playerB"
                name={teamB || "Team B"}
                fill={theme === "dark" ? "#8b5cf6" : "#7c3aed"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
