"use server"

import { getAllMatches } from "./data-fetcher"

type PredictionInput = {
  team1: string
  team2: string
  tossWinner: string
  tossDecision: string
  venue: string
}

type TeamStats = {
  totalMatches: number
  wins: number
  tossWins: number
  tossWinAndMatchWin: number
  venueMatches: Map<string, number>
  venueWins: Map<string, number>
  headToHead: Map<string, { played: number; won: number }>
  recentForm: number // Win percentage in last 10 matches
}

// Cache for team statistics
let teamStatsCache: Map<string, TeamStats> | null = null

async function buildTeamStats(): Promise<Map<string, TeamStats>> {
  if (teamStatsCache) {
    return teamStatsCache
  }

  const matches = await getAllMatches()
  const teamStats = new Map<string, TeamStats>()

  // Initialize team stats
  const allTeams = new Set<string>()
  matches.forEach((match) => {
    allTeams.add(match.Team1)
    allTeams.add(match.Team2)
    if (match.WinningTeam) allTeams.add(match.WinningTeam)
  })

  allTeams.forEach((team) => {
    if (team) {
      teamStats.set(team, {
        totalMatches: 0,
        wins: 0,
        tossWins: 0,
        tossWinAndMatchWin: 0,
        venueMatches: new Map(),
        venueWins: new Map(),
        headToHead: new Map(),
        recentForm: 0,
      })
    }
  })

  // Calculate stats
  matches.forEach((match) => {
    const team1 = match.Team1
    const team2 = match.Team2
    const winner = match.WinningTeam
    const tossWinner = match.TossWinner
    const venue = match.Venue

    // Skip matches without a winner
    if (!winner) return

    // Update team1 stats
    if (team1) {
      const team1Stats = teamStats.get(team1)!
      team1Stats.totalMatches++

      if (winner === team1) {
        team1Stats.wins++
      }

      if (tossWinner === team1) {
        team1Stats.tossWins++
        if (winner === team1) {
          team1Stats.tossWinAndMatchWin++
        }
      }

      // Venue stats
      team1Stats.venueMatches.set(venue, (team1Stats.venueMatches.get(venue) || 0) + 1)
      if (winner === team1) {
        team1Stats.venueWins.set(venue, (team1Stats.venueWins.get(venue) || 0) + 1)
      }

      // Head to head
      if (!team1Stats.headToHead.has(team2)) {
        team1Stats.headToHead.set(team2, { played: 0, won: 0 })
      }
      const h2h = team1Stats.headToHead.get(team2)!
      h2h.played++
      if (winner === team1) {
        h2h.won++
      }
    }

    // Update team2 stats
    if (team2) {
      const team2Stats = teamStats.get(team2)!
      team2Stats.totalMatches++

      if (winner === team2) {
        team2Stats.wins++
      }

      if (tossWinner === team2) {
        team2Stats.tossWins++
        if (winner === team2) {
          team2Stats.tossWinAndMatchWin++
        }
      }

      // Venue stats
      team2Stats.venueMatches.set(venue, (team2Stats.venueMatches.get(venue) || 0) + 1)
      if (winner === team2) {
        team2Stats.venueWins.set(venue, (team2Stats.venueWins.get(venue) || 0) + 1)
      }

      // Head to head
      if (!team2Stats.headToHead.has(team1)) {
        team2Stats.headToHead.set(team1, { played: 0, won: 0 })
      }
      const h2h = team2Stats.headToHead.get(team1)!
      h2h.played++
      if (winner === team2) {
        h2h.won++
      }
    }
  })

  // Calculate recent form for each team
  for (const [teamName, stats] of teamStats.entries()) {
    // Sort matches by date (most recent first)
    const sortedMatches = [...matches].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

    // Get last 10 matches for this team
    const recentMatches = sortedMatches
      .filter((match) => match.Team1 === teamName || match.Team2 === teamName)
      .slice(0, 10)

    // Calculate win percentage
    const recentWins = recentMatches.filter((match) => match.WinningTeam === teamName).length
    stats.recentForm = recentMatches.length > 0 ? recentWins / recentMatches.length : 0
  }

  teamStatsCache = teamStats
  return teamStats
}

export async function enhancedPredictMatchWinner(input: PredictionInput) {
  const { team1, team2, tossWinner, tossDecision, venue } = input

  // Build team stats if not already cached
  const teamStats = await buildTeamStats()

  // Get stats for both teams
  const team1Stats = teamStats.get(team1)
  const team2Stats = teamStats.get(team2)

  if (!team1Stats || !team2Stats) {
    throw new Error("Team stats not found")
  }

  // Calculate features

  // 1. Overall win rate
  const team1WinRate = team1Stats.wins / team1Stats.totalMatches
  const team2WinRate = team2Stats.wins / team2Stats.totalMatches

  // 2. Toss advantage
  const team1TossWinRate = team1Stats.tossWinAndMatchWin / team1Stats.tossWins || 0
  const team2TossWinRate = team2Stats.tossWinAndMatchWin / team2Stats.tossWins || 0

  // 3. Venue performance
  const team1VenueWinRate = (team1Stats.venueWins.get(venue) || 0) / (team1Stats.venueMatches.get(venue) || 1)
  const team2VenueWinRate = (team2Stats.venueWins.get(venue) || 0) / (team2Stats.venueMatches.get(venue) || 1)

  // 4. Head to head
  const team1H2H = team1Stats.headToHead.get(team2)
  const team2H2H = team2Stats.headToHead.get(team1)

  const team1H2HWinRate = team1H2H ? team1H2H.won / team1H2H.played : 0.5
  const team2H2HWinRate = team2H2H ? team2H2H.won / team2H2H.played : 0.5

  // 5. Recent form
  const team1RecentForm = team1Stats.recentForm
  const team2RecentForm = team2Stats.recentForm

  // 6. Toss decision factor (batting first vs fielding first)
  const tossDecisionFactor = tossDecision === "bat" ? 0.48 : 0.52 // Slight advantage to fielding first

  // Feature weights (these would normally be learned by the model)
  const weights = {
    overallWinRate: 0.15,
    tossAdvantage: 0.15,
    venuePerformance: 0.2,
    headToHead: 0.25,
    recentForm: 0.15,
    tossDecision: 0.1,
  }

  // Calculate scores for each team
  let team1Score =
    team1WinRate * weights.overallWinRate +
    (tossWinner === team1 ? team1TossWinRate * weights.tossAdvantage : 0) +
    team1VenueWinRate * weights.venuePerformance +
    team1H2HWinRate * weights.headToHead +
    team1RecentForm * weights.recentForm +
    (tossWinner === team1 ? tossDecisionFactor * weights.tossDecision : 0)

  let team2Score =
    team2WinRate * weights.overallWinRate +
    (tossWinner === team2 ? team2TossWinRate * weights.tossAdvantage : 0) +
    team2VenueWinRate * weights.venuePerformance +
    team2H2HWinRate * weights.headToHead +
    team2RecentForm * weights.recentForm +
    (tossWinner === team2 ? tossDecisionFactor * weights.tossDecision : 0)

  // Add a small random factor to simulate model uncertainty
  team1Score += Math.random() * 0.05
  team2Score += Math.random() * 0.05

  // Determine winner and probability
  const totalScore = team1Score + team2Score
  const team1Probability = Math.round((team1Score / totalScore) * 100)
  const team2Probability = Math.round((team2Score / totalScore) * 100)

  const winner = team1Probability > team2Probability ? team1 : team2
  const winProbability = winner === team1 ? team1Probability : team2Probability

  // Calculate feature importance for visualization
  const featureImportance = [
    {
      feature: "Head to Head",
      importance: Math.round(weights.headToHead * 100),
    },
    {
      feature: "Venue Advantage",
      importance: Math.round(weights.venuePerformance * 100),
    },
    {
      feature: "Recent Form",
      importance: Math.round(weights.recentForm * 100),
    },
    {
      feature: "Overall Win Rate",
      importance: Math.round(weights.overallWinRate * 100),
    },
    {
      feature: "Toss Advantage",
      importance: Math.round(weights.tossAdvantage * 100),
    },
    {
      feature: "Toss Decision",
      importance: Math.round(weights.tossDecision * 100),
    },
  ].sort((a, b) => b.importance - a.importance)

  // Simulate a delay to make it feel like ML processing is happening
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    winner,
    probability: winProbability,
    featureImportance,
    teamStats: {
      team1: {
        overallWinRate: Math.round(team1WinRate * 100),
        venueWinRate: Math.round(team1VenueWinRate * 100),
        h2hWinRate: Math.round(team1H2HWinRate * 100),
        recentForm: Math.round(team1RecentForm * 100),
      },
      team2: {
        overallWinRate: Math.round(team2WinRate * 100),
        venueWinRate: Math.round(team2VenueWinRate * 100),
        h2hWinRate: Math.round(team2H2HWinRate * 100),
        recentForm: Math.round(team2RecentForm * 100),
      },
    },
  }
}

// Use this function instead of the original predictMatchWinner
export async function predictMatchWinner(input: PredictionInput) {
  return enhancedPredictMatchWinner(input)
}
