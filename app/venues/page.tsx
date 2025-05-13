"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VenueStats } from "@/components/venues/venue-stats"
import { VenuePerformance } from "@/components/venues/venue-performance"
import { VenueTrends } from "@/components/venues/venue-trends"
import { VenueFactors } from "@/components/venues/venue-factors"

export default function VenuesPage() {
  const [selectedVenue, setSelectedVenue] = useState("M. Chinnaswamy Stadium, Bangalore")

  const venues = [
    "M. Chinnaswamy Stadium, Bangalore",
    "Eden Gardens, Kolkata",
    "Wankhede Stadium, Mumbai",
    "MA Chidambaram Stadium, Chennai",
    "Arun Jaitley Stadium, Delhi",
    "Rajiv Gandhi International Stadium, Hyderabad",
    "Punjab Cricket Association Stadium, Mohali",
    "Narendra Modi Stadium, Ahmedabad",
  ]

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Venue Stats</h1>
        <div className="w-full sm:w-[240px]">
          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
            <SelectTrigger>
              <SelectValue placeholder="Select venue" />
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
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Matches Played</CardTitle>
            <div className="ml-auto rounded-md bg-blue-500/10 p-1">
              <MapPin className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Since IPL inception</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Avg. First Innings</CardTitle>
            <div className="ml-auto rounded-md bg-green-500/10 p-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">Runs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Batting First Win %</CardTitle>
            <div className="ml-auto rounded-md bg-yellow-500/10 p-1">
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48.2%</div>
            <p className="text-xs text-muted-foreground">Slight bowling advantage</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Venue Performance</CardTitle>
            <CardDescription>Team performance at {selectedVenue}</CardDescription>
          </CardHeader>
          <CardContent>
            <VenuePerformance venue={selectedVenue} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Venue Trends</CardTitle>
            <CardDescription>Historical trends at {selectedVenue}</CardDescription>
          </CardHeader>
          <CardContent>
            <VenueTrends venue={selectedVenue} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Venue Stats</CardTitle>
            <CardDescription>Detailed statistics for {selectedVenue}</CardDescription>
          </CardHeader>
          <CardContent>
            <VenueStats venue={selectedVenue} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Venue Factors</CardTitle>
            <CardDescription>Factors affecting match outcomes at {selectedVenue}</CardDescription>
          </CardHeader>
          <CardContent>
            <VenueFactors venue={selectedVenue} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
