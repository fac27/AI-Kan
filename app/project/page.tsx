"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect } from "react"
import { useGlobalContext } from "../Context/store"
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows"
import { useRef } from "react"
import { card } from "../Styles/TailwindClasses"

export default function Project({ props }) {
  //const [projectInput, setProjectInput] = useState("")
  //const [result, setResult] = useState()

  return (
    <>
      <Xwrapper>
        <Title id={"ProjTitle"} />
        <div className="m-4 mt-10 flex space-x-4 w-500">
          {exampleData[0].tasks.map((task, index) => (
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              done={task.done}
              id={`Task${index}`}
            />
          ))}
        </div>
        <div className={"m-4 mt-10 flex space-x-4" + card}>
          {exampleData[0].tasks.map((task, index) => (
            <div id={`Issues${index}`} key={index} className={card}>
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
          {exampleData[0].tasks.map((_, index) => (
            <>
              <Xarrow start={"ProjTitle"} end={`Task${index}`} />
              <Xarrow
                key={index}
                start={`Task${index}`}
                end={`Issues${index}`}
              />
            </>
          ))}
        </div>
        <Logout />
      </Xwrapper>
      <Logout />
    </>
  )
}
