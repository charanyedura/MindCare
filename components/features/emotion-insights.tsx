"use client"

import { AlertCircle, Lightbulb, Heart } from "lucide-react"

const EMOTION_COLORS = {
  anxiety: "bg-purple-50 border-purple-200 text-purple-900",
  stress: "bg-orange-50 border-orange-200 text-orange-900",
  anger: "bg-red-50 border-red-200 text-red-900",
  sadness: "bg-blue-50 border-blue-200 text-blue-900",
  overwhelmed: "bg-indigo-50 border-indigo-200 text-indigo-900",
  calm: "bg-green-50 border-green-200 text-green-900",
  happy: "bg-yellow-50 border-yellow-200 text-yellow-900",
  confused: "bg-gray-50 border-gray-200 text-gray-900",
  frustrated: "bg-rose-50 border-rose-200 text-rose-900",
  neutral: "bg-slate-50 border-slate-200 text-slate-900",
}

const EMOTION_EMOJIS = {
  anxiety: "😰",
  stress: "😤",
  anger: "😡",
  sadness: "😔",
  overwhelmed: "😵",
  calm: "😌",
  happy: "😊",
  confused: "🤔",
  frustrated: "😠",
  neutral: "😐",
}

interface EmotionInsightsProps {
  emotion: string
  intensity: number
  cause: string
  techniques: Array<{
    name: string
    description: string
    duration: string
  }>
  affirmation: string
}

export default function EmotionInsights({ emotion, intensity, cause, techniques, affirmation }: EmotionInsightsProps) {
  const colorClass = EMOTION_COLORS[emotion as keyof typeof EMOTION_COLORS] || EMOTION_COLORS.neutral
  const emoji = EMOTION_EMOJIS[emotion as keyof typeof EMOTION_EMOJIS] || "😐"

  return (
    <div className={`border-l-4 rounded-lg p-4 space-y-4 ${colorClass}`}>
      {/* Header with emotion and intensity */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <div>
            <h3 className="font-bold capitalize text-lg">{emotion}</h3>
            <p className="text-sm opacity-75">Intensity: {intensity}/10</p>
          </div>
        </div>
      </div>

      {/* Affirmation */}
      <div className="bg-white/60 rounded p-3 flex items-start gap-2">
        <Heart size={18} className="mt-1 flex-shrink-0" />
        <p className="text-sm italic">{affirmation}</p>
      </div>

      {/* Cause */}
      <div>
        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
          <AlertCircle size={16} />
          What might be causing this:
        </h4>
        <p className="text-sm opacity-90">{cause}</p>
      </div>

      {/* Coping Techniques */}
      <div>
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <Lightbulb size={16} />
          Recommended techniques:
        </h4>
        <div className="space-y-2">
          {techniques.map((tech, index) => (
            <div key={index} className="bg-white/60 rounded p-3 border border-current/10">
              <p className="font-medium text-sm">
                {index + 1}. {tech.name} ({tech.duration})
              </p>
              <p className="text-sm opacity-85 mt-1">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
