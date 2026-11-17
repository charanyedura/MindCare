"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const EMOTION_CONTROL_STRATEGIES = {
  happy: {
    emoji: "😊",
    title: "Sustain Your Joy",
    tips: [
      {
        technique: "Share the Moment",
        description: "Tell someone about what's making you happy. Sharing joy amplifies it.",
        steps: ["Call a friend", "Share on social media", "Tell a loved one in person"],
        duration: "5-10 min",
      },
      {
        technique: "Gratitude Reflection",
        description: "Write down 3 things you're grateful for right now.",
        steps: ["Get a pen and paper", "Write down what's contributing to your happiness", "Read it aloud"],
        duration: "3-5 min",
      },
      {
        technique: "Celebrate Moment",
        description: "Do something small to celebrate this good feeling.",
        steps: ["Do a little dance", "Enjoy a favorite treat", "Take a moment to breathe it in"],
        duration: "2-5 min",
      },
    ],
  },
  sad: {
    emoji: "😔",
    title: "Support Through Sadness",
    tips: [
      {
        technique: "Self-Compassion Break",
        description: "Treat yourself with the same kindness you'd offer a friend.",
        steps: ["Put your hand on your heart", "Take deep breaths", "Say kind words to yourself"],
        duration: "5 min",
      },
      {
        technique: "Express Your Feelings",
        description: "Write or talk about what's making you sad.",
        steps: ["Journal your feelings", "Talk to someone trusted", "Create art or music"],
        duration: "10-15 min",
      },
      {
        technique: "Gentle Movement",
        description: "Slow, mindful movement can help process sadness.",
        steps: ["Take a quiet walk", "Do gentle stretching", "Practice slow breathing"],
        duration: "10-20 min",
      },
    ],
  },
  angry: {
    emoji: "😡",
    title: "Transform Your Anger",
    tips: [
      {
        technique: "4-7-8 Breathing",
        description: "Calming breathing technique to cool down your nervous system.",
        steps: ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 4 times"],
        duration: "5-10 min",
      },
      {
        technique: "Physical Release",
        description: "Channel anger into safe physical activity.",
        steps: ["Do pushups or jumping jacks", "Hit a pillow", "Go for a run", "Do intense exercise"],
        duration: "10-20 min",
      },
      {
        technique: "Perspective Shift",
        description: "Ask yourself what this situation will feel like in a week.",
        steps: ["Take 3 deep breaths", "Think about the bigger picture", "Identify what you can control"],
        duration: "5 min",
      },
    ],
  },
  anxious: {
    emoji: "😰",
    title: "Calm Your Anxiety",
    tips: [
      {
        technique: "5-4-3-2-1 Grounding",
        description: "Engage all 5 senses to anchor yourself in the present moment.",
        steps: [
          "Name 5 things you see",
          "Name 4 things you touch",
          "Name 3 things you hear",
          "Name 2 things you smell",
          "Name 1 thing you taste",
        ],
        duration: "5-10 min",
      },
      {
        technique: "Progressive Muscle Relaxation",
        description: "Tense and release muscles to reduce physical anxiety.",
        steps: [
          "Clench fists for 5 seconds, then release",
          "Do shoulders next, then legs",
          "Notice the difference between tension and relaxation",
        ],
        duration: "10-15 min",
      },
      {
        technique: "Box Breathing",
        description: "Equal breathing pattern to regulate nervous system.",
        steps: ["Inhale for 4", "Hold for 4", "Exhale for 4", "Hold for 4", "Repeat 5-10 times"],
        duration: "5-10 min",
      },
    ],
  },
  calm: {
    emoji: "😌",
    title: "Maintain Your Calm",
    tips: [
      {
        technique: "Meditation",
        description: "Deepen your calm with guided meditation.",
        steps: ["Find a quiet space", "Sit comfortably", "Focus on your breath", "Let thoughts pass"],
        duration: "10-20 min",
      },
      {
        technique: "Mindful Observation",
        description: "Practice mindfulness by observing something beautiful.",
        steps: ["Look at nature, art, or anything beautiful", "Notice details", "Breathe slowly"],
        duration: "5-10 min",
      },
      {
        technique: "Gratitude Practice",
        description: "Anchor your calm with appreciation.",
        steps: ["List 5 things you're grateful for", "Sit with each one", "Feel the appreciation"],
        duration: "5 min",
      },
    ],
  },
  stressed: {
    emoji: "😤",
    title: "Reduce Your Stress",
    tips: [
      {
        technique: "Quick Tension Release",
        description: "Fast technique to release built-up stress.",
        steps: ["Tense your whole body", "Hold for 3 seconds", "Release and breathe out", "Repeat 3 times"],
        duration: "3-5 min",
      },
      {
        technique: "Yoga Flow",
        description: "Gentle movement to release stress.",
        steps: ["Start with neck rolls", "Shoulder shrugs", "Forward folds", "Child's pose"],
        duration: "15-20 min",
      },
      {
        technique: "Stress Journaling",
        description: "Write out your stressors to clear your mind.",
        steps: ["List your stressors", "For each, write one action you could take", "Prioritize the top 3"],
        duration: "10 min",
      },
    ],
  },
  overwhelmed: {
    emoji: "😵",
    title: "Break Through Overwhelm",
    tips: [
      {
        technique: "Chunking Method",
        description: "Break big problems into small, manageable pieces.",
        steps: ["Write down what's overwhelming you", "Break it into 3-5 smaller tasks", "Start with just one task"],
        duration: "10 min",
      },
      {
        technique: "Immediate Comfort",
        description: "Do something immediately soothing.",
        steps: ["Have a warm drink", "Wrap in a blanket", "Listen to calming music", "Sit in a comfortable place"],
        duration: "5-10 min",
      },
      {
        technique: "Delegation/Help",
        description: "Ask for help - you don't have to do it all.",
        steps: ["Identify what others could help with", "Make a list", "Reach out to someone"],
        duration: "5 min",
      },
    ],
  },
  neutral: {
    emoji: "😐",
    title: "Explore Your Feelings",
    tips: [
      {
        technique: "Feelings Check-in",
        description: "Get curious about what you might be feeling underneath.",
        steps: ["Ask yourself what you're thinking about", "Try to name any subtle emotions", "Journal about it"],
        duration: "5-10 min",
      },
      {
        technique: "Preventive Care",
        description: "Build resilience with healthy habits.",
        steps: ["Hydrate well", "Move your body", "Get sunlight", "Connect with others"],
        duration: "varies",
      },
    ],
  },
}

interface EmotionControlGuideProps {
  emotion: string | null
}

export default function EmotionControlGuide({ emotion }: EmotionControlGuideProps) {
  const [expandedTip, setExpandedTip] = useState(0)

  if (!emotion || !EMOTION_CONTROL_STRATEGIES[emotion as keyof typeof EMOTION_CONTROL_STRATEGIES]) {
    return null
  }

  const strategy = EMOTION_CONTROL_STRATEGIES[emotion as keyof typeof EMOTION_CONTROL_STRATEGIES]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{strategy.emoji}</span>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{strategy.title}</h3>
          <p className="text-sm text-slate-600 capitalize">Techniques to help with {emotion}</p>
        </div>
      </div>

      <div className="space-y-3">
        {strategy.tips.map((tip, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setExpandedTip(expandedTip === index ? -1 : index)}
              className="w-full px-4 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="text-left">
                <p className="font-semibold text-slate-900">{tip.technique}</p>
                <p className="text-xs text-slate-600 mt-1">{tip.duration}</p>
              </div>
              {expandedTip === index ? (
                <ChevronUp className="text-slate-600" />
              ) : (
                <ChevronDown className="text-slate-600" />
              )}
            </button>

            {expandedTip === index && (
              <div className="px-4 py-4 space-y-3 border-t bg-blue-50">
                <p className="text-sm text-slate-700">{tip.description}</p>

                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">Steps:</p>
                  <ol className="space-y-1">
                    {tip.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-slate-700 flex gap-2">
                        <span className="font-semibold text-blue-600">{stepIndex + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Try This Technique Now
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
