import { Configuration, OpenAIApi } from "openai"
import alternativePrompt from "./alternativePrompt"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  if (!configuration.apiKey) {
    return
  }
  const body = await req.json()
  const project = body.project || ""
  if (project.trim().length === 0) {
    const options = { status: 400, statusText: "Project name cannot be empty" }
    const response = new Response(null, options)
    return response
  }

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: alternativePrompt(project) },
      ],
      max_tokens: 3000,
      temperature: 1,
    })
    return new Response(
      JSON.stringify({ result: chatCompletion.data.choices[0].message })
    )
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}
