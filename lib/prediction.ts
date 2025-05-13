"use server"

import { parse } from "csv-parse/sync"

type PredictionInput = {
  team1: string
  team2: string
  tossWinner: string
  tossDecision: string
  venue: string
}

type IPLMatch = {
  ID: string
  City: string
  Date: string
  Season: string
  MatchNumber: string
  Team1: string
  Team2: string
  Venue: string
  TossWinner: string
  TossDecision: string
  SuperOver: string
  WinningTeam: string
  WonBy: string
  Margin: string
  method: string
  Player_of_Match: string
}

// New match type for 2023-2024 data
type IPLMatchNew = {
  season: string
  id: string
  name: string
  home_team: string
  away_team: string
  toss_won: string
  decision: string
  winner: string
  venue_name: string
  pom: string
  super_over: string
  home_key_batsman?: string
  home_key_bowler?: string
  away_key_batsman?: string
  away_key_bowler?: string
  home_captain?: string
  away_captain?: string
}

// Team name mapping from abbreviations to full names
const teamNameMapping: Record<string, string> = {
  CSK: "Chennai Super Kings",
  DC: "Delhi Capitals",
  GT: "Gujarat Titans",
  KKR: "Kolkata Knight Riders",
  LSG: "Lucknow Super Giants",
  MI: "Mumbai Indians",
  PBKS: "Punjab Kings",
  RR: "Rajasthan Royals",
  RCB: "Royal Challengers Bangalore",
  SRH: "Sunrisers Hyderabad",
}

type TeamStats = {
  totalMatches: number
  wins: number
  tossWins: number
  tossWinAndMatchWin: number
  venueMatches: Map<string, number>
  venueWins: Map<string, number>
  headToHead: Map<string, { played: number; won: number }>
  recentForm: number[] // 1 for win, 0 for loss, most recent first
  keyPlayers: Set<string> // Store key players for each team
  captains: Set<string> // Store captains for each team
}

// Cache for team statistics
let teamStatsCache: Map<string, TeamStats> | null = null
let matchesCache: (IPLMatch | IPLMatchNew)[] | null = null

async function fetchAndParseCSV(): Promise<(IPLMatch | IPLMatchNew)[]> {
  if (matchesCache) {
    return matchesCache
  }

  try {
    // Fetch original data (2008-2022)
    const response1 = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ipl_matches_2008_2022-3qsCt8kI3BsRIuZQsSPm1KjWWwa7cP.csv",
    )

    if (!response1.ok) {
      throw new Error(`Failed to fetch original CSV: ${response1.status}`)
    }

    const csvText1 = await response1.text()
    const records1 = parse(csvText1, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatch[]

    // Fetch 2023 data
    const response2 = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/summary-1NkygzWx3otyHdOoNvLkHKuet8SlS4.csv",
    )

    if (!response2.ok) {
      throw new Error(`Failed to fetch 2023 CSV: ${response2.status}`)
    }

    const csvText2 = await response2.text()
    const records2 = parse(csvText2, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatchNew[]

    // Fetch 2024 data
    const response3 = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/season_summary-7za3ODZ3b0SUd0zBBMfSyDnDxkzMJh.csv",
    )

    if (!response3.ok) {
      throw new Error(`Failed to fetch 2024 CSV: ${response3.status}`)
    }

    const csvText3 = await response3.text()
    const records3 = parse(csvText3, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatchNew[]

    // Filter out matches without a winner or with TBA teams
    const validRecords2 = records2.filter(
      (match) =>
        match.winner &&
        match.winner !== "TBA" &&
        match.winner !== "None" &&
        match.home_team &&
        match.home_team !== "TBA" &&
        match.home_team !== "None" &&
        match.away_team &&
        match.away_team !== "TBA" &&
        match.away_team !== "None",
    )

    const validRecords3 = records3.filter(
      (match) =>
        match.winner &&
        match.winner !== "TBA" &&
        match.winner !== "None" &&
        match.home_team &&
        match.home_team !== "TBA" &&
        match.home_team !== "None" &&
        match.away_team &&
        match.away_team !== "TBA" &&
        match.away_team !== "None",
    )

    // Combine all records
    const allRecords = [...records1, ...validRecords2, ...validRecords3]
    matchesCache = allRecords
    return allRecords
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error)
    throw error
  }
}

async function buildTeamStats(): Promise<Map<string, TeamStats>> {
  if (teamStatsCache) {
    return teamStatsCache
  }

  const matches = await fetchAndParseCSV()
  const teamStats = new Map<string, TeamStats>()

  // Initialize team stats
  const allTeams = new Set<string>()

  // Process original format matches (2008-2022)
  matches.forEach((match) => {
    if ("Team1" in match) {
      // Original format
      allTeams.add(match.Team1)
      allTeams.add(match.Team2)
      if (match.WinningTeam) allTeams.add(match.WinningTeam)
    } else {
      // New format (2023-2024)
      const homeTeam = teamNameMapping[match.home_team] || match.home_team
      const awayTeam = teamNameMapping[match.away_team] || match.away_team
      const winner = teamNameMapping[match.winner] || match.winner

      allTeams.add(homeTeam)
      allTeams.add(awayTeam)
      if (winner) allTeams.add(winner)
    }
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
        recentForm: [],
        keyPlayers: new Set(),
        captains: new Set(),
      })
    }
  })

  // Calculate stats
  matches.forEach((match) => {
    if ("Team1" in match) {
      // Process original format matches (2008-2022)
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
        team1Stats.recentForm.unshift(winner === team1 ? 1 : 0)

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
        team2Stats.recentForm.unshift(winner === team2 ? 1 : 0)

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
    } else {
      // Process new format matches (2023-2024)
      const homeTeam = teamNameMapping[match.home_team] || match.home_team
      const awayTeam = teamNameMapping[match.away_team] || match.away_team
      const winner = teamNameMapping[match.winner] || match.winner
      const tossWinner = teamNameMapping[match.toss_won] || match.toss_won
      const venue = match.venue_name

      // Skip matches without a winner
      if (!winner) return

      // Update home team stats
      if (homeTeam) {
        const homeTeamStats = teamStats.get(homeTeam)!
        homeTeamStats.totalMatches++
        homeTeamStats.recentForm.unshift(winner === homeTeam ? 1 : 0)

        if (winner === homeTeam) {
          homeTeamStats.wins++
        }

        if (tossWinner === homeTeam) {
          homeTeamStats.tossWins++
          if (winner === homeTeam) {
            homeTeamStats.tossWinAndMatchWin++
          }
        }

        // Venue stats
        homeTeamStats.venueMatches.set(venue, (homeTeamStats.venueMatches.get(venue) || 0) + 1)
        if (winner === homeTeam) {
          homeTeamStats.venueWins.set(venue, (homeTeamStats.venueWins.get(venue) || 0) + 1)
        }

        // Head to head
        if (!homeTeamStats.headToHead.has(awayTeam)) {
          homeTeamStats.headToHead.set(awayTeam, { played: 0, won: 0 })
        }
        const h2h = homeTeamStats.headToHead.get(awayTeam)!
        h2h.played++
        if (winner === homeTeam) {
          h2h.won++
        }

        // Add key players and captain
        if (match.home_key_batsman) {
          match.home_key_batsman.split(",").forEach((player) => {
            homeTeamStats.keyPlayers.add(player.trim())
          })
        }
        if (match.home_key_bowler) {
          match.home_key_bowler.split(",").forEach((player) => {
            homeTeamStats.keyPlayers.add(player.trim())
          })
        }
        if (match.home_captain) {
          homeTeamStats.captains.add(match.home_captain.trim())
        }
      }

      // Update away team stats
      if (awayTeam) {
        const awayTeamStats = teamStats.get(awayTeam)!
        awayTeamStats.totalMatches++
        awayTeamStats.recentForm.unshift(winner === awayTeam ? 1 : 0)

        if (winner === awayTeam) {
          awayTeamStats.wins++
        }

        if (tossWinner === awayTeam) {
          awayTeamStats.tossWins++
          if (winner === awayTeam) {
            awayTeamStats.tossWinAndMatchWin++
          }
        }

        // Venue stats
        awayTeamStats.venueMatches.set(venue, (awayTeamStats.venueMatches.get(venue) || 0) + 1)
        if (winner === awayTeam) {
          awayTeamStats.venueWins.set(venue, (awayTeamStats.venueWins.get(venue) || 0) + 1)
        }

        // Head to head
        if (!awayTeamStats.headToHead.has(homeTeam)) {
          awayTeamStats.headToHead.set(homeTeam, { played: 0, won: 0 })
        }
        const h2h = awayTeamStats.headToHead.get(homeTeam)!
        h2h.played++
        if (winner === awayTeam) {
          h2h.won++
        }

        // Add key players and captain
        if (match.away_key_batsman) {
          match.away_key_batsman.split(",").forEach((player) => {
            awayTeamStats.keyPlayers.add(player.trim())
          })
        }
        if (match.away_key_bowler) {
          match.away_key_bowler.split(",").forEach((player) => {
            awayTeamStats.keyPlayers.add(player.trim())
          })
        }
        if (match.away_captain) {
          awayTeamStats.captains.add(match.away_captain.trim())
        }
      }
    }
  })

  // Limit recent form to last 5 matches
  teamStats.forEach((stats) => {
    stats.recentForm = stats.recentForm.slice(0, 5)
  })

  teamStatsCache = teamStats
  return teamStats
}

export async function predictMatchWinner(input: PredictionInput) {
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

  // 5. Recent form (last 5 matches)
  const team1RecentFormRate =
    team1Stats.recentForm.reduce((sum, result) => sum + result, 0) / (team1Stats.recentForm.length || 1)
  const team2RecentFormRate =
    team2Stats.recentForm.reduce((sum, result) => sum + result, 0) / (team2Stats.recentForm.length || 1)

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
    team1RecentFormRate * weights.recentForm +
    (tossWinner === team1 ? tossDecisionFactor * weights.tossDecision : 0)

  let team2Score =
    team2WinRate * weights.overallWinRate +
    (tossWinner === team2 ? team2TossWinRate * weights.tossAdvantage : 0) +
    team2VenueWinRate * weights.venuePerformance +
    team2H2HWinRate * weights.headToHead +
    team2RecentFormRate * weights.recentForm +
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
      feature: "Toss Winner",
      importance: Math.round(weights.tossAdvantage * 100),
    },
    {
      feature: "Toss Decision",
      importance: Math.round(weights.tossDecision * 100),
    },
  ]

  // Get key players for both teams
  const team1KeyPlayers = Array.from(team1Stats.keyPlayers).slice(0, 3)
  const team2KeyPlayers = Array.from(team2Stats.keyPlayers).slice(0, 3)

  // Get captains for both teams
  const team1Captains = Array.from(team1Stats.captains).slice(0, 1)
  const team2Captains = Array.from(team2Stats.captains).slice(0, 1)

  // Simulate a delay to make it feel like ML processing is happening
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    winner,
    probability: winProbability,
    featureImportance,
    team1Stats: {
      winRate: Math.round(team1WinRate * 100),
      recentForm: team1Stats.recentForm,
      keyPlayers: team1KeyPlayers,
      captains: team1Captains,
    },
    team2Stats: {
      winRate: Math.round(team2WinRate * 100),
      recentForm: team2Stats.recentForm,
      keyPlayers: team2KeyPlayers,
      captains: team2Captains,
    },
  }
}

// Function to get recent matches between two teams
export async function getRecentMatches(team1: string, team2: string, limit = 5) {
  const matches = await fetchAndParseCSV()
  const recentMatches = []

  // Process matches in reverse order (most recent first)
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i]

    if ("Team1" in match) {
      // Original format
      if ((match.Team1 === team1 && match.Team2 === team2) || (match.Team1 === team2 && match.Team2 === team1)) {
        if (match.WinningTeam) {
          recentMatches.push({
            date: match.Date,
            venue: match.Venue,
            winner: match.WinningTeam,
            team1Score: "", // Not available in this format
            team2Score: "", // Not available in this format
            pom: match.Player_of_Match,
          })
        }
      }
    } else {
      // New format
      const homeTeam = teamNameMapping[match.home_team] || match.home_team
      const awayTeam = teamNameMapping[match.away_team] || match.away_team

      if ((homeTeam === team1 && awayTeam === team2) || (homeTeam === team2 && awayTeam === team1)) {
        if (match.winner) {
          recentMatches.push({
            date: new Date(match.id).toLocaleDateString(),
            venue: match.venue_name,
            winner: teamNameMapping[match.winner] || match.winner,
            team1Score: match.home_score,
            team2Score: match.away_score,
            pom: match.pom,
          })
        }
      }
    }

    if (recentMatches.length >= limit) break
  }

  return recentMatches
}

// Function to get team key players
export async function getTeamKeyPlayers(team: string) {
  const teamStats = await buildTeamStats()
  const stats = teamStats.get(team)

  if (!stats) return []

  return Array.from(stats.keyPlayers).slice(0, 5)
}

// Function to get team captains
export async function getTeamCaptains(team: string) {
  const teamStats = await buildTeamStats()
  const stats = teamStats.get(team)

  if (!stats) return []

  return Array.from(stats.captains)
}

// Function to get team recent form
export async function getTeamRecentForm(team: string) {
  const teamStats = await buildTeamStats()
  const stats = teamStats.get(team)

  if (!stats) return []

  return stats.recentForm
}

// Function to get all venues
export async function getAllVenues() {
  const matches = await fetchAndParseCSV()

  // Use a Map to ensure uniqueness by standardized name
  const venueMap = new Map<string, string>()

  // Process each match
  matches.forEach((match) => {
    let venueName: string

    if ("Venue" in match) {
      venueName = match.Venue.trim()
    } else {
      venueName = match.venue_name.trim()
    }

    // Get standardized name
    const standardizedName = standardizeVenueName(venueName)

    // Use standardized name as key to avoid duplicates
    venueMap.set(standardizedName.toLowerCase(), standardizedName)
  })

  // Return sorted venues
  return Array.from(venueMap.values()).sort()
}

// Helper function to standardize venue names
function standardizeVenueName(venue: string): string {
  // Convert to lowercase for case-insensitive comparison, but preserve original case for return
  const lowerVenue = venue.toLowerCase()

  // Dr DY Patil Sports Academy
  if (lowerVenue.includes("dy patil") || lowerVenue.includes("d.y. patil") || lowerVenue.includes("d y patil")) {
    return "Dr DY Patil Sports Academy, Mumbai"
  }

  // Brabourne Stadium
  if (lowerVenue.includes("brabourne")) {
    return "Brabourne Stadium, Mumbai"
  }

  // Buffalo Park
  if (lowerVenue.includes("buffalo park")) {
    return "Buffalo Park, East London"
  }

  // Dubai International Stadium
  if (lowerVenue.includes("dubai") && lowerVenue.includes("stadium")) {
    return "Dubai International Cricket Stadium"
  }

  // Sharjah Cricket Stadium
  if (lowerVenue.includes("sharjah")) {
    return "Sharjah Cricket Stadium"
  }

  // Sheikh Zayed Stadium
  if (lowerVenue.includes("sheikh zayed") || lowerVenue.includes("zayed")) {
    return "Sheikh Zayed Stadium, Abu Dhabi"
  }

  // Bangalore venues
  if (lowerVenue.includes("chinnaswamy") || (lowerVenue.includes("bengaluru") && lowerVenue.includes("stadium"))) {
    return "M. Chinnaswamy Stadium, Bangalore"
  }

  // Mumbai venues
  if (lowerVenue.includes("wankhede")) {
    return "Wankhede Stadium, Mumbai"
  }

  // Chennai venues
  if (lowerVenue.includes("chidambaram") || lowerVenue.includes("chepauk")) {
    return "MA Chidambaram Stadium, Chennai"
  }

  // Kolkata venues
  if (lowerVenue.includes("eden gardens")) {
    return "Eden Gardens, Kolkata"
  }

  // Delhi venues
  if (
    lowerVenue.includes("feroz shah kotla") ||
    lowerVenue.includes("arun jaitley") ||
    (lowerVenue.includes("delhi") && lowerVenue.includes("stadium"))
  ) {
    return "Arun Jaitley Stadium, Delhi"
  }

  // Hyderabad venues
  if (lowerVenue.includes("rajiv gandhi") || lowerVenue.includes("uppal")) {
    return "Rajiv Gandhi International Stadium, Hyderabad"
  }

  // Mohali/Punjab venues
  if (lowerVenue.includes("punjab cricket") || lowerVenue.includes("mohali") || lowerVenue.includes("is bindra")) {
    return "Punjab Cricket Association Stadium, Mohali"
  }

  // Jaipur venues
  if (lowerVenue.includes("sawai mansingh") || (lowerVenue.includes("jaipur") && lowerVenue.includes("stadium"))) {
    return "Sawai Mansingh Stadium, Jaipur"
  }

  // Ahmedabad venues
  if (lowerVenue.includes("narendra modi") || lowerVenue.includes("motera")) {
    return "Narendra Modi Stadium, Ahmedabad"
  }

  // Pune venues
  if (lowerVenue.includes("maharashtra cricket") || (lowerVenue.includes("pune") && lowerVenue.includes("stadium"))) {
    return "Maharashtra Cricket Association Stadium, Pune"
  }

  // Dharamsala venues
  if (lowerVenue.includes("hpca") || lowerVenue.includes("himachal pradesh") || lowerVenue.includes("dharamsala")) {
    return "HPCA Stadium, Dharamsala"
  }

  // Lucknow venues
  if (lowerVenue.includes("ekana") || (lowerVenue.includes("lucknow") && lowerVenue.includes("stadium"))) {
    return "Ekana Cricket Stadium, Lucknow"
  }

  // Guwahati venues
  if (lowerVenue.includes("barsapara") || lowerVenue.includes("guwahati")) {
    return "Barsapara Cricket Stadium, Guwahati"
  }

  // Visakhapatnam venues
  if (lowerVenue.includes("aca-vdca") || lowerVenue.includes("visakhapatnam") || lowerVenue.includes("vizag")) {
    return "ACA-VDCA Stadium, Visakhapatnam"
  }

  // Return the original venue name if no standardization is needed
  return venue
}
