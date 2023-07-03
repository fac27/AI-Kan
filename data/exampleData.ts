const exampleData = [
  {
    id: 0,
    name: "Snake game in React",
    tasks: [
      {
        id: 0,
        title: "Setup development environment",
        description:
          "Install and setup necessary software to begin development",
        timeEstimate: "2 hours",
        issues: [
          {
            id: 0,
            taskId: 0,
            title: "Install Node.js",
            description:
              "Download and install Node.js from the official website",
            timeEstimate: "30 minutes",
            done: false,
          },
          {
            id: 1,
            taskId: 0,
            title: "Install create-react-app",
            description: "Install create-react-app using npm",
            timeEstimate: "30 minutes",
            done: false,
          },
          {
            id: 2,
            taskId: 0,
            title: "Initialize project",
            description: "Use create-react-app to initialize the new project",
            timeEstimate: "1 hour",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 1,
        title: "Create game board",
        description:
          "Implement the main game board where the game will be played",
        timeEstimate: "4 hours",
        issues: [
          {
            id: 3,
            taskId: 1,
            title: "Design board layout",
            description:
              "Design the layout of the game board using CSS grid or similar",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 4,
            taskId: 1,
            title: "Implement board",
            description: "Use React to create the game board component",
            timeEstimate: "2 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 2,
        title: "Create snake",
        description: "Implement the snake that the player will control",
        timeEstimate: "6 hours",
        issues: [
          {
            id: 5,
            taskId: 2,
            title: "Design snake",
            description: "Create a design for the snake and its movement",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 6,
            taskId: 2,
            title: "Implement snake",
            description: "Use React to create the snake component",
            timeEstimate: "4 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 3,
        title: "Implement game logic",
        description:
          "Handle the main game mechanics like snake movement, score keeping, and collision detection",
        timeEstimate: "8 hours",
        issues: [
          {
            id: 7,
            taskId: 3,
            title: "Implement snake movement",
            description:
              "Write the code to handle snake movement in response to player input",
            timeEstimate: "3 hours",
            done: false,
          },
          {
            id: 8,
            taskId: 3,
            title: "Implement score keeping",
            description:
              "Write the code to keep track of and display the player's score",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 9,
            taskId: 3,
            title: "Implement collision detection",
            description:
              "Write the code to detect collisions between the snake and the game board or the snake and itself",
            timeEstimate: "3 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 4,
        title: "Testing and Debugging",
        description:
          "Run tests and debug to ensure that the game runs as expected",
        timeEstimate: "4 hours",
        issues: [
          {
            id: 10,
            taskId: 4,
            title: "Write tests",
            description: "Write tests to verify the functionality of the game",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 11,
            taskId: 4,
            title: "Debug game",
            description: "Fix any issues that arise during testing",
            timeEstimate: "2 hours",
            done: false,
          },
        ],
        done: false,
      },
    ],
  },
  {
    id: 0,
    name: "Todo list app",
    tasks: [
      {
        id: 0,
        title: "Setup development environment",
        description:
          "Install and setup necessary software to begin development",
        timeEstimate: "2 hours",
        issues: [
          {
            id: 1,
            taskId: 0,
            title: "Install Node.js",
            description:
              "Download and install Node.js from the official website",
            timeEstimate: "30 minutes",
            done: false,
          },
          {
            id: 2,
            taskId: 0,
            title: "Install create-react-app",
            description: "Install create-react-app using npm",
            timeEstimate: "30 minutes",
            done: false,
          },
          {
            id: 3,
            taskId: 0,
            title: "Initialize project",
            description: "Use create-react-app to initialize the new project",
            timeEstimate: "1 hour",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 1,
        title: "Create todo list component",
        description: "Implement the main todo list component",
        timeEstimate: "4 hours",
        issues: [
          {
            id: 4,
            taskId: 1,
            title: "Design todo list layout",
            description:
              "Design the layout of the todo list using CSS grid or similar",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 5,
            taskId: 1,
            title: "Implement todo list",
            description: "Use React to create the todo list component",
            timeEstimate: "2 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 2,
        title: "Create todo item component",
        description:
          "Implement the todo item component that will be used in the todo list",
        timeEstimate: "6 hours",
        issues: [
          {
            id: 6,
            taskId: 2,
            title: "Design todo item",
            description:
              "Create a design for the todo item and its functionality",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 7,
            taskId: 2,
            title: "Implement todo item",
            description: "Use React to create the todo item component",
            timeEstimate: "4 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 3,
        title: "Implement data persistence",
        description: "Handle the data persistence of the todo list items",
        timeEstimate: "8 hours",
        issues: [
          {
            id: 8,
            taskId: 3,
            title: "Integrate database",
            description: "Integrate a database to store the todo list items",
            timeEstimate: "3 hours",
            done: false,
          },
          {
            id: 9,
            taskId: 3,
            title: "Write CRUD operations",
            description:
              "Write the code to Create, Read, Update, and Delete todo list items",
            timeEstimate: "3 hours",
            done: false,
          },
          {
            id: 10,
            taskId: 3,
            title: "Integrate with todo list component",
            description: "Integrate the database with the todo list component",
            timeEstimate: "2 hours",
            done: false,
          },
        ],
        done: false,
      },
      {
        id: 4,
        title: "Testing and Debugging",
        description:
          "Run tests and debug to ensure that the app runs as expected",
        timeEstimate: "4 hours",
        issues: [
          {
            id: 11,
            taskId: 4,
            title: "Write tests",
            description: "Write tests to verify the functionality of the app",
            timeEstimate: "2 hours",
            done: false,
          },
          {
            id: 12,
            taskId: 4,
            title: "Debug app",
            description: "Fix any issues that arise during testing",
            timeEstimate: "2 hours",
            done: false,
          },
        ],
        done: false,
      },
    ],
  },
]

export default exampleData
