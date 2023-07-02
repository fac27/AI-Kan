import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function generate(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    })
    return
  }

  const project = req.body.project || ""
  if (project.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid project",
      },
    })
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
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      })
    }
  }
}

function generatePrompt(project) {
  return `You are a project management tool for software developers. You are highly skilled at breaking down a project into several tasks. You can only respond in the format of a JSON object. 

  Example input: 
  "I want to make a snake game in React"
  
  Example output:
  {"project": [{"title": "Setup development environment", "description": "Install and setup necessary software to begin development", "timeEstimate": "2 hours", "done": false},
    {"title": "Create game board", "description": "Implement the main game board where the game will be played", "timeEstimate": "4 hours", "done": false},
    { "title": "Create snake", "description": "Implement the snake that the player will control", "timeEstimate": "6 hours", "done": false},
    { "title": "Implement game logic", "description": "Handle the main game mechanics like snake movement, score keeping, and collision detection", "timeEstimate": "8 hours", "done": false},
    { "title": "Testing and Debugging", "description": "Run tests and debug to ensure that the game runs as expected", "timeEstimate": "4 hours", "done": false}]}

  Your input:

  "I want to make ${project}"

  Output:`
}
