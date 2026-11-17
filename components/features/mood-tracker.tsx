"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const MOODS = [
  { emoji: "😄", label: "Happy", value: "happy", color: "bg-yellow-100 border-yellow-400" },
  { emoji: "😊", label: "Good", value: "good", color: "bg-green-100 border-green-400" },
  { emoji: "😐", label: "Okay", value: "okay", color: "bg-blue-100 border-blue-400" },
  { emoji: "😔", label: "Sad", value: "sad", color: "bg-purple-100 border-purple-400" },
  { emoji: "😰", label: "Anxious", value: "anxious", color: "bg-orange-100 border-orange-400" },
  { emoji: "😤", label: "Stressed", value: "stressed", color: "bg-red-100 border-red-400" },
  { emoji: "🤗", label: "Grateful", value: "grateful", color: "bg-pink-100 border-pink-400" },
  { emoji: "😌", label: "Calm", value: "calm", color: "bg-teal-100 border-teal-400" },
  { emoji: "😡", label: "Angry", value: "angry", color: "bg-red-200 border-red-500" },
  { emoji: "😴", label: "Tired", value: "tired", color: "bg-indigo-100 border-indigo-400" },
  { emoji: "🤔", label: "Confused", value: "confused", color: "bg-gray-200 border-gray-400" },
  { emoji: "😍", label: "Loved", value: "loved", color: "bg-rose-100 border-rose-400" },
]

export default function MoodTracker({ user, updateUser }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [intensity, setIntensity] = useState(5)
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedMood) return

    const newMoodEntry = {
      id: Date.now(),
      mood: selectedMood,
      intensity,
      notes,
      timestamp: new Date().toISOString(),
    }

    const updatedUser = {
      ...user,
      moodHistory: [...(user.moodHistory || []), newMoodEntry],
    }

    updateUser(updatedUser)
    setSubmitted(true)
    setSelectedMood(null)
    setIntensity(5)
    setNotes("")

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {MOODS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedMood === mood.value
                  ? `${mood.color} border-2`
                  : "bg-slate-100 border-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-slate-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedMood && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Intensity Level: {intensity}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What's on your mind? (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Log Mood
          </Button>

          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Mood logged successfully!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
