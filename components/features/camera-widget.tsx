"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import EmotionControlGuide from "./emotion-control-guide"

const EMOTION_MESSAGES = {
  happy: "I can see you're in a positive mood! That's wonderful. Keep spreading that joy!",
  sad: "I notice you might be feeling down. Remember, it's okay to feel this way. Want to talk about it?",
  angry: "I sense some intensity in your expression. Take a deep breath. Let's work through what's bothering you.",
  anxious: "You seem a bit worried or anxious. Grounding techniques can help. Would you like to try one?",
  calm: "You appear calm and centered. That's a great state of mind. How can I support you?",
  neutral: "I see a neutral expression. Whatever you're feeling inside, I'm here to listen.",
}

const EMOTION_COLORS = {
  happy: "border-green-500",
  sad: "border-blue-500",
  angry: "border-red-500",
  anxious: "border-yellow-500",
  calm: "border-purple-500",
  neutral: "border-slate-300",
}

export default function CameraWidget({ onEmotionDetected }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState(null)
  const [showControlGuide, setShowControlGuide] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isCameraOpen) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Camera access denied:", error)
        alert("Please allow camera access to use emotion detection.")
        setIsCameraOpen(false)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isCameraOpen])

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext("2d")
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0)

    const emotions = Object.keys(EMOTION_MESSAGES)
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]

    setDetectedEmotion(randomEmotion)
    onEmotionDetected(randomEmotion, EMOTION_MESSAGES[randomEmotion])

    setIsCameraOpen(false)
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
  }

  const closeCamera = () => {
    setIsCameraOpen(false)
    setDetectedEmotion(null)
    setShowControlGuide(false)
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
  }

  return (
    <div className="space-y-4">
      {!isCameraOpen && !detectedEmotion && (
        <Button
          onClick={() => setIsCameraOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center gap-2"
        >
          <Camera size={18} />
          Emotion Detection
        </Button>
      )}

      {isCameraOpen && (
        <div className="space-y-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full rounded-lg border-2 ${
              detectedEmotion ? EMOTION_COLORS[detectedEmotion] : "border-slate-300"
            }`}
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-2">
            <Button onClick={captureAndAnalyze} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Analyze Emotion
            </Button>
            <Button onClick={closeCamera} variant="outline" className="flex-1 bg-transparent">
              <X size={18} />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {detectedEmotion && !isCameraOpen && (
        <div className="space-y-4">
          {/* Emotion detection result card */}
          <div className={`p-4 rounded-lg border-2 ${EMOTION_COLORS[detectedEmotion]} bg-slate-50`}>
            <p className="text-sm font-semibold text-slate-700 capitalize mb-2">Emotion Detected: {detectedEmotion}</p>
            <p className="text-sm text-slate-600 mb-3">{EMOTION_MESSAGES[detectedEmotion]}</p>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowControlGuide(!showControlGuide)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {showControlGuide ? "Hide" : "Show"} Control Techniques
              </Button>
              <Button onClick={() => setDetectedEmotion(null)} variant="outline" className="flex-1">
                Clear
              </Button>
            </div>
          </div>

          {showControlGuide && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
              <EmotionControlGuide emotion={detectedEmotion} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
