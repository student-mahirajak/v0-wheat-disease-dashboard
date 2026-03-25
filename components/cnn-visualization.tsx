"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain } from "lucide-react"

interface CNNVisualizationProps {
  isProcessing: boolean
}

const layers = [
  { name: "Input", nodes: 4 },
  { name: "Conv1", nodes: 6 },
  { name: "Pool1", nodes: 4 },
  { name: "Conv2", nodes: 8 },
  { name: "Pool2", nodes: 4 },
  { name: "Dense", nodes: 6 },
  { name: "Output", nodes: 3 },
]

export function CNNVisualization({ isProcessing }: CNNVisualizationProps) {
  const [activeLayer, setActiveLayer] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isProcessing) {
      setActiveLayer(0)
      setProgress(0)
      return
    }

    const layerInterval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % layers.length)
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 2
      })
    }, 60)

    return () => {
      clearInterval(layerInterval)
      clearInterval(progressInterval)
    }
  }, [isProcessing])

  if (!isProcessing) return null

  return (
    <Card className="overflow-hidden border-border/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">CNN Processing</h2>
        </div>

        {/* Neural Network Visualization */}
        <div className="relative bg-muted/30 rounded-xl p-6 mb-4 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            {layers.map((layer, layerIndex) => (
              <div key={layer.name} className="flex flex-col items-center gap-2">
                <div className="flex flex-col gap-1">
                  {Array.from({ length: layer.nodes }).map((_, nodeIndex) => (
                    <div
                      key={nodeIndex}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                        layerIndex <= activeLayer
                          ? "bg-primary shadow-lg shadow-primary/30"
                          : "bg-border"
                      }`}
                      style={{
                        animationDelay: `${nodeIndex * 50}ms`,
                        transform: layerIndex === activeLayer ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium">
                  {layer.name}
                </span>
              </div>
            ))}
          </div>

          {/* Connection Lines Animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset={`${progress}%`} stopColor="var(--primary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Analyzing image features...</span>
            <span className="font-medium text-primary">{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Feature Extraction</span>
            <span>Classification</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
