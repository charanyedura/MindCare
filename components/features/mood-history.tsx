"use client"

import { useMemo } from "react"

const MOOD_EMOJIS = {
  happy: "😄",
  good: "😊",
  okay: "😐",
  sad: "😔",
  anxious: "😰",
  stressed: "😤",
}

export default function MoodHistory({ user }) {
  const moodStats = useMemo(() => {
    const history = user.moodHistory || []
    if (history.length === 0) return null

    const moodCounts = {}
    const intensities = {}
    let totalIntensity = 0

    history.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1
      intensities[entry.mood] = (intensities[entry.mood] || 0) + entry.intensity
      totalIntensity += entry.intensity
    })

    return {
      total: history.length,
      average: (totalIntensity / history.length).toFixed(1),
      moodCounts,
      intensities,
    }
  }, [user.moodHistory])

  if (!user.moodHistory || user.moodHistory.length === 0) {
    return <p className="text-slate-600">No mood entries yet. Start tracking to see your history!</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Your Mood Journey</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-600">Total Entries</p>
          <p className="text-2xl font-bold text-blue-600">{moodStats?.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-slate-600">Average Intensity</p>
          <p className="text-2xl font-bold text-green-600">{moodStats?.average}/10</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-slate-600">Most Common</p>
          <p className="text-2xl font-bold text-purple-600">
            {moodStats &&
              Object.keys(moodStats.moodCounts).reduce((a, b) =>
                moodStats.moodCounts[a] > moodStats.moodCounts[b] ? a : b,
              )}
          </p>
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Recent Entries</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {[...(user.moodHistory || [])].reverse().map((entry) => (
            <div key={entry.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{MOOD_EMOJIS[entry.mood] || "😐"}</span>
                  <div>
                    <p className="font-semibold text-slate-900 capitalize">{entry.mood}</p>
                    <p className="text-sm text-slate-600">Intensity: {entry.intensity}/10</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleDateString()}</p>
              </div>
              {entry.notes && <p className="mt-2 text-slate-700 text-sm">{entry.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
