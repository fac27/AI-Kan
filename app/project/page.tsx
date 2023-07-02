// import { GetStaticPaths, GetStaticProps } from "next"

// import exampleData from "../../../data/exampleData"
"use client"
import Grandparent from "./Grandparent"
import APIGrandparent from "./APIGrandparent"
import { useState } from "react"

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

export default function Project({ props }) {
  const [projectInput, setProjectInput] = useState("")
  const [result, setResult] = useState()

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: projectInput }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
      setProjectInput("")
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <>
      <Grandparent />
      <APIGrandparent
        onSubmit={onSubmit}
        projectInput={projectInput}
        setProjectInput={setProjectInput}
        result={result}
      />
    </>
  )
}
