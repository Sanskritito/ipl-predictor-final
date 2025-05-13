"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export function TrainingMetrics() {
  // Sample training metrics data
  const trainingData = [
    { epoch: 1, loss: 0.682, accuracy: 0.58, val_loss: 0.675, val_accuracy: 0.61 },
    { epoch: 2, loss: 0.523, accuracy: 0.64, val_loss: 0.512, val_accuracy: 0.67 },
    { epoch: 3, loss: 0.412, accuracy: 0.71, val_loss: 0.398, val_accuracy: 0.72 },
    { epoch: 4, loss: 0.345, accuracy: 0.75, val_loss: 0.332, val_accuracy: 0.76 },
    { epoch: 5, loss: 0.301, accuracy: 0.78, val_loss: 0.298, val_accuracy: 0.77 },
    { epoch: 6, loss: 0.267, accuracy: 0.8, val_loss: 0.275, val_accuracy: 0.78 },
    { epoch: 7, loss: 0.243, accuracy: 0.81, val_loss: 0.258, val_accuracy: 0.79 },
    { epoch: 8, loss: 0.225, accuracy: 0.82, val_loss: 0.241, val_accuracy: 0.8 },
    { epoch: 9, loss: 0.21, accuracy: 0.83, val_loss: 0.228, val_accuracy: 0.81 },
    { epoch: 10, loss: 0.198, accuracy: 0.84, val_loss: 0.215, val_accuracy: 0.81 },
    { epoch: 11, loss: 0.189, accuracy: 0.84, val_loss: 0.204, val_accuracy: 0.82 },
    { epoch: 12, loss: 0.182, accuracy: 0.85, val_loss: 0.195, val_accuracy: 0.82 },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Training & Validation Loss</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="loss"
                  name="Training Loss"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="val_loss"
                  name="Validation Loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Training & Validation Accuracy</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="epoch" />
                <YAxis domain={[0.5, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip
                  formatter={(value) => [`${(value * 100).toFixed(1)}%`]}
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Training Accuracy"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="val_accuracy"
                  name="Validation Accuracy"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
