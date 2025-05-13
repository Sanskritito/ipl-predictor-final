"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PredictionResult } from "@/components/predictor/prediction-result"
import { ModelComparison } from "@/components/predictor/model-comparison"
import { FeatureImportance } from "@/components/predictor/feature-importance"
import { HeadToHeadTimeline } from "@/components/head-to-head-timeline"
import { ModelConfidence } from "@/components/model-confidence"
import { TeamTrends } from "@/components/predictor/team-trends"
import { predictMatchWinnerML } from "@/lib/ml-prediction"
import { getAllVenues } from "@/lib/prediction"
import { getTeamLogo } from "@/lib/team-logos"
import Image from "next/image"

// Define team logos with fallbacks
const teamLogos: Record<string, string> = {
  "Chennai Super Kings": "/images/csk-logo.png",
  "Delhi Capitals": "/images/dc-logo.png",
  "Gujarat Titans": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GT_LOGO-wLfsnRjShYilyV3rZF8CRO0ukt28dl.png", // Direct URL
  "Kolkata Knight Riders": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kkr-logo-9nvQBavNLQgghLpTJDM8AxR8aFOIDr.png", // Direct URL
  "Lucknow Super Giants": "/images/lsg-logo.png",
  "Mumbai Indians": "/images/mi-logo.png",
  "Punjab Kings": "/images/pbks-logo.png",
  "Rajasthan Royals": "/images/rr-logo.png",
  "Royal Challengers Bangalore": "/images/rcb-logo.png",
  "Sunrisers Hyderabad": "/images/srh-logo.png",
}

export default function PredictorPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasPrediction, setHasPrediction] = useState(false)
  const [selectedTeamA, setSelectedTeamA] = useState("")
  const [selectedTeamB, setSelectedTeamB] = useState("")
  const [selectedVenue, setSelectedVenue] = useState("")
  const [tossWinner, setTossWinner] = useState("")
  const [tossDecision, setTossDecision] = useState("")
  const [venues, setVenues] = useState<string[]>([])
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("comparison")

  // Add state for image errors
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({})

  const teams = [
    "Chennai Super Kings",
    "Delhi Capitals",
    "Gujarat Titans",
    "Kolkata Knight Riders",
    "Lucknow Super Giants",
    "Mumbai Indians",
    "Punjab Kings",
    "Rajasthan Royals",
    "Royal Challengers Bangalore",
    "Sunrisers Hyderabad",
  ]

  // Fetch venues from the dataset
  useEffect(() => {
    async function fetchVenues() {
      try {
        const venueList = await getAllVenues()
        setVenues(venueList)
      } catch (error) {
        console.error("Error fetching venues:", error)
        // Fallback venues if API fails
        setVenues([
          "M. Chinnaswamy Stadium, Bangalore",
          "Eden Gardens, Kolkata",
          "Wankhede Stadium, Mumbai",
          "MA Chidambaram Stadium, Chennai",
          "Arun Jaitley Stadium, Delhi",
          "Rajiv Gandhi International Stadium, Hyderabad",
          "Punjab Cricket Association Stadium, Mohali",
          "Narendra Modi Stadium, Ahmedabad",
        ])
      }
    }

    fetchVenues()
  }, [])

  const handlePredict = async () => {
    setIsLoading(true)

    try {
      // Call the prediction function with the selected parameters
      const result = await predictMatchWinnerML({
        team1: selectedTeamA,
        team2: selectedTeamB,
        tossWinner: tossWinner,
        tossDecision: tossDecision,
        venue: selectedVenue,
      })

      setPredictionResult(result)
      setHasPrediction(true)
    } catch (error) {
      console.error("Error making prediction:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = selectedTeamA && selectedTeamB && selectedVenue && tossWinner && tossDecision

  // Handle image error
  const handleImageError = (team: string) => {
    console.error(`Error loading logo for ${team}`)
    setLogoErrors((prev) => ({ ...prev, [team]: true }))
  }

  // Get logo with fallback
  const getTeamLogoWithFallback = (team: string) => {
    if (!team) return `/placeholder.svg?height=24&width=24&query=team`
    
    // Use local map first, then fallback to placeholder
    return logoErrors[team]
      ? `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(team + " logo")}`
      : teamLogos[team] || `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(team + " logo")}`
  }

  // Team logo component with enhanced size and brightness
  const TeamLogo = ({ team, size = 8 }: { team: string; size?: number }) => (
    <div className={`relative h-${size} w-${size} overflow-hidden rounded-full bg-white shadow-md`}>
      <Image
        src={getTeamLogoWithFallback(team) || "/placeholder.svg"}
        alt={team}
        fill
        priority
        unoptimized={team === "Gujarat Titans" || team === "Kolkata Knight Riders"}
        className="object-contain p-0.5 brightness-110 contrast-110"
        onError={() => handleImageError(team)}
      />
    </div>
  )

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Match Predictor</h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Match Details</CardTitle>
            <CardDescription>Enter the details for prediction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Home Team</label>
              <Select value={selectedTeamA} onValueChange={setSelectedTeamA}>
                <SelectTrigger>
                  {selectedTeamA ? (
                    <div className="flex items-center gap-2">
                      <TeamLogo team={selectedTeamA} />
                      <span>{selectedTeamA}</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select Home Team" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      <div className="flex items-center gap-2">
                        <TeamLogo team={team} />
                        <span>{team}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Away Team</label>
              <Select value={selectedTeamB} onValueChange={setSelectedTeamB}>
                <SelectTrigger>
                  {selectedTeamB ? (
                    <div className="flex items-center gap-2">
                      <TeamLogo team={selectedTeamB} />
                      <span>{selectedTeamB}</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select Away Team" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter((team) => team !== selectedTeamA)
                    .map((team) => (
                      <SelectItem key={team} value={team}>
                        <div className="flex items-center gap-2">
                          <TeamLogo team={team} />
                          <span>{team}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Venue</label>
              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue} value={venue}>
                      {venue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Toss Winner</label>
              <Select value={tossWinner} onValueChange={setTossWinner}>
                <SelectTrigger>
                  {tossWinner ? (
                    <div className="flex items-center gap-2">
                      <TeamLogo team={tossWinner} />
                      <span>{tossWinner}</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select Toss Winner" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {selectedTeamA && (
                    <SelectItem value={selectedTeamA}>
                      <div className="flex items-center gap-2">
                        <TeamLogo team={selectedTeamA} />
                        <span>{selectedTeamA}</span>
                      </div>
                    </SelectItem>
                  )}
                  {selectedTeamB && (
                    <SelectItem value={selectedTeamB}>
                      <div className="flex items-center gap-2">
                        <TeamLogo team={selectedTeamB} />
                        <span>{selectedTeamB}</span>
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Toss Decision</label>
              <Select value={tossDecision} onValueChange={setTossDecision}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bat">Bat</SelectItem>
                  <SelectItem value="field">Field</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" disabled={!isFormValid || isLoading} onClick={handlePredict}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Predict Winner"
              )}
            </Button>
          </CardContent>
        </Card>
        <div className="space-y-6 md:col-span-2">
          {hasPrediction ? (
            <>
              <PredictionResult 
                teamA={selectedTeamA} 
                teamB={selectedTeamB} 
                result={predictionResult}
                teamLogos={teamLogos} 
              />
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
                  <TabsTrigger value="features">Feature Importance</TabsTrigger>
                  <TabsTrigger value="history">Historical Matchups</TabsTrigger>
                  <TabsTrigger value="trends">Team Trends</TabsTrigger>
                </TabsList>
                <TabsContent value="comparison" className="space-y-4">
                  <ModelComparison />
                  {predictionResult?.modelConfidence && (
                    <ModelConfidence modelConfidence={predictionResult.modelConfidence} theme="dark" />
                  )}
                </TabsContent>
                <TabsContent value="features" className="space-y-4">
                  <FeatureImportance featureData={predictionResult?.featureImportance} />
                </TabsContent>
                <TabsContent value="history" className="space-y-4">
                  <HeadToHeadTimeline teamA={selectedTeamA} teamB={selectedTeamB} theme="dark" />
                </TabsContent>
                <TabsContent value="trends" className="space-y-4">
                  <TeamTrends teamA={selectedTeamA} teamB={selectedTeamB} theme="dark" />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card className="flex h-full flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">No Prediction Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the match details and click "Predict Winner" to see the prediction results from our ML, DL, and
                QML models.
              </p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
