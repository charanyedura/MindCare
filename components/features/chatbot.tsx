"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CameraWidget from "./camera-widget"
import EmotionInsights from "./emotion-insights"
import { Loader, Lightbulb, ChevronDown, ChevronUp, Sparkles } from "lucide-react"

export default function ChatBot({ user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm your AI emotion control companion. I'm here to provide personalized advice for managing your emotions. How are you feeling today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [emotionAnalysis, setEmotionAnalysis] = useState(null)
  const messagesEndRef = useRef(null)

  const emotionControlSuggestions = {
    anxiety: {
      emoji: "😰",
      color: "purple",
      techniques: [
        {
          title: "4-7-8 Breathing",
          description: "Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 3-4 times.",
        },
        {
          title: "Grounding Technique",
          description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
        },
        {
          title: "Progressive Muscle Relaxation",
          description: "Tense and relax each muscle group from toes to head, holding for 5 seconds each.",
        },
      ],
    },
    stress: {
      emoji: "😤",
      color: "orange",
      techniques: [
        {
          title: "Time Management",
          description: "Break tasks into smaller steps. Focus on one thing at a time and prioritize what's urgent.",
        },
        {
          title: "Physical Activity",
          description: "Take a 10-minute walk or do light stretching to release tension and clear your mind.",
        },
        {
          title: "Mindful Break",
          description: "Step away for 5 minutes. Close your eyes, breathe deeply, and let go of racing thoughts.",
        },
      ],
    },
    anger: {
      emoji: "😡",
      color: "red",
      techniques: [
        {
          title: "Count to 10",
          description: "Pause and count slowly to 10 before responding. This gives your rational brain time to engage.",
        },
        {
          title: "Physical Release",
          description:
            "Channel anger into exercise, punch a pillow, or squeeze a stress ball to release tension safely.",
        },
        {
          title: "Reframe Thoughts",
          description:
            "Ask yourself: 'Will this matter in a week?' Challenge angry thoughts with rational alternatives.",
        },
      ],
    },
    sadness: {
      emoji: "😔",
      color: "blue",
      techniques: [
        {
          title: "Reach Out",
          description: "Connect with a friend or loved one. Social support is powerful for lifting mood.",
        },
        {
          title: "Gratitude Practice",
          description: "Write down 3 things you're grateful for today, no matter how small they seem.",
        },
        {
          title: "Self-Compassion",
          description: "Treat yourself with kindness. Say to yourself what you'd say to a friend feeling this way.",
        },
      ],
    },
    overwhelmed: {
      emoji: "😵",
      color: "indigo",
      techniques: [
        {
          title: "Brain Dump",
          description: "Write everything on your mind on paper. Getting it out helps organize and prioritize thoughts.",
        },
        {
          title: "One Thing Rule",
          description: "Choose just ONE task to complete right now. Ignore everything else until it's done.",
        },
        {
          title: "Say No",
          description: "It's okay to decline new commitments. Protect your energy and set healthy boundaries.",
        },
      ],
    },
    calm: {
      emoji: "😌",
      color: "green",
      techniques: [
        {
          title: "Maintain Balance",
          description: "Keep up healthy habits: regular sleep, nutritious meals, and daily movement.",
        },
        {
          title: "Mindfulness Practice",
          description: "Spend 5-10 minutes in meditation or quiet reflection to maintain inner peace.",
        },
        {
          title: "Positive Reinforcement",
          description: "Acknowledge what's working well. Celebrate small wins and progress you've made.",
        },
      ],
    },
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const analyzeEmotion = async (userMessage) => {
    try {
      const response = await fetch("/api/emotion-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          previousContext: messages
            .filter((m) => m.sender === "user")
            .slice(-2)
            .map((m) => m.text)
            .join(" "),
        }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setEmotionAnalysis(analysis)
        return analysis
      }
    } catch (error) {
      console.error("Emotion analysis error:", error)
    }
    return null
  }

  const generateAIResponse = async (userMessage) => {
    try {
      setIsLoading(true)
      const analysisPromise = analyzeEmotion(userMessage)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userName: user?.name || "Friend",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      await analysisPromise
      return data.response
    } catch (error) {
      console.error("Error getting AI response:", error)
      return "I appreciate you sharing your feelings. Remember, taking care of your emotional wellbeing is important. What specific emotion would you like help managing today?"
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { id: Date.now(), sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setEmotionAnalysis(null)

    setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: "Thinking...", isLoading: true }])

    const aiResponse = await generateAIResponse(input)

    setMessages((prev) => {
      const filtered = prev.filter((msg) => !msg.isLoading)
      return [...filtered, { id: Date.now(), sender: "bot", text: aiResponse }]
    })
  }

  const handleEmotionDetected = (emotion, message) => {
    const emotionMessage = { id: Date.now(), sender: "bot", text: message }
    setMessages((prev) => [...prev, emotionMessage])
  }

  const handleEmotionClick = (emotion) => {
    const emotionData = emotionControlSuggestions[emotion]
    if (emotionData) {
      setInput(`How do I manage ${emotion}?`)
    }
  }

  const quickSuggestions = [
    "I'm feeling stressed",
    "How do I manage anxiety?",
    "I'm feeling overwhelmed",
    "Help me with anger management",
    "How to stay calm?",
  ]

  return (
    <div className="flex flex-col h-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={24} className="text-blue-600" />
          AI Emotion Control Chat
        </h2>
        <p className="text-sm text-slate-600">Get personalized advice for managing your emotions</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 overflow-hidden">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="text-blue-600" size={20} />
            <h3 className="font-bold text-slate-900">Emotion Control Techniques</h3>
          </div>
          {showSuggestions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showSuggestions && (
          <div className="px-4 pb-4 space-y-3">
            <p className="text-xs text-slate-600">
              Click on any emotion below to learn proven techniques for managing it effectively.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(emotionControlSuggestions).map(([emotion, data]) => (
                <button
                  key={emotion}
                  onClick={() => handleEmotionClick(emotion)}
                  className={`bg-white hover:bg-${data.color}-50 border border-${data.color}-200 rounded-lg p-3 text-left transition-all hover:shadow-md group`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{data.emoji}</span>
                    <span className="font-semibold text-slate-900 capitalize text-sm">{emotion}</span>
                  </div>
                  <p className="text-xs text-slate-600">{data.techniques.length} techniques</p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200 mt-4">
              <h4 className="font-semibold text-slate-900 mb-2 text-sm">Quick Tips for All Emotions:</h4>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Take deep breaths - it signals your body to relax</li>
                <li>• Stay hydrated and maintain regular meals</li>
                <li>• Get 7-9 hours of sleep for emotional regulation</li>
                <li>• Move your body - even a short walk helps</li>
                <li>• Talk to someone you trust about how you feel</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <CameraWidget onEmotionDetected={handleEmotionDetected} />

      {emotionAnalysis && (
        <EmotionInsights
          emotion={emotionAnalysis.detectedEmotion}
          intensity={emotionAnalysis.emotionIntensity}
          cause={emotionAnalysis.primaryCause}
          techniques={emotionAnalysis.suggestedTechniques}
          affirmation={emotionAnalysis.affirmation}
        />
      )}

      <div className="flex-1 overflow-y-auto space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50 max-h-96">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : msg.isLoading
                    ? "bg-slate-200 text-slate-700 flex items-center gap-2"
                    : "bg-white text-slate-900 border border-slate-200"
              }`}
            >
              {msg.isLoading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  <span>{msg.text}</span>
                </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 font-medium">Quick suggestions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(suggestion)
                }}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message or feeling..."
          disabled={isLoading}
        />
        <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
          {isLoading ? <Loader size={18} className="animate-spin" /> : "Send"}
        </Button>
      </div>
    </div>
  )
}
