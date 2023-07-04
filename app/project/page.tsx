"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect, useReducer } from "react"
import { useGlobalContext } from "../Context/store"

//define reducer

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TASK": {
      return {
        ...state,
        task: action.payload,
      }
    }
    default: {
      return state
    }
  }
}


export default function Project() {
  // const [projectInput, setProjectInput] = useState("")
  // const [result, setResult] = useState()

  ///implement reducer
  

  function handleChangeTask(event) {
    const newTask = event.target.value
    dispatch({
      type: "CHANGE_TASK",
      payload: newTask,
    })
  }

  ///implement context
  const { taskId, setTaskId, task, setTask } = useGlobalContext()

  useEffect(() => {
    setTaskId(1)
    setTask("hoover my room")
  }, [setTaskId, setTask])

  const [state, dispatch] = useReducer(reducer, { task })

  return (
    <>
      <div>
        <p>Task Id: {taskId}</p>
        <input
          type="text"
          value={state.task}
          onChange={handleChangeTask}
        ></input>
        <p>{state.task}</p>
      </div>

      <Title />
      <div className="m-4 mt-10 flex space-x-4 w-500">
        {exampleData[0].tasks.map(task => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            done={task.done}
          />
        ))}
      </div>
      <div className="m-4 mt-10 flex space-x-4">
        {exampleData[0].tasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden border border-black"
          >
            {task.issues.map((issue, index) => (
              <Issue
                key={index}
                title={issue.title}
                description={issue.description}
                done={issue.done}
              />
            ))}
          </div>
        ))}
      </div>
      <Logout />
    </>
  )
}
