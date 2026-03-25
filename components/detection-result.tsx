"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, XCircle, Info, Leaf } from "lucide-react"
import Image from "next/image"

export interface DetectionResultData {
  disease: string
  confidence: number
  severity: "healthy" | "mild" | "moderate" | "severe"
  description: string
  affectedAreas: { x: number; y: number; width: number; height: number }[]
}

interface DetectionResultProps {
  result: DetectionResultData | null
  imagePreview: string
}

const severityConfig = {
  healthy: {
    color: "bg-chart-1 text-chart-1",
    bgColor: "bg-chart-1/10",
    icon: CheckCircle2,
    label: "Healthy",
  },
  mild: {
    color: "bg-accent text-accent",
    bgColor: "bg-accent/10",
    icon: Info,
    label: "Mild Infection",
  },
  moderate: {
    color: "bg-chart-5 text-chart-5",
    bgColor: "bg-chart-5/10",
    icon: AlertTriangle,
    label: "Moderate Infection",
  },
  severe: {
    color: "bg-destructive text-destructive",
    bgColor: "bg-destructive/10",
    icon: XCircle,
    label: "Severe Infection",
  },
}

export function DetectionResult({ result, imagePreview }: DetectionResultProps) {
  if (!result) return null

  const config = severityConfig[result.severity]
  const Icon = config.icon

  return (
    <Card className="overflow-hidden border-border/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Detection Results</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image with highlighted areas */}
          <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
            <Image
              src={imagePreview}
              alt="Analyzed wheat leaf"
              width={400}
              height={300}
              className="w-full h-64 object-contain"
            />
            {/* Bounding boxes for affected areas */}
            {result.affectedAreas.map((area, index) => (
              <div
                key={index}
                className="absolute border-2 border-destructive/80 rounded bg-destructive/10"
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded">
                  Infected Area
                </div>
              </div>
            ))}
          </div>

          {/* Result Details */}
          <div className="space-y-4">
            {/* Disease Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Detected Condition</span>
                <Badge variant="outline" className={config.bgColor}>
                  <Icon className={`h-3 w-3 mr-1 ${config.color.split(" ")[1]}`} />
                  {config.label}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{result.disease}</h3>
            </div>

            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence Score</span>
                <span className="text-sm font-semibold text-primary">{result.confidence}%</span>
              </div>
              <Progress value={result.confidence} className="h-3" />
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                What this means
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
