"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import MoodTracker from "./features/mood-tracker"
import ChatBot from "./features/chatbot"
import MoodHistory from "./features/mood-history"
import Resources from "./features/resources"
import Profile from "./features/profile"
import CameraWidget from "./features/camera-widget"

export default function Dashboard({ user, setUser }) {
  const [currentTab, setCurrentTab] = useState("mood")
  const [userData, setUserData] = useState(user)
  const [detectedEmotions, setDetectedEmotions] = useState([])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  const updateUser = (updatedUser) => {
    setUserData(updatedUser)
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const index = storedUsers.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      storedUsers[index] = updatedUser
      localStorage.setItem("users", JSON.stringify(storedUsers))
    }
  }

  const handleEmotionDetected = (emotion, message) => {
    const newDetection = {
      id: Date.now(),
      emotion,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }
    setDetectedEmotions((prev) => [newDetection, ...prev].slice(0, 10))
  }

  const getMoodStats = () => {
    const moods = {}
    userData.moodHistory?.forEach((entry) => {
      moods[entry.mood] = (moods[entry.mood] || 0) + 1
    })
    return moods
  }

  const moodStats = getMoodStats()

  const emotionEmojis = {
    happy: "😄",
    good: "😊",
    okay: "😐",
    sad: "😔",
    anxious: "😰",
    stressed: "😤",
    grateful: "🤗",
    calm: "😌",
    angry: "😡",
    tired: "😴",
    confused: "🤔",
    loved: "😍",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">MindCare</h1>
            <p className="text-sm text-slate-600">Welcome, {userData.name}</p>
          </div>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-600">Name</p>
            <p className="text-xl font-bold text-slate-900">{userData.name}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <p className="text-sm text-slate-600">Gender</p>
            <p className="text-xl font-bold text-slate-900">{userData.gender || "Not set"}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <p className="text-sm text-slate-600">Age</p>
            <p className="text-xl font-bold text-slate-900">{userData.age || "Not set"}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <p className="text-sm text-slate-600">Total Moods Logged</p>
            <p className="text-xl font-bold text-slate-900">{userData.moodHistory?.length || 0}</p>
          </div>
        </div>

        {detectedEmotions.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow p-6 mb-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Recently Detected Emotions
            </h3>
            <div className="space-y-3">
              {detectedEmotions.slice(0, 5).map((detection) => (
                <div
                  key={detection.id}
                  className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{emotionEmojis[detection.emotion] || "😐"}</span>
                      <div>
                        <p className="font-bold text-slate-900 capitalize">{detection.emotion}</p>
                        <p className="text-xs text-slate-500">{detection.timestamp}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 ml-12">{detection.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6 border-t-4 border-indigo-600">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Emotion Detection Camera</h3>
          <CameraWidget onEmotionDetected={handleEmotionDetected} />
        </div>

        {/* Emotion Distribution */}
        {Object.keys(moodStats).length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Emotion Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(moodStats)
                .sort((a, b) => b[1] - a[1])
                .map(([mood, count]) => (
                  <div
                    key={mood}
                    className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors"
                  >
                    <p className="text-2xl mb-2">{emotionEmojis[mood] || "😐"}</p>
                    <p className="font-bold text-slate-900">{count}</p>
                    <p className="text-xs text-slate-600 capitalize">{mood}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: "mood", label: "Mood Tracker" },
            { id: "chat", label: "Chat Support" },
            { id: "history", label: "Mood History" },
            { id: "resources", label: "Resources" },
            { id: "profile", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentTab === tab.id ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentTab === "mood" && <MoodTracker user={userData} updateUser={updateUser} />}
          {currentTab === "chat" && <ChatBot user={userData} />}
          {currentTab === "history" && <MoodHistory user={userData} />}
          {currentTab === "resources" && <Resources />}
          {currentTab === "profile" && <Profile user={userData} updateUser={updateUser} />}
        </div>
      </div>
    </div>
  )
}
