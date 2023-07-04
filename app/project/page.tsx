"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect } from "react"
import { useGlobalContext } from "../Context/store"

export default function Project() {
  // const [projectInput, setProjectInput] = useState("")
  // const [result, setResult] = useState()

  const { taskId, setTaskId, task, setTask } = useGlobalContext()

  useEffect(() => {
    setTaskId(1)
    setTask("hoover my room")
  }, [setTaskId, setTask])

  return (
    <>
      <div>
        <p>Task Id: {taskId}</p>
        <p>Task: {task}</p>
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
