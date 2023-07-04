// import { COMPILER_NAMES } from "next/dist/shared/lib/constants"
import { FC } from "react"

interface Props {
  projectInput: string
  setProjectInput: React.Dispatch<React.SetStateAction<string>>
  result: string
  setResult: React.Dispatch<React.SetStateAction<string>>
}

const APITitle: FC = ({
  projectInput,
  setProjectInput,
  result,
  setResult,
}: Props) => {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      if (response.status === 404) {
        console.error(data.error)
      }
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="project"
          placeholder="...a snake game in React"
          value={projectInput}
          onChange={e => setProjectInput(e.target.value)}
        />
        <input type="submit" value="Generate tasks" />
      </form>
      <div>{result}</div>
    </>
  )
}

export default APITitle
