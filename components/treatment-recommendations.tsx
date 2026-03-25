"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, Clock, AlertCircle, CheckCircle, Droplets, Sun, Bug, Download } from "lucide-react"

export interface TreatmentData {
  title: string
  urgency: "low" | "medium" | "high"
  steps: string[]
  prevention: string[]
  products: { name: string; type: string }[]
  timing: string
}

interface TreatmentRecommendationsProps {
  treatment: TreatmentData | null
}

const urgencyConfig = {
  low: {
    color: "text-chart-1",
    bgColor: "bg-chart-1/10 border-chart-1/20",
    label: "Low Priority",
  },
  medium: {
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/20",
    label: "Medium Priority",
  },
  high: {
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/20",
    label: "High Priority",
  },
}

export function TreatmentRecommendations({ treatment }: TreatmentRecommendationsProps) {
  if (!treatment) return null

  const urgency = urgencyConfig[treatment.urgency]

  return (
    <Card className="overflow-hidden border-border/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sprout className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Treatment Plan</h2>
          </div>
          <Badge variant="outline" className={`${urgency.bgColor} border ${urgency.color}`}>
            <AlertCircle className={`h-3 w-3 mr-1 ${urgency.color}`} />
            {urgency.label}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Treatment Steps */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Recommended Actions
            </h3>
            <div className="space-y-3">
              {treatment.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            {/* Timing */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time to Apply</p>
                <p className="text-sm font-medium text-foreground">{treatment.timing}</p>
              </div>
            </div>
          </div>

          {/* Products & Prevention */}
          <div className="space-y-4">
            {/* Recommended Products */}
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              Suggested Products
            </h3>
            <div className="space-y-2">
              {treatment.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      {product.type === "fungicide" ? (
                        <Bug className="h-4 w-4 text-primary" />
                      ) : (
                        <Droplets className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{product.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prevention Tips */}
            <h3 className="font-medium text-foreground flex items-center gap-2 mt-4">
              <Sun className="h-4 w-4 text-primary" />
              Prevention Tips
            </h3>
            <ul className="space-y-2">
              {treatment.prevention.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-chart-1 shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Download Treatment Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
