"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Profile({ user, updateUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    university: user.university,
    yearOfStudy: user.yearOfStudy,
    gender: user.gender || "",
    age: user.age || "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateUser({
      ...user,
      name: formData.name,
      university: formData.university,
      yearOfStudy: formData.yearOfStudy,
      gender: formData.gender,
      age: formData.age,
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      {isEditing ? (
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="13"
                max="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Year of Study</label>
            <select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-slate-400 hover:bg-slate-500 text-white">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg">
          <div>
            <p className="text-sm text-slate-600">Full Name</p>
            <p className="font-semibold text-slate-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Email</p>
            <p className="font-semibold text-slate-900">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Gender</p>
              <p className="font-semibold text-slate-900">{user.gender || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Age</p>
              <p className="font-semibold text-slate-900">{user.age || "Not specified"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600">University</p>
            <p className="font-semibold text-slate-900">{user.university || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Year of Study</p>
            <p className="font-semibold text-slate-900">{user.yearOfStudy || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Member Since</p>
            <p className="font-semibold text-slate-900">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  )
}
