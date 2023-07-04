"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect } from "react"
import { useGlobalContext } from "../Context/store"
import Xarrow from "react-xarrows"
import { useRef } from "react"

export default function Project({ props }) {
  //const [projectInput, setProjectInput] = useState("")
  //const [result, setResult] = useState()

  const taskRef = useRef(null)
  const issueRef = useRef(null)

  return (
    <>
      <Title />
      <div className="m-4 mt-10 flex space-x-4 w-500" ref={taskRef}>
        {exampleData[0].tasks.map(task => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            done={task.done}
          />
        ))}
      </div>
      <div ref={issueRef} className="m-4 mt-10 flex space-x-4">
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
      <Xarrow start={taskRef} end={issueRef}></Xarrow>
      <Logout />
    </>
  )
}
