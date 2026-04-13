"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { UploadSection } from "@/components/upload-section"
import { CNNVisualization } from "@/components/cnn-visualization"
import { DetectionResult } from "@/components/detection-result"
import { TreatmentRecommendations } from "@/components/treatment-recommendations"
import { ScanHistory } from "@/components/scan-history"
import { HelpSection } from "@/components/help-section"

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectionResult, setDetectionResult] = useState(null)
  const [treatmentData, setTreatmentData] = useState(null)
  const [scanHistory, setScanHistory] = useState([])

  // ✅ IMAGE + FILE SET
  const handleImageSelect = (image, file) => {
    console.log("IMAGE:", image)
    console.log("FILE:", file)

    setSelectedImage(image)
    setSelectedFile(file)

    setDetectionResult(null)
    setTreatmentData(null)
  }

  // ✅ ANALYZE FUNCTION
  const handleAnalyze = async () => {
    console.log("SELECTED FILE:", selectedFile)

    if (!selectedFile) {
      alert("Pehle image upload karo")
      return
    }

    setIsAnalyzing(true)
    setDetectionResult(null)
    setTreatmentData(null)

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      console.log("API Response:", data)

      const diseaseName = data.prediction || "Unknown"

      // ✅ RESULT
      setDetectionResult({
        disease: diseaseName,
        confidence: 90,
        severity: "moderate",
        description: "Detected using AI model",
        affectedAreas: []
      })

      // ✅ TREATMENT
      setTreatmentData({
        title: "Treatment Plan",
        urgency: "medium",
        steps: ["Apply fungicide"],
        prevention: ["Use healthy seeds"],
        products: [],
        timing: "Morning"
      })

      // ✅ HISTORY
      const newItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        disease: diseaseName,
        severity: "moderate",
        confidence: 90,
        thumbnail: selectedImage,
      }

      setScanHistory(prev => [newItem, ...prev])

    } catch (err) {
      console.error(err)
      alert("Backend error aa gaya")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b py-10 text-center">
        <h1 className="text-3xl font-bold">
          Wheat Disease Detection 🌾
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload image and detect disease using AI
        </p>
      </section>

      <main className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            {/* ✅ FINAL FIXED UPLOAD */}
            <UploadSection
              onImageSelect={(image, file) => {
                handleImageSelect(image, file)
              }}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyze}
            />

            <CNNVisualization isProcessing={isAnalyzing} />

            {detectionResult && (
              <DetectionResult
                result={detectionResult}
                imagePreview={selectedImage}
              />
            )}

            {treatmentData && (
              <TreatmentRecommendations treatment={treatmentData} />
            )}

          </div>

          <div className="space-y-6">
            <ScanHistory history={scanHistory} onSelectScan={() => {}} />
            <HelpSection />
          </div>

        </div>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground">
        © 2026 Wheat AI App
      </footer>
    </div>
  )
}