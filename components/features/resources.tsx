export default function Resources() {
  const resources = [
    {
      title: "Crisis Support Hotline",
      description: "Immediate support for mental health crises",
      contact: "1-800-273-8255",
      type: "Phone",
    },
    {
      title: "Campus Counselling",
      description: "Professional mental health support provided by your university",
      contact: "Visit your campus counselling center",
      type: "In-Person",
    },
    {
      title: "Meditation App - Insight Timer",
      description: "Free meditation and mindfulness resources",
      contact: "Download from app store",
      type: "App",
    },
    {
      title: "Text Support - Crisis Text Line",
      description: "Text-based mental health support",
      contact: "Text HOME to 741741",
      type: "Text",
    },
    {
      title: "Online Therapy - BetterHelp",
      description: "Licensed therapists available online",
      contact: "Visit betterhelp.com",
      type: "Online",
    },
    {
      title: "Sleep Support - Sleep Foundation",
      description: "Resources for better sleep and rest",
      contact: "Visit sleepfoundation.org",
      type: "Website",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Mental Health Resources</h2>
      <p className="text-slate-600">
        Remember: Seeking help is a sign of strength. Here are resources to support your mental health journey.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource, idx) => (
          <div
            key={idx}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-slate-900">{resource.title}</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{resource.type}</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
            <p className="text-sm font-medium text-slate-900">{resource.contact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
