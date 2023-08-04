import { Handle, Position } from "reactflow"
import { card } from "../../Styles/TailwindClasses"
import { useStreamContext } from "../../Context/store"

const TitleNode = ({ data }) => {
  const { onSubmit, projectInput, setProjectInput } = useStreamContext()
  console.log(data)
  return (
    <>
      <div
        className={`mt-10 flex flex-col items-center justify-center ${card} bg-orange-50`}
      >
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 items-center justify-center p-4"
        >
          <label className="text-2xl" htmlFor="promptInput">
            I want to make...
          </label>
          <div className="flex justify-between mt-2.5">
            <input
              type="text"
              id="promptInput"
              placeholder="...a dating app for llamas"
              className="p-1.5 rounded border border-black"
              value={projectInput}
              onChange={e => setProjectInput(e.target.value)}
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
