"use client"

import { Badge } from "@/components/ui/badge"

const recentPredictions = [
  {
    id: 1,
    matchDate: "May 5, 2024",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    prediction: "Mumbai Indians",
    actual: "Mumbai Indians",
    confidence: 72,
    correct: true,
  },
  {
    id: 2,
    matchDate: "May 3, 2024",
    teamA: "Royal Challengers Bangalore",
    teamB: "Kolkata Knight Riders",
    prediction: "Royal Challengers Bangalore",
    actual: "Royal Challengers Bangalore",
    confidence: 65,
    correct: true,
  },
  {
    id: 3,
    matchDate: "May 1, 2024",
    teamA: "Delhi Capitals",
    teamB: "Rajasthan Royals",
    prediction: "Delhi Capitals",
    actual: "Rajasthan Royals",
    confidence: 58,
    correct: false,
  },
  {
    id: 4,
    matchDate: "April 29, 2024",
    teamA: "Punjab Kings",
    teamB: "Sunrisers Hyderabad",
    prediction: "Sunrisers Hyderabad",
    actual: "Sunrisers Hyderabad",
    confidence: 68,
    correct: true,
  },
  {
    id: 5,
    matchDate: "April 27, 2024",
    teamA: "Gujarat Titans",
    teamB: "Lucknow Super Giants",
    prediction: "Gujarat Titans",
    actual: "Lucknow Super Giants",
    confidence: 62,
    correct: false,
  },
]

export function RecentPredictions() {
  return (
    <div className="space-y-4">
      {recentPredictions.map((prediction) => (
        <div key={prediction.id} className="flex flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{prediction.matchDate}</span>
            {prediction.correct ? (
              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Correct</Badge>
            ) : (
              <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                Incorrect
              </Badge>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-medium">{prediction.teamA}</span>
            <span className="text-xs font-medium">vs</span>
            <span className="font-medium">{prediction.teamB}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Prediction:</span>
              <span className="font-medium">{prediction.prediction}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Actual:</span>
              <span className="font-medium">{prediction.actual}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <div className="h-2 flex-1 rounded-full bg-muted">
              <div
                className={`h-2 rounded-full ${
                  prediction.confidence >= 70
                    ? "bg-green-500"
                    : prediction.confidence >= 60
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                }`}
                style={{ width: `${prediction.confidence}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{prediction.confidence}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
