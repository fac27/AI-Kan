import { OpenAIStream, OpenAIStreamPayload } from "../../../utils/openAIStream"
import generatePrompt from "./generatePrompt"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const POST = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: generatePrompt(prompt) }],
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
