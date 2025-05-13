"use client"
import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const upcomingMatches = [
  {
    id: 1,
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    date: "May 12, 2024",
    time: "7:30 PM IST",
    venue: "Wankhede Stadium, Mumbai",
    prediction: "Mumbai Indians",
    confidence: 68,
  },
  {
    id: 2,
    teamA: "Royal Challengers Bangalore",
    teamB: "Kolkata Knight Riders",
    date: "May 14, 2024",
    time: "7:30 PM IST",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    prediction: "Royal Challengers Bangalore",
    confidence: 62,
  },
  {
    id: 3,
    teamA: "Delhi Capitals",
    teamB: "Rajasthan Royals",
    date: "May 15, 2024",
    time: "7:30 PM IST",
    venue: "Arun Jaitley Stadium, Delhi",
    prediction: "Rajasthan Royals",
    confidence: 55,
  },
  {
    id: 4,
    teamA: "Punjab Kings",
    teamB: "Sunrisers Hyderabad",
    date: "May 17, 2024",
    time: "7:30 PM IST",
    venue: "Punjab Cricket Association Stadium, Mohali",
    prediction: "Sunrisers Hyderabad",
    confidence: 59,
  },
  {
    id: 5,
    teamA: "Gujarat Titans",
    teamB: "Lucknow Super Giants",
    date: "May 19, 2024",
    time: "3:30 PM IST",
    venue: "Narendra Modi Stadium, Ahmedabad",
    prediction: "Gujarat Titans",
    confidence: 64,
  },
]

export function UpcomingMatches() {
  return (
    <div className="space-y-4">
      {upcomingMatches.map((match) => (
        <div key={match.id} className="flex flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{match.date}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {match.time}
            </Badge>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10">
                <div className="flex h-full w-full items-center justify-center font-semibold">
                  {match.teamA.substring(0, 2)}
                </div>
              </div>
              <span className="font-medium">{match.teamA}</span>
            </div>
            <span className="text-sm font-bold">VS</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{match.teamB}</span>
              <div className="h-8 w-8 rounded-full bg-primary/10">
                <div className="flex h-full w-full items-center justify-center font-semibold">
                  {match.teamB.substring(0, 2)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">{match.venue}</div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Prediction:</span>
            <span className="text-xs font-medium">{match.prediction}</span>
            <Badge
              variant="secondary"
              className={`text-xs ${
                match.confidence >= 65
                  ? "bg-green-500/10 text-green-500"
                  : match.confidence >= 55
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-red-500/10 text-red-500"
              }`}
            >
              {match.confidence}% confidence
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
