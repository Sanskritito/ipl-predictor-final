"use client"

import { Card, CardContent } from "@/components/ui/card"

export function ModelArchitecture() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Deep Learning Model Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Transformer-based architecture optimized for IPL match prediction
              </p>
            </div>

            <div className="w-full max-w-3xl">
              <div className="flex flex-col space-y-4">
                {/* Input Layer */}
                <div className="flex justify-center">
                  <div className="w-3/4 rounded-lg bg-blue-500/20 p-4 text-center">
                    <span className="font-medium">Input Layer</span>
                    <p className="text-xs text-muted-foreground">Match features, team stats, player data</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-muted"></div>
                </div>

                {/* Embedding Layer */}
                <div className="flex justify-center">
                  <div className="w-3/4 rounded-lg bg-purple-500/20 p-4 text-center">
                    <span className="font-medium">Embedding Layer</span>
                    <p className="text-xs text-muted-foreground">512 dimensions</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-muted"></div>
                </div>

                {/* Transformer Blocks */}
                <div className="flex justify-center">
                  <div className="w-3/4 space-y-2">
                    <div className="rounded-lg bg-green-500/20 p-4 text-center">
                      <span className="font-medium">Transformer Block 1</span>
                      <p className="text-xs text-muted-foreground">Multi-head attention + Feed Forward</p>
                    </div>
                    <div className="rounded-lg bg-green-500/20 p-4 text-center">
                      <span className="font-medium">Transformer Block 2</span>
                      <p className="text-xs text-muted-foreground">Multi-head attention + Feed Forward</p>
                    </div>
                    <div className="rounded-lg bg-green-500/20 p-4 text-center">
                      <span className="font-medium">Transformer Block 3</span>
                      <p className="text-xs text-muted-foreground">Multi-head attention + Feed Forward</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-muted"></div>
                </div>

                {/* Dense Layers */}
                <div className="flex justify-center">
                  <div className="w-3/4 space-y-2">
                    <div className="rounded-lg bg-yellow-500/20 p-4 text-center">
                      <span className="font-medium">Dense Layer</span>
                      <p className="text-xs text-muted-foreground">256 units, ReLU activation</p>
                    </div>
                    <div className="rounded-lg bg-yellow-500/20 p-4 text-center">
                      <span className="font-medium">Dropout Layer</span>
                      <p className="text-xs text-muted-foreground">Rate: 0.3</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-muted"></div>
                </div>

                {/* Output Layer */}
                <div className="flex justify-center">
                  <div className="w-3/4 rounded-lg bg-red-500/20 p-4 text-center">
                    <span className="font-medium">Output Layer</span>
                    <p className="text-xs text-muted-foreground">Sigmoid activation (win probability)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>Total Parameters: 12.8M | Training Time: 4.2 hours on GPU</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
