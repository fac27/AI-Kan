import { Handle, Position } from "reactflow"
import { card } from "../../Styles/TailwindClasses"

const IssueNode = ({ data }) => {
  console.log(data)
  return (
    <div
      className={`${card} ${
        !false ? "bg-pink-50" : "bg-pink-50 text-gray-400"
      } flex flex-col mb-4 border-none TestIssueId-j`}
    >
      <Handle type="target" position={Position.Top} id="d" />
      <div className={`mb-2 flex items-center justify-between`}>
        <input
          type="checkbox"
          className={`TestIssueCheckbox cursor-pointer`}
        ></input>
        <button type="button" className={`TestIssueDelete`}>
          ✖
        </button>
      </div>
      <input
        type="text"
        className={`mb-2 p-2 rounded border ${
          !false ? "border-black" : "border-gray-400"
        } TestIssueTitle text-ellipsis overflow-hidden`}
      />
      <textarea
        rows={4}
        cols={20}
        className={`mb-2 p-2 resize-none rounded border ${
          !false ? "border-black" : "border-gray-400"
        } TestIssueDescription text-ellipsis overflow-scroll`}
      ></textarea>
    </div>
  )
}

export default IssueNode
