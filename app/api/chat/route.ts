import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message, userName } = await request.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are a compassionate and knowledgeable AI emotion control specialist. Your role is to provide evidence-based strategies and advice for managing emotions. 
      
Key principles:
- Be empathetic and validating of the user's feelings
- Provide practical, actionable advice for emotion regulation
- Suggest techniques like breathing exercises, grounding techniques, cognitive reframing
- Encourage self-compassion and normalize emotional experiences
- When appropriate, remind users to seek professional help if needed
- Keep responses concise but helpful (2-3 paragraphs max)
- Personalize responses using the user's name when appropriate
- Focus on emotion control strategies: mindfulness, breathing, thought patterns, body awareness`,
      prompt: `User (${userName}) says: "${message}"

Please provide compassionate, practical advice for managing their emotional state. Focus on concrete, evidence-based techniques they can use immediately.`,
    })

    return Response.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
