"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function PredictionSummary() {
  // Sample data for prediction accuracy by team
  const teamAccuracyData = [
    { name: "CSK", accuracy: 84, matches: 24 },
    { name: "MI", accuracy: 82, matches: 26 },
    { name: "RCB", accuracy: 78, matches: 22 },
    { name: "KKR", accuracy: 80, matches: 23 },
    { name: "DC", accuracy: 76, matches: 21 },
    { name: "PBKS", accuracy: 72, matches: 20 },
    { name: "RR", accuracy: 75, matches: 22 },
    { name: "SRH", accuracy: 77, matches: 21 },
    { name: "GT", accuracy: 81, matches: 23 },
    { name: "LSG", accuracy: 79, matches: 22 },
  ]

  // Sample data for prediction distribution
  const predictionDistributionData = [
    { name: "Correct", value: 78, color: "#10b981" },
    { name: "Incorrect", value: 22, color: "#ef4444" },
  ]

  // Sample data for prediction confidence
  const confidenceData = [
    { name: "Very High (90%+)", value: 32, color: "#10b981" },
    { name: "High (75-90%)", value: 41, color: "#3b82f6" },
    { name: "Medium (60-75%)", value: 18, color: "#f59e0b" },
    { name: "Low (<60%)", value: 9, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Predictions</CardTitle>
            <CardDescription>All-time prediction count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,284</div>
            <p className="text-sm text-muted-foreground">Across all IPL seasons</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Accuracy</CardTitle>
            <CardDescription>Correct predictions percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">78%</div>
            <p className="text-sm text-muted-foreground">+3.2% vs previous season</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Confidence</CardTitle>
            <CardDescription>Average prediction confidence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-500">82%</div>
            <p className="text-sm text-muted-foreground">Based on model ensemble</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accuracy">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accuracy">Team Accuracy</TabsTrigger>
          <TabsTrigger value="distribution">Prediction Distribution</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Levels</TabsTrigger>
        </TabsList>
        <TabsContent value="accuracy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy by Team</CardTitle>
              <CardDescription>How accurate our models are for each team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamAccuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Accuracy"]}
                      contentStyle={{
                        borderRadius: "0.5rem",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy (%)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Distribution</CardTitle>
              <CardDescription>Correct vs incorrect predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={predictionDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {predictionDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{
                        borderRadius: "0.5rem",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Confidence Levels</CardTitle>
              <CardDescription>Distribution of prediction confidence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={confidenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {confidenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{
                        borderRadius: "0.5rem",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
