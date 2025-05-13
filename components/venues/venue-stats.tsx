"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface VenueStatsProps {
  venue: string
}

export function VenueStats({ venue }: VenueStatsProps) {
  // Generate sample venue statistics based on the venue
  const getVenueStats = () => {
    // This would normally come from an API or database
    const baseStats = {
      totalMatches: Math.floor(Math.random() * 50) + 100,
      highestScore: Math.floor(Math.random() * 50) + 220,
      lowestScore: Math.floor(Math.random() * 30) + 90,
      avgFirstInnings: Math.floor(Math.random() * 20) + 170,
      avgSecondInnings: Math.floor(Math.random() * 20) + 160,
      highestChase: Math.floor(Math.random() * 30) + 190,
      mostWickets: Math.floor(Math.random() * 5) + 5,
      mostRuns: Math.floor(Math.random() * 50) + 100,
      battingFirst: Math.floor(Math.random() * 20) + 40,
      battingSecond: Math.floor(Math.random() * 20) + 40,
    }

    // Customize based on venue
    if (venue.includes("Chinnaswamy")) {
      baseStats.highestScore = 263
      baseStats.avgFirstInnings = 185
      baseStats.battingFirst = 48
    } else if (venue.includes("Wankhede")) {
      baseStats.highestChase = 219
      baseStats.avgSecondInnings = 175
      baseStats.battingSecond = 52
    } else if (venue.includes("Chidambaram")) {
      baseStats.mostWickets = 8
      baseStats.avgFirstInnings = 168
      baseStats.battingFirst = 55
    }

    return baseStats
  }

  const stats = getVenueStats()

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Statistic</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Total Matches Played</TableCell>
            <TableCell>{stats.totalMatches}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Highest Team Score</TableCell>
            <TableCell>{stats.highestScore}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lowest Team Score</TableCell>
            <TableCell>{stats.lowestScore}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Average 1st Innings Score</TableCell>
            <TableCell>{stats.avgFirstInnings}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Average 2nd Innings Score</TableCell>
            <TableCell>{stats.avgSecondInnings}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Highest Successful Chase</TableCell>
            <TableCell>{stats.highestChase}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Most Wickets in a Match</TableCell>
            <TableCell>{stats.mostWickets}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Most Runs in a Match</TableCell>
            <TableCell>{stats.mostRuns}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Batting First Win %</TableCell>
            <TableCell>{stats.battingFirst}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Batting Second Win %</TableCell>
            <TableCell>{stats.battingSecond}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
