"use client"

import { motion } from "framer-motion"
import { Trophy } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

interface PredictionResultProps {
  teamA: string
  teamB: string
  result?: any
  teamLogos?: Record<string, string>
}

export function PredictionResult({ teamA, teamB, result, teamLogos = {} }: PredictionResultProps) {
  // Use the result from the prediction if available, otherwise use default values
  const winner = result?.winner || teamA
  const probability = result?.probability || 68
  const loser = winner === teamA ? teamB : teamA

  // Add error handling for images
  const [teamALogoError, setTeamALogoError] = useState(false)
  const [teamBLogoError, setTeamBLogoError] = useState(false)
  const [winnerLogoError, setWinnerLogoError] = useState(false)

  // Get logo paths with fallbacks
  const getTeamLogo = (team: string) => {
    return teamLogos[team] || `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(team + " logo")}`
  }

  const teamALogo = getTeamLogo(teamA)
  const teamBLogo = getTeamLogo(teamB)
  const winnerLogo = getTeamLogo(winner)

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Prediction Result</h3>
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white shadow-md">
            <Image
              src={
                winnerLogoError
                  ? `/placeholder.svg?height=96&width=96&query=${encodeURIComponent(winner + " logo")}`
                  : winnerLogo
              }
              alt={winner}
              fill
              priority
              unoptimized={winner === "Gujarat Titans" || winner === "Kolkata Knight Riders"}
              className="object-contain p-1 brightness-110 contrast-110"
              onError={() => setWinnerLogoError(true)}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold">{winner}</h2>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-primary">{probability}% Win Probability</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="my-6 h-2 w-full rounded-full bg-muted"
        >
          <div className="h-2 rounded-full bg-primary" style={{ width: `${probability}%` }}></div>
        </motion.div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-md">
              <Image
                src={
                  teamALogoError
                    ? `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(teamA + " logo")}`
                    : teamALogo
                }
                alt={teamA}
                fill
                priority
                unoptimized={teamA === "Gujarat Titans" || teamA === "Kolkata Knight Riders"}
                className="object-contain p-1 brightness-110 contrast-110"
                onError={() => setTeamALogoError(true)}
              />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{winner === teamA ? probability : 100 - probability}%</div>
              <div className="text-sm text-muted-foreground">{teamA}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="text-lg font-semibold">{winner === teamB ? probability : 100 - probability}%</div>
              <div className="text-sm text-muted-foreground">{teamB}</div>
            </div>
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-md">
              <Image
                src={
                  teamBLogoError
                    ? `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(teamB + " logo")}`
                    : teamBLogo
                }
                alt={teamB}
                fill
                priority
                unoptimized={teamB === "Gujarat Titans" || teamB === "Kolkata Knight Riders"}
                className="object-contain p-1 brightness-110 contrast-110"
                onError={() => setTeamBLogoError(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
