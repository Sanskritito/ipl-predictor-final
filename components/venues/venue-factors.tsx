"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

interface VenueFactorsProps {
  venue: string
}

export function VenueFactors({ venue }: VenueFactorsProps) {
  // Generate sample venue factor data based on the venue
  const getVenueFactorData = () => {
    // Base factors
    const baseFactors = [
      { factor: "Batting Friendly", value: 60 },
      { factor: "Spin Support", value: 50 },
      { factor: "Pace Support", value: 50 },
      { factor: "Dew Factor", value: 40 },
      { factor: "Boundary Size", value: 50 },
      { factor: "Pitch Deterioration", value: 45 },
    ]

    // Customize based on venue
    if (venue.includes("Chinnaswamy")) {
      return baseFactors.map((item) => {
        if (item.factor === "Batting Friendly") return { ...item, value: 85 }
        if (item.factor === "Boundary Size") return { ...item, value: 30 }
        if (item.factor === "Dew Factor") return { ...item, value: 60 }
        return item
      })
    } else if (venue.includes("Chidambaram")) {
      return baseFactors.map((item) => {
        if (item.factor === "Spin Support") return { ...item, value: 80 }
        if (item.factor === "Pitch Deterioration") return { ...item, value: 75 }
        if (item.factor === "Batting Friendly") return { ...item, value: 45 }
        return item
      })
    } else if (venue.includes("Wankhede")) {
      return baseFactors.map((item) => {
        if (item.factor === "Pace Support") return { ...item, value: 70 }
        if (item.factor === "Dew Factor") return { ...item, value: 65 }
        if (item.factor === "Batting Friendly") return { ...item, value: 70 }
        return item
      })
    } else if (venue.includes("Eden")) {
      return baseFactors.map((item) => {
        if (item.factor === "Boundary Size") return { ...item, value: 60 }
        if (item.factor === "Dew Factor") return { ...item, value: 75 }
        return item
      })
    }

    return baseFactors
  }

  const factorData = getVenueFactorData()

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Venue Characteristics</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={factorData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Venue Factor" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Tooltip
                  formatter={(value) => [`${value}/100`]}
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Venue Analysis</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pitch Type</span>
                <span className="text-sm">
                  {venue.includes("Chinnaswamy")
                    ? "Batting-friendly, flat"
                    : venue.includes("Chidambaram")
                      ? "Dry, spin-friendly"
                      : venue.includes("Wankhede")
                        ? "Good pace and bounce"
                        : venue.includes("Eden")
                          ? "Balanced, slows down"
                          : "Balanced"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${
                    venue.includes("Chinnaswamy")
                      ? "bg-green-500 w-[85%]"
                      : venue.includes("Chidambaram")
                        ? "bg-purple-500 w-[80%]"
                        : venue.includes("Wankhede")
                          ? "bg-blue-500 w-[70%]"
                          : "bg-yellow-500 w-[60%]"
                  }`}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Match Score</span>
                <span className="text-sm">
                  {venue.includes("Chinnaswamy")
                    ? "180-200"
                    : venue.includes("Chidambaram")
                      ? "160-175"
                      : venue.includes("Wankhede")
                        ? "175-190"
                        : venue.includes("Eden")
                          ? "165-180"
                          : "170-185"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${
                    venue.includes("Chinnaswamy")
                      ? "bg-green-500 w-[90%]"
                      : venue.includes("Chidambaram")
                        ? "bg-purple-500 w-[70%]"
                        : venue.includes("Wankhede")
                          ? "bg-blue-500 w-[85%]"
                          : "bg-yellow-500 w-[75%]"
                  }`}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Toss Decision Impact</span>
                <span className="text-sm">
                  {venue.includes("Chinnaswamy")
                    ? "Medium"
                    : venue.includes("Chidambaram")
                      ? "High"
                      : venue.includes("Wankhede")
                        ? "Very High"
                        : venue.includes("Eden")
                          ? "High"
                          : "Medium"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${
                    venue.includes("Chinnaswamy")
                      ? "bg-yellow-500 w-[60%]"
                      : venue.includes("Chidambaram")
                        ? "bg-orange-500 w-[80%]"
                        : venue.includes("Wankhede")
                          ? "bg-red-500 w-[90%]"
                          : venue.includes("Eden")
                            ? "bg-orange-500 w-[75%]"
                            : "bg-yellow-500 w-[50%]"
                  }`}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Home Team Advantage</span>
                <span className="text-sm">
                  {venue.includes("Chinnaswamy")
                    ? "Strong"
                    : venue.includes("Chidambaram")
                      ? "Very Strong"
                      : venue.includes("Wankhede")
                        ? "Strong"
                        : venue.includes("Eden")
                          ? "Very Strong"
                          : "Moderate"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${
                    venue.includes("Chinnaswamy")
                      ? "bg-blue-500 w-[75%]"
                      : venue.includes("Chidambaram")
                        ? "bg-blue-500 w-[85%]"
                        : venue.includes("Wankhede")
                          ? "bg-blue-500 w-[80%]"
                          : venue.includes("Eden")
                            ? "bg-blue-500 w-[85%]"
                            : "bg-blue-500 w-[65%]"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
