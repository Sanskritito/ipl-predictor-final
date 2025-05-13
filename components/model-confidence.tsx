"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ModelConfidenceProps {
  modelConfidence: {
    randomForest: number
    neuralNetwork: number
    deepLearning: number
  }
  theme: string
}

export function ModelConfidence({ modelConfidence, theme }: ModelConfidenceProps) {
  const [chartType, setChartType] = useState<"bar" | "radar">("bar")

  // Calculate average confidence
  const averageConfidence = Math.round(
    (modelConfidence.randomForest + modelConfidence.neuralNetwork + modelConfidence.deepLearning) / 3,
  )

  // Determine confidence level with higher thresholds
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 85) return "Very High"
    if (confidence >= 75) return "High"
    if (confidence >= 65) return "Medium"
    return "Low"
  }

  const confidenceLevel = getConfidenceLevel(averageConfidence)

  // Get appropriate color based on confidence level
  const getConfidenceColor = (level: string) => {
    if (level === "Very High") return theme === "dark" ? "text-green-400" : "text-green-700"
    if (level === "High") return theme === "dark" ? "text-emerald-400" : "text-emerald-600"
    if (level === "Medium") return theme === "dark" ? "text-yellow-400" : "text-yellow-600"
    return theme === "dark" ? "text-red-400" : "text-red-600"
  }

  const confidenceColor = getConfidenceColor(confidenceLevel)

  const confidenceData = [
    { name: "Random Forest", value: modelConfidence.randomForest },
    { name: "Neural Network", value: modelConfidence.neuralNetwork },
    { name: "Deep Learning", value: modelConfidence.deepLearning },
    {
      name: "Ensemble",
      value: Math.round(
        modelConfidence.randomForest * 0.3 + modelConfidence.neuralNetwork * 0.3 + modelConfidence.deepLearning * 0.4,
      ),
    },
  ]

  const radarData = [
    {
      model: "Confidence",
      "Random Forest": modelConfidence.randomForest,
      "Neural Network": modelConfidence.neuralNetwork,
      "Deep Learning": modelConfidence.deepLearning,
      Ensemble: Math.round(
        modelConfidence.randomForest * 0.3 + modelConfidence.neuralNetwork * 0.3 + modelConfidence.deepLearning * 0.4,
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-medium ${theme === "dark" ? "" : "text-gray-800"}`}>Model Confidence</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === "bar"
                ? theme === "dark"
                  ? "bg-blue-500/30 text-blue-200"
                  : "bg-blue-100 text-blue-700"
                : theme === "dark"
                  ? "bg-white/10 text-gray-300"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType("radar")}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === "radar"
                ? theme === "dark"
                  ? "bg-blue-500/30 text-blue-200"
                  : "bg-blue-100 text-blue-700"
                : theme === "dark"
                  ? "bg-white/10 text-gray-300"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            Radar
          </button>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">Overall Confidence</span>
            <div className="text-2xl font-bold">
              <span className={confidenceColor}>{confidenceLevel}</span>
              <span className="text-sm ml-2 opacity-75">({averageConfidence}%)</span>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              confidenceLevel === "Very High"
                ? theme === "dark"
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-green-100 border border-green-200"
                : confidenceLevel === "High"
                  ? theme === "dark"
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-emerald-100 border border-emerald-200"
                  : confidenceLevel === "Medium"
                    ? theme === "dark"
                      ? "bg-yellow-500/20 border border-yellow-500/30"
                      : "bg-yellow-100 border border-yellow-200"
                    : theme === "dark"
                      ? "bg-red-500/20 border border-red-500/30"
                      : "bg-red-100 border border-red-200"
            }`}
          >
            <span className={`text-sm font-medium ${confidenceColor}`}>
              {confidenceLevel === "Very High"
                ? "Strong Prediction"
                : confidenceLevel === "High"
                  ? "Reliable Prediction"
                  : confidenceLevel === "Medium"
                    ? "Moderate Confidence"
                    : "Uncertain"}
            </span>
          </div>
        </div>

        <div className="h-64">
          {chartType === "bar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData}>
                <XAxis dataKey="name" stroke={theme === "dark" ? "#94a3b8" : "#64748b"} fontSize={12} />
                <YAxis
                  stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                  fontSize={12}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                  formatter={(value) => [`${value}%`, "Confidence"]}
                />
                <Bar dataKey="value" fill={theme === "dark" ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
                <PolarAngleAxis dataKey="model" stroke={theme === "dark" ? "#e5e7eb" : "#374151"} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={theme === "dark" ? "#4b5563" : "#d1d5db"} />
                <Radar
                  name="Random Forest"
                  dataKey="Random Forest"
                  stroke={theme === "dark" ? "#3b82f6" : "#2563eb"}
                  fill={theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.2)"}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Neural Network"
                  dataKey="Neural Network"
                  stroke={theme === "dark" ? "#8b5cf6" : "#7c3aed"}
                  fill={theme === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(124, 58, 237, 0.2)"}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Deep Learning"
                  dataKey="Deep Learning"
                  stroke={theme === "dark" ? "#ec4899" : "#db2777"}
                  fill={theme === "dark" ? "rgba(236, 72, 153, 0.2)" : "rgba(219, 39, 119, 0.2)"}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Ensemble"
                  dataKey="Ensemble"
                  stroke={theme === "dark" ? "#10b981" : "#059669"}
                  fill={theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)"}
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: theme === "dark" ? "#e2e8f0" : "#1e293b" }}
                  formatter={(value) => [`${value}%`, "Confidence"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
