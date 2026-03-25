"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, ChevronRight, CheckCircle2, AlertTriangle, XCircle, Calendar } from "lucide-react"
import Image from "next/image"

export interface ScanHistoryItem {
  id: string
  date: string
  disease: string
  severity: "healthy" | "mild" | "moderate" | "severe"
  confidence: number
  thumbnail: string
}

interface ScanHistoryProps {
  history: ScanHistoryItem[]
  onSelectScan: (id: string) => void
}

const severityIcons = {
  healthy: CheckCircle2,
  mild: AlertTriangle,
  moderate: AlertTriangle,
  severe: XCircle,
}

const severityColors = {
  healthy: "text-chart-1 bg-chart-1/10",
  mild: "text-accent bg-accent/10",
  moderate: "text-chart-5 bg-chart-5/10",
  severe: "text-destructive bg-destructive/10",
}

export function ScanHistory({ history, onSelectScan }: ScanHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="overflow-hidden border-border/50 shadow-lg" id="reports">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <History className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Scan History</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No scans yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload your first wheat leaf image to get started
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-border/50 shadow-lg" id="reports">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <History className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Scan History</h2>
          </div>
          <Badge variant="secondary">{history.length} scans</Badge>
        </div>

        <div className="space-y-3">
          {history.map((scan) => {
            const Icon = severityIcons[scan.severity]
            return (
              <button
                key={scan.id}
                onClick={() => onSelectScan(scan.id)}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/50 transition-colors text-left"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image
                    src={scan.thumbnail}
                    alt={scan.disease}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{scan.disease}</h4>
                    <div className={`flex items-center justify-center h-5 w-5 rounded-full ${severityColors[scan.severity]}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {scan.date}
                    </span>
                    <span>{scan.confidence}% confidence</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </button>
            )
          })}
        </div>

        {history.length > 3 && (
          <Button variant="ghost" className="w-full mt-4 text-primary">
            View All History
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
