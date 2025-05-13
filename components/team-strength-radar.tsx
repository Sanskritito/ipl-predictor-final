"use client"
import { useEffect, useState } from "react"
import { getTeamLogo } from "@/lib/team-logos"
import Image from "next/image"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

interface TeamStrengthRadarProps {
  teamA: string
  teamB: string
  theme: string
}

export function TeamStrengthRadar({ teamA, teamB, theme }: TeamStrengthRadarProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [teamA, teamB])

  // Get team-specific performance data
  const getTeamPerformanceData = (team: string) => {
    const teamData = {
      "Royal Challengers Bangalore": {
        wins: 62,
        losses: 38,
        nrr: 0.45,
        avgScore: 185,
        powerplayAvg: 55,
        deathOversAvg: 52,
      },
      "Chennai Super Kings": {
        wins: 65,
        losses: 35,
        nrr: 0.58,
        avgScore: 175,
        powerplayAvg: 52,
        deathOversAvg: 48,
      },
      "Mumbai Indians": {
        wins: 66,
        losses: 34,
        nrr: 0.6,
        avgScore: 178,
        powerplayAvg: 54,
        deathOversAvg: 50,
      },
      "Kolkata Knight Riders": {
        wins: 60,
        losses: 40,
        nrr: 0.42,
        avgScore: 172,
        powerplayAvg: 50,
        deathOversAvg: 46,
      },
      "Delhi Capitals": {
        wins: 58,
        losses: 42,
        nrr: 0.38,
        avgScore: 170,
        powerplayAvg: 51,
        deathOversAvg: 45,
      },
      "Punjab Kings": {
        wins: 58,
        losses: 42,
        nrr: 0.32,
        avgScore: 182,
        powerplayAvg: 60,
        deathOversAvg: 45,
      },
      "Rajasthan Royals": {
        wins: 59,
        losses: 41,
        nrr: 0.35,
        avgScore: 174,
        powerplayAvg: 53,
        deathOversAvg: 47,
      },
      "Sunrisers Hyderabad": {
        wins: 61,
        losses: 39,
        nrr: 0.4,
        avgScore: 168,
        powerplayAvg: 48,
        deathOversAvg: 44,
      },
      "Gujarat Titans": {
        wins: 63,
        losses: 37,
        nrr: 0.5,
        avgScore: 172,
        powerplayAvg: 50,
        deathOversAvg: 48,
      },
      "Lucknow Super Giants": {
        wins: 62,
        losses: 38,
        nrr: 0.48,
        avgScore: 174,
        powerplayAvg: 52,
        deathOversAvg: 47,
      },
    }

    return (
      teamData[team as keyof typeof teamData] || {
        wins: 60,
        losses: 40,
        nrr: 0.4,
        avgScore: 170,
        powerplayAvg: 50,
        deathOversAvg: 45,
      }
    )
  }

  const teamPerformanceData = {
    teamA: getTeamPerformanceData(teamA),
    teamB: getTeamPerformanceData(teamB),
  }

  // Get team-specific strength data
  const getTeamStrengthData = () => {
    const teamStrengths = {
      "Royal Challengers Bangalore": {
        batting: 95,
        bowling: 78,
        fielding: 85,
        powerHitting: 92,
        spinBowling: 80,
        paceBowling: 75,
        teamBalance: 82,
        experience: 90,
      },
      "Chennai Super Kings": {
        batting: 88,
        bowling: 88,
        fielding: 90,
        powerHitting: 85,
        spinBowling: 90,
        paceBowling: 82,
        teamBalance: 88,
        experience: 92,
      },
      "Mumbai Indians": {
        batting: 90,
        bowling: 85,
        fielding: 82,
        powerHitting: 88,
        spinBowling: 78,
        paceBowling: 90,
        teamBalance: 85,
        experience: 88,
      },
      "Kolkata Knight Riders": {
        batting: 85,
        bowling: 86,
        fielding: 84,
        powerHitting: 86,
        spinBowling: 92,
        paceBowling: 80,
        teamBalance: 84,
        experience: 85,
      },
      "Delhi Capitals": {
        batting: 86,
        bowling: 84,
        fielding: 82,
        powerHitting: 84,
        spinBowling: 80,
        paceBowling: 85,
        teamBalance: 83,
        experience: 82,
      },
      "Punjab Kings": {
        batting: 88,
        bowling: 80,
        fielding: 78,
        powerHitting: 90,
        spinBowling: 75,
        paceBowling: 88,
        teamBalance: 82,
        experience: 80,
      },
      "Rajasthan Royals": {
        batting: 87,
        bowling: 83,
        fielding: 80,
        powerHitting: 85,
        spinBowling: 86,
        paceBowling: 80,
        teamBalance: 82,
        experience: 83,
      },
      "Sunrisers Hyderabad": {
        batting: 82,
        bowling: 88,
        fielding: 83,
        powerHitting: 80,
        spinBowling: 85,
        paceBowling: 90,
        teamBalance: 84,
        experience: 81,
      },
      "Gujarat Titans": {
        batting: 84,
        bowling: 86,
        fielding: 85,
        powerHitting: 82,
        spinBowling: 84,
        paceBowling: 88,
        teamBalance: 86,
        experience: 83,
      },
      "Lucknow Super Giants": {
        batting: 85,
        bowling: 84,
        fielding: 83,
        powerHitting: 86,
        spinBowling: 82,
        paceBowling: 85,
        teamBalance: 84,
        experience: 80,
      },
    }

    const teamAData = teamStrengths[teamA as keyof typeof teamStrengths] || {
      batting: 85,
      bowling: 80,
      fielding: 80,
      powerHitting: 80,
      spinBowling: 80,
      paceBowling: 80,
      teamBalance: 80,
      experience: 80,
    }

    const teamBData = teamStrengths[teamB as keyof typeof teamStrengths] || {
      batting: 85,
      bowling: 80,
      fielding: 80,
      powerHitting: 80,
      spinBowling: 80,
      paceBowling: 80,
      teamBalance: 80,
      experience: 80,
    }

    return [
      { attribute: "Batting", teamA: teamAData.batting, teamB: teamBData.batting },
      { attribute: "Bowling", teamA: teamAData.bowling, teamB: teamBData.bowling },
      { attribute: "Fielding", teamA: teamAData.fielding, teamB: teamBData.fielding },
      { attribute: "Power Hitting", teamA: teamAData.powerHitting, teamB: teamBData.powerHitting },
      { attribute: "Spin Bowling", teamA: teamAData.spinBowling, teamB: teamBData.spinBowling },
      { attribute: "Pace Bowling", teamA: teamAData.paceBowling, teamB: teamBData.paceBowling },
      { attribute: "Team Balance", teamA: teamAData.teamBalance, teamB: teamBData.teamBalance },
      { attribute: "Experience", teamA: teamAData.experience, teamB: teamBData.experience },
    ]
  }

  const teamStrengthData = getTeamStrengthData()

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
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
            <div>
              <h3 className="font-bold text-lg">{teamA || "Team A"}</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Win Rate: {teamPerformanceData.teamA.wins}%
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">VS</div>
          </div>
          <div className="flex items-center">
            <div>
              <h3 className="font-bold text-lg text-right">{teamB || "Team B"}</h3>
              <p className={`text-sm text-right ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Win Rate: {teamPerformanceData.teamB.wins}%
              </p>
            </div>
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

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={teamStrengthData}>
              <PolarGrid stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
              <PolarAngleAxis dataKey="attribute" stroke={theme === "dark" ? "#e5e7eb" : "#374151"} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
              <Radar
                name={teamA}
                dataKey="teamA"
                stroke={theme === "dark" ? "#3b82f6" : "#2563eb"}
                fill={theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.2)"}
                fillOpacity={0.6}
              />
              <Radar
                name={teamB}
                dataKey="teamB"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`p-4 rounded-lg ${
            theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>{teamA} Performance</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Score</span>
                <span className="font-medium">{teamPerformanceData.teamA.avgScore}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamA.avgScore / 200) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Powerplay Average</span>
                <span className="font-medium">{teamPerformanceData.teamA.powerplayAvg}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamA.powerplayAvg / 60) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Death Overs Average</span>
                <span className="font-medium">{teamPerformanceData.teamA.deathOversAvg}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamA.deathOversAvg / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "" : "text-gray-800"}`}>{teamB} Performance</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Score</span>
                <span className="font-medium">{teamPerformanceData.teamB.avgScore}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamB.avgScore / 200) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Powerplay Average</span>
                <span className="font-medium">{teamPerformanceData.teamB.powerplayAvg}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamB.powerplayAvg / 60) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Death Overs Average</span>
                <span className="font-medium">{teamPerformanceData.teamB.deathOversAvg}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: `${(teamPerformanceData.teamB.deathOversAvg / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
