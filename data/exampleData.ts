const exampleData = [
  {
    "id" : 0,
    "name" : "Snake game in React",
    "tasks" : 
    [
      {
        "id": 0,
        "title": "Setup development environment",
        "description": "Install and setup necessary software to begin development",
        "timeEstimate": "2 hours",
        "issues": [
          {
            "id": 0,
            "taskId": 0,
            "title": "Install Node.js",
            "description": "Download and install Node.js from the official website",
            "timeEstimate": "30 minutes",
            "done": false
          },
          {
            "id": 1,
            "taskId": 0,
            "title": "Install create-react-app",
            "description": "Install create-react-app using npm",
            "timeEstimate": "30 minutes",
            "done": false
          },
          {
            "id": 2,
            "taskId": 0,    
            "title": "Initialize project",
            "description": "Use create-react-app to initialize the new project",
            "timeEstimate": "1 hour",
            "done": false
          }
        ],
        "done": false
      },
      {
        "id": 1,
        "title": "Create game board",
        "description": "Implement the main game board where the game will be played",
        "timeEstimate": "4 hours",
        "issues": [
          {
            "id": 0,
            "taskId": 1, 
            "title": "Design board layout",
            "description": "Design the layout of the game board using CSS grid or similar",
            "timeEstimate": "2 hours",
            "done": false
          },
          {
            "id": 1,
            "taskId": 1, 
            "title": "Implement board",
            "description": "Use React to create the game board component",
            "timeEstimate": "2 hours",
            "done": false
          }
        ],
        "done": false
      },
      {
        "id": 2,
        "title": "Create snake",
        "description": "Implement the snake that the player will control",
        "timeEstimate": "6 hours",
        "issues": [
          {          
            "id": 0,
            "taskId": 2, 
            "title": "Design snake",
            "description": "Create a design for the snake and its movement",
            "timeEstimate": "2 hours",
            "done": false
          },
          {
            "id": 1,
            "taskId": 2, 
            "title": "Implement snake",
            "description": "Use React to create the snake component",
            "timeEstimate": "4 hours",
            "done": false
          }
        ],
        "done": false
      },
      {
        "id": 3,
        "title": "Implement game logic",
        "description": "Handle the main game mechanics like snake movement, score keeping, and collision detection",
        "timeEstimate": "8 hours",
        "issues": [
          {
            "id": 0,
            "taskId": 3, 
            "title": "Implement snake movement",
            "description": "Write the code to handle snake movement in response to player input",
            "timeEstimate": "3 hours",
            "done": false
          },
          {
            "id": 1,
            "taskId": 3, 
            "title": "Implement score keeping",
            "description": "Write the code to keep track of and display the player's score",
            "timeEstimate": "2 hours",
            "done": false
          },
          {
            "id": 2,
            "taskId": 3, 
            "title": "Implement collision detection",
            "description": "Write the code to detect collisions between the snake and the game board or the snake and itself",
            "timeEstimate": "3 hours",
            "done": false
          }
        ],
        "done": false
      },
      {
        "id": 4,
        "title": "Testing and Debugging",
        "description": "Run tests and debug to ensure that the game runs as expected",
        "timeEstimate": "4 hours",
        "issues": [
          {
            "id": 0,
            "taskId": 4, 
            "title": "Write tests",
            "description": "Write tests to verify the functionality of the game",
            "timeEstimate": "2 hours",
            "done": false
          },
          {
            "id": 1,
            "taskId": 4, 
            "title": "Debug game",
            "description": "Fix any issues that arise during testing",
            "timeEstimate": "2 hours",
            "done": false
          }
        ],
        "done": false
      }
    ]
  }
]



export default exampleData