import { generateObject } from "ai"
import { z } from "zod"

const emotionAnalysisSchema = z.object({
  detectedEmotion: z.enum([
    "anxiety",
    "stress",
    "anger",
    "sadness",
    "overwhelmed",
    "calm",
    "happy",
    "confused",
    "frustrated",
    "neutral",
  ]),
  emotionIntensity: z.number().min(1).max(10).describe("Intensity from 1-10"),
  primaryCause: z.string().describe("What seems to be causing this emotion"),
  suggestedTechniques: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      duration: z.string().describe("Time needed (e.g., '5 minutes')"),
    }),
  ),
  affirmation: z.string().describe("A compassionate affirmation for the user"),
})

export async function POST(request: Request) {
  try {
    const { message, previousContext } = await request.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: emotionAnalysisSchema,
      system: `You are an expert emotion analyst and therapist. Analyze the user's message to:
1. Identify the primary emotion they're experiencing
2. Rate the intensity (1-10 scale)
3. Identify the underlying cause
4. Suggest 3 evidence-based coping techniques specific to their emotion
5. Provide a compassionate affirmation

Be specific, empathetic, and actionable.`,
      prompt: `${previousContext ? `Previous context: ${previousContext}\n\n` : ""}User message: "${message}"

Please analyze this message and provide emotion insights.`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Emotion analysis error:", error)
    return Response.json({ error: "Failed to analyze emotion" }, { status: 500 })
  }
}
