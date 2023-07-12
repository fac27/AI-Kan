import { FC, useState } from "react"
import { card, projectstyle } from "../../Styles/TailwindClasses"
import sanitise from "../../../utils/sanitise"
import { useProjectDispatch } from "../../Context/store"
import exampleData from "../../../data/exampleData"
import Loading from "./Loading"
import Error from "./Error"

interface Props {
  id: string
}

const Title: FC<Props> = ({ id }: Props) => {
  const [projectInput, setProjectInput] = useState("")
  const [error, setError] = useState("")

  const dispatch = useProjectDispatch()
  const [loading, setLoading] = useState(false)

  const handleExample = () => {
    if (dispatch) {
      dispatch({
        type: "NEW_PROJECT",
        payload: exampleData[0],
      })
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: projectInput }),
    })

    const time = 1000

    if (response.status === 400) {
      setError(response.statusText)
      setTimeout(() => setError(""), time)
      return
    }

    if (response.status === 404) {
      setError("404 Not Found")
      setTimeout(() => setError(""), time)
      return
    }
    if (response.status === 500) {
      setError("API Key Deprecated, contact developers.")
      setTimeout(() => setError(""), time)
      return
    }
    if (response.status !== 200) {
      const data = await response.json()
      setError(data.statusText)
      setTimeout(() => setError(""), time)
    }
    const data = await response.json()
    const sanitisedData = await sanitise(data.result.content)
    if (sanitisedData === "not valid object") {
      setError(`OpenAI returned invalid JSON \n Try re-sending request.`)
      setTimeout(() => setError(""), time + 1500)
      setLoading(false)
      return
    }
    setLoading(false)
    if (dispatch) {
      dispatch({
        type: "NEW_PROJECT",
        payload: sanitisedData,
      })
    }
  }

  return (
    <>
      {error && <Error error={error} />}
      <div
        id={id}
        className={`mt-10 flex flex-col items-center justify-center ${card} ${projectstyle}`}
      >
        <form onSubmit={onSubmit}>
          <label htmlFor="promptInput">I want to make a...</label>
          <div className="flex justify-between mt-2.5">
            <input
              type="text"
              id="promptInput"
              placeholder="Snake game in React"
              value={projectInput}
              onChange={e => setProjectInput(e.target.value)}
              className="p-1.5 rounded border border-black"
            />
            <button
              type="submit"
              className="border border-black bg-gray-50 p-1.5 rounded ml-5"
            >
              Submit
            </button>
            {loading && <Loading />}
          </div>
        </form>
        <button
          onClick={handleExample}
          className="TEST-example-btn border border-black bg-gray-50 p-1.5 rounded ml-5"
        >
          Example
        </button>
      </div>
    </>
  )
}

export default Title
