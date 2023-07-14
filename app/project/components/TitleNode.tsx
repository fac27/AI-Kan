import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import { card } from "../../Styles/TailwindClasses"

const handleStyle = { left: 10 }

const TitleNode = ({ data }) => {
  const onChange = useCallback(evt => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div
        className={`mt-10 flex flex-col items-center justify-center ${card} bg-orange-50`}
      >
        <form className="flex flex-col gap-5 items-center justify-center p-4">
          <label className="text-3xl" htmlFor="promptInput">
            I want to make...
          </label>
          <div className="flex justify-between mt-2.5">
            <input
              type="text"
              id="promptInput"
              placeholder="...a dating app for llamas"
              className="p-1.5 rounded border border-black"
            />
          </div>
          <button
            type="submit"
            className={`border border-black bg-gray-50 p-1.5 rounded ml-5`}
          >
            Submit
          </button>
        </form>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )
}

export default TitleNode
