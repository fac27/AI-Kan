// import { GetStaticPaths, GetStaticProps } from "next"
"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useState } from "react"
import Xarrow from "react-xarrows"
import { useRef } from "react"


// import type xarrowPropsType 

// type Params = {
//   project: string
// }

// export const getStaticPaths: GetStaticPaths<Params> = () => {
//   const paths = exampleData.map(project => ({
//     params: {
//       project: project.name.toLowerCase().replace(/\s/g, "-"),
//     },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// type Props = {
//   tasks: Task[]
// }

// type Task = {
//   id: number
//   title: string
//   description: string
//   timeEstimate: string
//   issues: Issue[]
//   done: boolean
// }

// type Issue = {
//   id: number
//   taskId: number
//   description: string
//   timeEstimate: string
//   done: boolean
// }

// export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
//   const tasks = exampleData[0].tasks
//   return {
//     props: {
//       tasks,
//     },
//   }
// }

export default function Project({ }) {
  const [projectInput, setProjectInput] = useState("")
  const [result, setResult] = useState()

  const taskRef = useRef(null)
  const issueRef = useRef(null)

  return (
    <>
      <Title />
      <div className="m-4 flex" ref={taskRef}>
        {exampleData[0].tasks.map(task => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            done={task.done}
          />
        ))}
      </div>
      <div ref={issueRef} className="m-4 flex border border-black">
        {exampleData[0].tasks.map((task, index) => (
          <div key={index} className="flex flex-col overflow-hidden border border-black">
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
      <Xarrow
        start={taskRef}
        end={issueRef}>
          
        </Xarrow>
      <Logout />
    </>
  )
}
