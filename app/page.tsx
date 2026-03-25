"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { UploadSection } from "@/components/upload-section"
import { CNNVisualization } from "@/components/cnn-visualization"
import { DetectionResult, type DetectionResultData } from "@/components/detection-result"
import { TreatmentRecommendations, type TreatmentData } from "@/components/treatment-recommendations"
import { ScanHistory, type ScanHistoryItem } from "@/components/scan-history"
import { HelpSection } from "@/components/help-section"
import { Leaf, ScanLine, Shield, Sprout } from "lucide-react"

// Mock data for demonstration
const mockResults: Record<string, { detection: DetectionResultData; treatment: TreatmentData }> = {
  rust: {
    detection: {
      disease: "Leaf Rust (Puccinia triticina)",
      confidence: 94,
      severity: "moderate",
      description:
        "Leaf rust is a fungal disease that appears as orange-brown pustules on the leaf surface. It can reduce photosynthesis and grain yield if left untreated. Early intervention is recommended.",
      affectedAreas: [
        { x: 25, y: 30, width: 20, height: 25 },
        { x: 55, y: 45, width: 15, height: 20 },
      ],
    },
    treatment: {
      title: "Leaf Rust Treatment Plan",
      urgency: "medium",
      steps: [
        "Apply a fungicide containing propiconazole or tebuconazole at the recommended rate",
        "Ensure thorough coverage of all leaf surfaces, especially the underside",
        "Repeat application after 14-21 days if conditions remain favorable for disease",
        "Remove and destroy severely infected plant material",
      ],
      prevention: [
        "Plant resistant wheat varieties when available",
        "Avoid excessive nitrogen fertilization",
        "Ensure proper plant spacing for air circulation",
        "Rotate crops to break disease cycles",
      ],
      products: [
        { name: "Propiconazole 25% EC", type: "fungicide" },
        { name: "Tebuconazole 250 SC", type: "fungicide" },
        { name: "Azoxystrobin 23% SC", type: "fungicide" },
      ],
      timing: "Early morning or late evening when temperatures are cooler",
    },
  },
  mildew: {
    detection: {
      disease: "Powdery Mildew (Blumeria graminis)",
      confidence: 89,
      severity: "mild",
      description:
        "Powdery mildew appears as white, powdery fungal growth on leaf surfaces. In early stages, it can be managed effectively with proper treatment.",
      affectedAreas: [{ x: 30, y: 20, width: 30, height: 35 }],
    },
    treatment: {
      title: "Powdery Mildew Treatment Plan",
      urgency: "low",
      steps: [
        "Apply sulfur-based fungicide or potassium bicarbonate spray",
        "Improve air circulation around plants",
        "Reduce nitrogen fertilizer application",
      ],
      prevention: [
        "Choose mildew-resistant varieties",
        "Avoid overcrowding plants",
        "Water at the base of plants, not on leaves",
      ],
      products: [
        { name: "Sulfur 80% WP", type: "fungicide" },
        { name: "Potassium Bicarbonate", type: "organic" },
      ],
      timing: "Apply in the morning when dew has dried",
    },
  },
  healthy: {
    detection: {
      disease: "Healthy Wheat Leaf",
      confidence: 98,
      severity: "healthy",
      description:
        "This wheat leaf shows no signs of disease or pest damage. The leaf tissue appears healthy with normal coloration and structure. Continue regular monitoring.",
      affectedAreas: [],
    },
    treatment: {
      title: "Preventive Care Plan",
      urgency: "low",
      steps: [
        "Continue regular field monitoring every 1-2 weeks",
        "Maintain optimal irrigation and fertilization schedule",
        "Scout for early signs of pest activity",
      ],
      prevention: [
        "Maintain good field hygiene",
        "Use certified disease-free seeds",
        "Practice crop rotation",
        "Monitor weather conditions for disease-favorable periods",
      ],
      products: [
        { name: "Balanced NPK Fertilizer", type: "fertilizer" },
        { name: "Micronutrient Spray", type: "supplement" },
      ],
      timing: "Follow standard agricultural calendar for your region",
    },
  },
}

const mockHistory: ScanHistoryItem[] = [
  {
    id: "1",
    date: "Mar 24, 2026",
    disease: "Leaf Rust",
    severity: "moderate",
    confidence: 92,
    thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    date: "Mar 22, 2026",
    disease: "Healthy",
    severity: "healthy",
    confidence: 97,
    thumbnail: "https://images.unsplash.com/photo-1530042745-dfd9d6238a17?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    date: "Mar 20, 2026",
    disease: "Powdery Mildew",
    severity: "mild",
    confidence: 88,
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop",
  },
]

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResultData | null>(null)
  const [treatmentData, setTreatmentData] = useState<TreatmentData | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>(mockHistory)

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image)
    setDetectionResult(null)
    setTreatmentData(null)
  }, [])

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setDetectionResult(null)
    setTreatmentData(null)

    // Simulate CNN processing
    setTimeout(() => {
      // Randomly select a result for demo
      const resultKeys = Object.keys(mockResults)
      const randomKey = resultKeys[Math.floor(Math.random() * resultKeys.length)]
      const result = mockResults[randomKey]

      setDetectionResult(result.detection)
      setTreatmentData(result.treatment)
      setIsAnalyzing(false)

      // Add to history
      const newHistoryItem: ScanHistoryItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        disease: result.detection.disease.split(" (")[0],
        severity: result.detection.severity,
        confidence: result.detection.confidence,
        thumbnail: selectedImage,
      }
      setScanHistory((prev) => [newHistoryItem, ...prev])
    }, 3500)
  }, [selectedImage])

  const handleSelectScan = useCallback((id: string) => {
    console.log("Selected scan:", id)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40" id="home">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container relative px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Disease Detection</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
              Protect Your Wheat Crop with{" "}
              <span className="text-primary">Intelligent Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Upload a photo of your wheat leaves and our CNN-powered system will instantly detect
              diseases, assess severity, and provide actionable treatment recommendations.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ScanLine className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">95%+</p>
                  <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">12+</p>
                  <p className="text-sm text-muted-foreground">Diseases Covered</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Scans Performed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container px-4 py-8 md:py-12" id="scan">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Processing */}
          <div className="lg:col-span-2 space-y-6">
            <UploadSection
              onImageSelect={handleImageSelect}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyze}
            />

            <CNNVisualization isProcessing={isAnalyzing} />

            {detectionResult && (
              <DetectionResult result={detectionResult} imagePreview={selectedImage} />
            )}

            {treatmentData && <TreatmentRecommendations treatment={treatmentData} />}
          </div>

          {/* Right Column - History & Help */}
          <div className="space-y-6">
            <ScanHistory history={scanHistory} onSelectScan={handleSelectScan} />
            <HelpSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">
                LeafGuard<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering farmers with AI-driven crop protection
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 LeafGuard AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
