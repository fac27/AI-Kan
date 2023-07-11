import { FC, useState } from "react"
import { card, checkedstyle, projectstyle } from "../Styles/TailwindClasses"
import sanitise from "../../utils/sanitise"
import { useProjectDispatch } from "../Context/store"
import exampleData from "../../data/exampleData"
import Loading from "./Loading"

interface Props {
  id: string
}

const Title: FC<Props> = ({ id }: Props) => {
  const [projectInput, setProjectInput] = useState("")
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
    try {
      setLoading(true)

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
      const sanitisedData = await sanitise(data.result.content)
      if (dispatch) {
        dispatch({
          type: "NEW_PROJECT",
          payload: sanitisedData,
        })
      }
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      id={id}
      className={`mt-10 flex flex-col items-center justify-center ${card} ${projectstyle} ${checkedstyle}`}
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
  )
}

export default Title
