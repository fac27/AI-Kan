"use client"
import APITitle from "../project/APITitle"
import { useState } from "react"

const TestApi = () => {
  const [projectInput, setProjectInput] = useState("")
  const [result, setResult] = useState("")
  return (
    <>
      <h1>Test API</h1>
      <APITitle
        projectInput={projectInput}
        setProjectInput={setProjectInput}
        result={result}
        setResult={setResult}
      />
    </>
  )
}

export default TestApi
