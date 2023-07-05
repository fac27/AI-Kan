"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useReducer } from "react"
import { useGlobalContext } from "../Context/store"
import Xarrow, { Xwrapper } from "react-xarrows"
import { card } from "../Styles/TailwindClasses"

//define reducer

function projectReducer(state, action) {
  switch (action.type) {
    case "CHANGE_TASK": {
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project.id === action.payload.projectId) {
            return {
              ...project,
              tasks: project.tasks.map(task => {
                if (task.id === action.payload.taskId) {
                  return {
                    ...task,
                    title: action.payload.title,
                    description: action.payload.description,
                  }
                }
                return task
              }),
            }
          }
          return project
        }),
      }
    }
    default: {
      return state
    }
  }
}

export default function Project() {
  //const [projectInput, setProjectInput] = useState("")
  //const [result, setResult] = useState()

  ///implement reducer

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { projectId, setProjectId, task, setTask } = useGlobalContext()

  const [state, dispatch] = useReducer(projectReducer, {
    projects: exampleData,
  })

  function handleChangeTask(event) {
    const newTask = event.target.value
    dispatch({
      type: "CHANGE_TASK",
      payload: {
        projectId: projectId,
        taskId: task.id,
        title: newTask,
        description: task.description,
      },
    })
  }

  ///implement context

  return (
    <>
      <Xwrapper>
      <Title id={"ProjectTitle"}/>
      {state.projects.map(project => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <div className="m-4 mt-10 flex space-x-4 w-500">
            {project.tasks.map((task, index) => (
              <Task
                key={task.id}
                title={task.title}
                description={task.description}
                done={task.done}
                handleChangeTask={handleChangeTask}
                id={`Task${index}`}
              />
            ))}
          </div>
          <div className="m-4 mt-10 flex space-x-4">
            {project.tasks.map(task => (
              <div
                key={task.id}
                className={card}
                id={`Issues${index}`}
              >
                {task.issues.map(issue => (
                  <Issue
                    key={issue.id}
                    title={issue.title}
                    description={issue.description}
                    done={issue.done}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {exampleData[0].tasks.map((_, index) => (
        <>
          <Xarrow
            start={"ProjTitle"}
            end={`Task${index}`}
            startAnchor={"bottom"}
            endAnchor={"top"}
          />
          <Xarrow
            key={index}
            start={`Task${index}`}
            end={`Issues${index}`}
            startAnchor={"bottom"}
            endAnchor={"top"}
          />
        </>
      ))}
      <Logout />
    </>
  )
}
