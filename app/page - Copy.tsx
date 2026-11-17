"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState("login")

  if (user) {
    return <Dashboard user={user} setUser={setUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {authMode === "login" ? (
          <LoginForm onSuccess={setUser} onToggleMode={() => setAuthMode("register")} />
        ) : (
          <RegisterForm onSuccess={setUser} onToggleMode={() => setAuthMode("login")} />
        )}
      </div>
    </div>
  )
}
