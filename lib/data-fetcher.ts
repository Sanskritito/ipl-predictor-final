"use server"

import { parse } from "csv-parse/sync"

export type IPLMatch = {
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

export type IPLMatch2023 = {
  season: string
  id: string
  name: string
  short_name: string
  description: string
  home_team: string
  away_team: string
  toss_won: string
  decision: string
  winner: string
  result: string
  venue_name: string
  home_captain: string
  away_captain: string
  pom: string
  super_over: string
  home_key_batsman: string
  home_key_bowler: string
  away_key_batsman: string
  away_key_bowler: string
  highlights: string
}

// Cache for match data
let matchesCache: IPLMatch[] | null = null
let matches2023Cache: IPLMatch2023[] | null = null
let matches2024Cache: IPLMatch2023[] | null = null

export async function fetchAndParseOriginalCSV(): Promise<IPLMatch[]> {
  if (matchesCache) {
    return matchesCache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ipl_matches_2008_2022-3qsCt8kI3BsRIuZQsSPm1KjWWwa7cP.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`)
    }

    const csvText = await response.text()
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatch[]

    matchesCache = records
    return records
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error)
    throw error
  }
}

export async function fetch2023Data(): Promise<IPLMatch2023[]> {
  if (matches2023Cache) {
    return matches2023Cache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/summary-1NkygzWx3otyHdOoNvLkHKuet8SlS4.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch 2023 CSV: ${response.status}`)
    }

    const csvText = await response.text()
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatch2023[]

    // Filter for 2023 season only
    const matches2023 = records.filter((match) => match.season === "2023")

    matches2023Cache = matches2023
    return matches2023
  } catch (error) {
    console.error("Error fetching or parsing 2023 CSV:", error)
    throw error
  }
}

export async function fetch2024Data(): Promise<IPLMatch2023[]> {
  if (matches2024Cache) {
    return matches2024Cache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/season_summary-7za3ODZ3b0SUd0zBBMfSyDnDxkzMJh.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch 2024 CSV: ${response.status}`)
    }

    const csvText = await response.text()
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    }) as IPLMatch2023[]

    // Filter for completed matches only (those with a winner)
    const matches2024 = records.filter((match) => match.season === "2024" && match.winner && match.winner !== "TBA")

    matches2024Cache = matches2024
    return matches2024
  } catch (error) {
    console.error("Error fetching or parsing 2024 CSV:", error)
    throw error
  }
}

// Normalize team names between datasets
export function normalizeTeamName(name: string): string {
  // Map of short names to full names
  const teamNameMap: Record<string, string> = {
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

  return teamNameMap[name] || name
}

// Convert 2023/2024 match data to the format used by the original dataset
export function convertMatchFormat(match: IPLMatch2023): IPLMatch {
  // Extract decision (bat/field) from the decision string
  let tossDecision = "field"
  if (match.decision.includes("BAT")) {
    tossDecision = "bat"
  }

  return {
    ID: match.id,
    City: match.venue_name.split(",")[0],
    Date: new Date(match.start_date).toISOString().split("T")[0],
    Season: match.season,
    MatchNumber: match.description.split(",")[0],
    Team1: normalizeTeamName(match.home_team),
    Team2: normalizeTeamName(match.away_team),
    Venue: match.venue_name,
    TossWinner: normalizeTeamName(match.toss_won),
    TossDecision: tossDecision,
    SuperOver: match.super_over === "True" ? "Y" : "N",
    WinningTeam: normalizeTeamName(match.winner),
    WonBy: match.result.includes("wkts") ? "wickets" : "runs",
    Margin: match.result.match(/\d+/) ? match.result.match(/\d+/)![0] : "0",
    method: match.result.includes("DLS") ? "D/L" : "",
    Player_of_Match: match.pom || "",
  }
}

// Combine all match data from 2008-2024
export async function getAllMatches(): Promise<IPLMatch[]> {
  try {
    // Fetch data from all sources
    const originalMatches = await fetchAndParseOriginalCSV()
    const matches2023 = await fetch2023Data()
    const matches2024 = await fetch2024Data()

    // Convert 2023 and 2024 matches to the original format
    const converted2023 = matches2023.map(convertMatchFormat)
    const converted2024 = matches2024.map(convertMatchFormat)

    // Combine all matches
    return [...originalMatches, ...converted2023, ...converted2024]
  } catch (error) {
    console.error("Error fetching all match data:", error)
    throw error
  }
}

// Get RCB specific match data
export async function getRCBMatches(): Promise<IPLMatch[]> {
  const allMatches = await getAllMatches()

  // Filter for RCB matches
  return allMatches.filter(
    (match) =>
      match.Team1 === "Royal Challengers Bangalore" ||
      match.Team2 === "Royal Challengers Bangalore" ||
      match.WinningTeam === "Royal Challengers Bangalore",
  )
}

// Get recent form for a team (last 5 matches)
export async function getTeamRecentForm(teamName: string): Promise<string[]> {
  const allMatches = await getAllMatches()

  // Sort matches by date (most recent first)
  const sortedMatches = [...allMatches].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  // Filter for team matches
  const teamMatches = sortedMatches.filter((match) => match.Team1 === teamName || match.Team2 === teamName)

  // Get results of last 5 matches
  const recentForm = teamMatches.slice(0, 5).map((match) => {
    if (match.WinningTeam === teamName) return "W"
    return "L"
  })

  return recentForm
}

// Get head-to-head record between two teams
export async function getHeadToHeadRecord(
  teamA: string,
  teamB: string,
): Promise<{ played: number; teamAWins: number; teamBWins: number }> {
  const allMatches = await getAllMatches()

  // Filter for matches between the two teams
  const h2hMatches = allMatches.filter(
    (match) => (match.Team1 === teamA && match.Team2 === teamB) || (match.Team1 === teamB && match.Team2 === teamA),
  )

  // Count wins
  const teamAWins = h2hMatches.filter((match) => match.WinningTeam === teamA).length
  const teamBWins = h2hMatches.filter((match) => match.WinningTeam === teamB).length

  return {
    played: h2hMatches.length,
    teamAWins,
    teamBWins,
  }
}

// Get venue performance for a team
export async function getVenuePerformance(
  team: string,
  venue: string,
): Promise<{ played: number; won: number; winRate: number }> {
  const allMatches = await getAllMatches()

  // Filter for team matches at the venue
  const venueMatches = allMatches.filter(
    (match) => (match.Team1 === team || match.Team2 === team) && match.Venue.includes(venue),
  )

  // Count wins
  const wins = venueMatches.filter((match) => match.WinningTeam === team).length

  return {
    played: venueMatches.length,
    won: wins,
    winRate: venueMatches.length > 0 ? Math.round((wins / venueMatches.length) * 100) : 0,
  }
}

// Get toss advantage statistics
export async function getTossAdvantage(): Promise<{ tossWinMatchWin: number; totalMatches: number; winRate: number }> {
  const allMatches = await getAllMatches()

  // Count matches where toss winner also won the match
  const tossWinMatchWin = allMatches.filter((match) => match.TossWinner === match.WinningTeam).length

  return {
    tossWinMatchWin,
    totalMatches: allMatches.length,
    winRate: Math.round((tossWinMatchWin / allMatches.length) * 100),
  }
}

// Get key players for a team
export async function getKeyPlayers(team: string): Promise<{ batsmen: string[]; bowlers: string[] }> {
  // For RCB, return specific players
  if (team === "Royal Challengers Bangalore") {
    return {
      batsmen: ["Virat Kohli", "Faf du Plessis", "Glenn Maxwell"],
      bowlers: ["Mohammed Siraj", "Harshal Patel", "Wanindu Hasaranga"],
    }
  }

  // For other teams, use the 2023/2024 data to get key players
  try {
    const matches2023 = await fetch2023Data()
    const matches2024 = await fetch2024Data()

    const allMatches = [...matches2023, ...matches2024]

    // Find matches where this team was home or away
    const teamMatches = allMatches.filter(
      (match) => normalizeTeamName(match.home_team) === team || normalizeTeamName(match.away_team) === team,
    )

    if (teamMatches.length === 0) {
      // Default players if no matches found
      return {
        batsmen: ["Batsman 1", "Batsman 2"],
        bowlers: ["Bowler 1", "Bowler 2"],
      }
    }

    // Get the most recent match
    const latestMatch = teamMatches[0]

    // Extract key players
    let keyBatsmen: string[] = []
    let keyBowlers: string[] = []

    if (normalizeTeamName(latestMatch.home_team) === team) {
      keyBatsmen = latestMatch.home_key_batsman.split(",")
      keyBowlers = latestMatch.home_key_bowler.split(",")
    } else {
      keyBatsmen = latestMatch.away_key_batsman.split(",")
      keyBowlers = latestMatch.away_key_bowler.split(",")
    }

    return {
      batsmen: keyBatsmen,
      bowlers: keyBowlers,
    }
  } catch (error) {
    console.error("Error fetching key players:", error)
    // Default players if error
    return {
      batsmen: ["Batsman 1", "Batsman 2"],
      bowlers: ["Bowler 1", "Bowler 2"],
    }
  }
}
