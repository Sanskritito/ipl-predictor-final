"use client"

import { useState, useEffect } from "react"
import { getTeamLogo } from "@/lib/team-logos"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HeadToHeadTimelineProps {
  teamA: string
  teamB: string
  theme: string
}

export function HeadToHeadTimeline({ teamA, teamB, theme }: HeadToHeadTimelineProps) {
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null)
  const [matchData, setMatchData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setMatchData(getFallbackMatchData(teamA, teamB))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [teamA, teamB])

  // Fallback match data if API fails
  const getFallbackMatchData = (teamA: string, teamB: string) => {
    // RCB vs other team
    if (teamA === "Royal Challengers Bangalore" || teamB === "Royal Challengers Bangalore") {
      const rcbTeam = teamA === "Royal Challengers Bangalore" ? teamA : teamB
      const otherTeam = teamA === "Royal Challengers Bangalore" ? teamB : teamA

      return [
        {
          id: 1,
          date: "May 6, 2023",
          venue: "M. Chinnaswamy Stadium, Bangalore",
          winner: rcbTeam,
          scoreA: rcbTeam === teamA ? "192/3" : "165/8",
          scoreB: rcbTeam === teamB ? "192/3" : "165/8",
          motm: "Virat Kohli",
          highlights: ["Virat Kohli scored 100*(63)", "Glenn Maxwell scored 40(18)", "Dominant 27-run victory for RCB"],
        },
        {
          id: 2,
          date: "April 15, 2023",
          venue:
            otherTeam === "Punjab Kings" ? "Punjab Cricket Association Stadium, Mohali" : "Wankhede Stadium, Mumbai",
          winner: otherTeam,
          scoreA: rcbTeam === teamA ? "174/8" : "189/5",
          scoreB: rcbTeam === teamB ? "174/8" : "189/5",
          motm: otherTeam === "Punjab Kings" ? "Shikhar Dhawan" : "Rohit Sharma",
          highlights: [
            `${otherTeam === "Punjab Kings" ? "Shikhar Dhawan" : "Rohit Sharma"} scored 82(54)`,
            "Faf du Plessis scored 65(41)",
            `${otherTeam} won by 15 runs`,
          ],
        },
        {
          id: 3,
          date: "May 18, 2022",
          venue: "M. Chinnaswamy Stadium, Bangalore",
          winner: rcbTeam,
          scoreA: rcbTeam === teamA ? "207/4" : "176/6",
          scoreB: rcbTeam === teamB ? "207/4" : "176/6",
          motm: "Glenn Maxwell",
          highlights: ["Glenn Maxwell scored 95(46)", "Virat Kohli scored 50(34)", "RCB won by 31 runs"],
        },
        {
          id: 4,
          date: "April 23, 2022",
          venue: otherTeam === "Punjab Kings" ? "Punjab Cricket Association Stadium, Mohali" : "Eden Gardens, Kolkata",
          winner: otherTeam,
          scoreA: rcbTeam === teamA ? "152/7" : "165/4",
          scoreB: rcbTeam === teamB ? "152/7" : "165/4",
          motm: otherTeam === "Punjab Kings" ? "Arshdeep Singh" : "Andre Russell",
          highlights: [
            `${otherTeam === "Punjab Kings" ? "Arshdeep Singh" : "Andre Russell"} took 4 wickets`,
            "Dinesh Karthik scored 45*(26)",
            `${otherTeam} won by 13 runs`,
          ],
        },
        {
          id: 5,
          date: "October 3, 2021",
          venue: "Dubai International Stadium",
          winner: rcbTeam,
          scoreA: rcbTeam === teamA ? "164/7" : "145/8",
          scoreB: rcbTeam === teamB ? "164/7" : "145/8",
          motm: "Harshal Patel",
          highlights: ["Harshal Patel took 3 wickets", "Glenn Maxwell scored 57(33)", "RCB won by 19 runs"],
        },
      ]
    }

    // CSK vs MI rivalry
    if (
      (teamA === "Chennai Super Kings" && teamB === "Mumbai Indians") ||
      (teamB === "Chennai Super Kings" && teamA === "Mumbai Indians")
    ) {
      const cskTeam = teamA === "Chennai Super Kings" ? teamA : teamB
      const miTeam = teamA === "Mumbai Indians" ? teamA : teamB

      return [
        {
          id: 1,
          date: "May 12, 2023",
          venue: "Wankhede Stadium, Mumbai",
          winner: miTeam,
          scoreA: cskTeam === teamA ? "182/7" : "198/5",
          scoreB: cskTeam === teamB ? "182/7" : "198/5",
          motm: "Rohit Sharma",
          highlights: ["Rohit Sharma scored 87(49)", "Jasprit Bumrah took 3 wickets", "MI won by 16 runs"],
        },
        {
          id: 2,
          date: "April 8, 2023",
          venue: "MA Chidambaram Stadium, Chennai",
          winner: cskTeam,
          scoreA: cskTeam === teamA ? "196/4" : "184/8",
          scoreB: cskTeam === teamB ? "196/4" : "184/8",
          motm: "MS Dhoni",
          highlights: ["MS Dhoni scored 37*(18)", "Ravindra Jadeja took 3 wickets", "CSK won by 12 runs"],
        },
        {
          id: 3,
          date: "May 12, 2022",
          venue: "Wankhede Stadium, Mumbai",
          winner: miTeam,
          scoreA: cskTeam === teamA ? "168/6" : "176/5",
          scoreB: cskTeam === teamB ? "168/6" : "176/5",
          motm: "Jasprit Bumrah",
          highlights: ["Jasprit Bumrah took 4 wickets", "Suryakumar Yadav scored 65(40)", "MI won by 8 runs"],
        },
        {
          id: 4,
          date: "April 21, 2022",
          venue: "MA Chidambaram Stadium, Chennai",
          winner: cskTeam,
          scoreA: cskTeam === teamA ? "187/4" : "172/9",
          scoreB: cskTeam === teamB ? "187/4" : "172/9",
          motm: "Ruturaj Gaikwad",
          highlights: ["Ruturaj Gaikwad scored 88(58)", "Deepak Chahar took 3 wickets", "CSK won by 15 runs"],
        },
        {
          id: 5,
          date: "October 15, 2021",
          venue: "Dubai International Stadium",
          winner: cskTeam,
          scoreA: cskTeam === teamA ? "192/3" : "186/8",
          scoreB: cskTeam === teamB ? "192/3" : "186/8",
          motm: "Faf du Plessis",
          highlights: ["Faf du Plessis scored 86(59)", "Shardul Thakur took 3 wickets", "CSK won by 6 runs"],
        },
      ]
    }

    // Default match data for other team combinations
    return [
      {
        id: 1,
        date: "May 12, 2023",
        venue: "Wankhede Stadium, Mumbai",
        winner: teamA,
        scoreA: "204/5",
        scoreB: "189/8",
        motm: "Player from " + teamA,
        highlights: [`Star player from ${teamA} scored 87(49)`, "Key bowler took 3 wickets", `${teamA} won by 15 runs`],
      },
      {
        id: 2,
        date: "April 25, 2023",
        venue: "M. Chinnaswamy Stadium, Bangalore",
        winner: teamB,
        scoreA: "176/6",
        scoreB: "179/3",
        motm: "Player from " + teamB,
        highlights: [
          `Star player from ${teamB} scored 82(45)`,
          "Key all-rounder scored 56(32)",
          `${teamB} won with 5 balls to spare`,
        ],
      },
      {
        id: 3,
        date: "October 10, 2022",
        venue: "Dubai International Stadium",
        winner: teamA,
        scoreA: "192/3",
        scoreB: "165/9",
        motm: "Player from " + teamA,
        highlights: [
          `Star player from ${teamA} scored 101(60)`,
          "Key bowler took 4 wickets",
          `${teamA} won by 27 runs`,
        ],
      },
      {
        id: 4,
        date: "April 18, 2022",
        venue: "Wankhede Stadium, Mumbai",
        winner: teamB,
        scoreA: "156/7",
        scoreB: "157/4",
        motm: "Player from " + teamB,
        highlights: [
          `Star player from ${teamB} took 3 wickets`,
          "Key batsman scored 48*(27)",
          `${teamB} won with 6 balls to spare`,
        ],
      },
      {
        id: 5,
        date: "October 25, 2021",
        venue: "Dubai International Stadium",
        winner: teamA,
        scoreA: "167/5",
        scoreB: "147/8",
        motm: "Player from " + teamA,
        highlights: [
          `Star player from ${teamA} took 3 wickets`,
          "Key batsman scored 61(54)",
          `${teamA} won by 20 runs`,
        ],
      },
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
    <div className="space-y-6">
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
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Last 5 Matches</div>
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

      <div className="space-y-4">
        {matchData.length > 0 ? (
          matchData.map((match) => (
            <div
              key={match.id}
              className={`rounded-lg overflow-hidden ${
                theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              <div
                className={`p-4 cursor-pointer ${
                  match.winner === teamA
                    ? theme === "dark"
                      ? "bg-blue-500/20"
                      : "bg-blue-50"
                    : theme === "dark"
                      ? "bg-purple-500/20"
                      : "bg-purple-50"
                }`}
                onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 relative mr-3">
                      <Image
                        src={getTeamLogo(match.winner) || "/placeholder.svg?height=40&width=40"}
                        alt={match.winner}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{match.date}</div>
                      <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        {match.venue}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">
                      {match.scoreA} vs {match.scoreB}
                    </div>
                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {match.winner} won
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      expandedMatch === match.id ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedMatch === match.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="mb-3">
                        <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          Player of the Match:
                        </span>{" "}
                        <span className="font-bold">{match.motm}</span>
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Highlights:
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-sm">
                          {match.highlights.map((highlight: string, index: number) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className={`text-center p-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            No match history found between these teams.
          </div>
        )}
      </div>
    </div>
  )
}
