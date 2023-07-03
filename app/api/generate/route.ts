import { Configuration, OpenAIApi } from "openai"
import generatePrompt from "./generatePrompt"

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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(project),
      max_tokens: 2000,
      temperature: 0.6,
    })
    console.log(completion.data)
    return new Response(
      JSON.stringify({ result: completion.data.choices[0].text })
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
