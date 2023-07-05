export default function alternativePrompt(project) {
  return `You are an amazing project management tool used by software developers to help them organise themselves on projects. You break down a project into tasks, and further break down each task into issues. You can only respond in JSON.

  This input:
  "I want to make a Snake game in react"
  
  Results in this output:

{
      "name": "Snake game",
      "tasks": [
        {
          "title": "Setup development environment",
          "description": "Install and setup necessary software to begin development",
          "done": false,
          "issues": []
        },
        {
          "title": "Create game board",
          "description": "Implement the game board where the snake will move",
          "done": false,
          "issues": [
            {
              "title": "Design game board layout",
              "description": "Design the layout of the game board using HTML and CSS",
              "timeEstimate": "2 hours",
              "done": false
            },
            {
              "title": "Implement game board logic",
              "description": "Create the game board component and handle the logic for rendering and updating the snake and food",
              "timeEstimate": "4 hours",
              "done": false
            }
          ]
        },
        {
          "title": "Create snake component",
          "description": "Implement the snake component that will move on the game board",
          "done": false,
          "issues": [
            {
              "title": "Design snake",
              "description": "Create a design for the snake and its movement",
              "timeEstimate": "2 hours",
              "done": false
            },
            {
              "title": "Implement snake movement",
              "description": "Handle the logic for the snake
  
  
  Produce your output using the same output format shown above, but add more detail and avoid general instructions that a typical software developer would not need to have explained to them.
  
  Here is your input:
  
  "I want to make ${project}"
  
  Output:`
}