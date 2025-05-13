// Define the team logos with correct file paths - using direct URLs for problematic logos
const teamLogoMap = {
  "Chennai Super Kings": "/images/csk-logo.png",
  "Delhi Capitals": "/images/dc-logo.png",
  "Gujarat Titans": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GT_LOGO-wLfsnRjShYilyV3rZF8CRO0ukt28dl.png", // Direct URL instead of local file
  "Kolkata Knight Riders": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kkr-logo-9nvQBavNLQgghLpTJDM8AxR8aFOIDr.png", // Direct URL instead of local file
  "Lucknow Super Giants": "/images/lsg-logo.png",
  "Mumbai Indians": "/images/mi-logo.png",
  "Punjab Kings": "/images/pbks-logo.png",
  "Rajasthan Royals": "/images/rr-logo.png",
  "Royal Challengers Bangalore": "/images/rcb-logo.png",
  "Sunrisers Hyderabad": "/images/srh-logo.png",
}

// Export the IPL logo path
export const iplLogo = "/images/new-ipl-logo.png"

// Function to get a team's logo path
export const getTeamLogo = (team: string): string => {
  console.log(`Getting logo for team: ${team}`)
  // Return a default placeholder if team not found instead of empty string
  return (
    teamLogoMap[team as keyof typeof teamLogoMap] ||
    `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(team + " logo")}`
  )
}

// Function to get all team names
export const getAllTeams = () => {
  return Object.keys(teamLogoMap)
}

// Function to get team colors
export const getTeamColors = (team: string): { primary: string; secondary: string } => {
  const teamColorMap: Record<string, { primary: string; secondary: string }> = {
    "Chennai Super Kings": { primary: "#FFFF00", secondary: "#0081B7" },
    "Delhi Capitals": { primary: "#0078BC", secondary: "#EF1C25" },
    "Gujarat Titans": { primary: "#1C1C1C", secondary: "#0085CA" },
    "Kolkata Knight Riders": { primary: "#3A225D", secondary: "#FDB515" },
    "Lucknow Super Giants": { primary: "#A72056", secondary: "#FFFFFF" },
    "Mumbai Indians": { primary: "#004BA0", secondary: "#D1AB3E" },
    "Punjab Kings": { primary: "#ED1B24", secondary: "#A7A9AC" },
    "Rajasthan Royals": { primary: "#254AA5", secondary: "#FF69B4" },
    "Royal Challengers Bangalore": { primary: "#EC1C24", secondary: "#000000" },
    "Sunrisers Hyderabad": { primary: "#F7A721", secondary: "#E95E0C" },
    // Default for unknown teams
    "Team A": { primary: "#6366F1", secondary: "#4F46E5" },
    "Team B": { primary: "#9333EA", secondary: "#7E22CE" },
  }

  // If team not found, return a default color
  return teamColorMap[team] || { primary: "#6366F1", secondary: "#4F46E5" }
}
