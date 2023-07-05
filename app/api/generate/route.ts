import { Configuration, OpenAIApi } from "openai"
import generatePrompt from "./generatePrompt"
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
    return
  }

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: alternativePrompt(project) },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    })
    console.log(chatCompletion.data.choices[0].message)
    return new Response(
      JSON.stringify({ result: chatCompletion.data.choices[0].message })
    )
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}
