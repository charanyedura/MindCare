"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function LoginForm({ onSuccess, onToggleMode }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const user = storedUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      onSuccess(user)
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
      <p className="text-slate-600 mb-6">Your mental health companion is here for you</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Sign In
        </Button>
      </form>

      <p className="text-center text-slate-600 mt-4">
        Don't have an account?{" "}
        <button onClick={onToggleMode} className="text-blue-600 hover:text-blue-700 font-semibold">
          Sign up
        </button>
      </p>
    </div>
  )
}
