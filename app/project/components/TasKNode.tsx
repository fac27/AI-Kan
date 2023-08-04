import { card } from "../../Styles/TailwindClasses"
import { Handle, Position } from "reactflow"

const TaskNode = ({ data }) => {
  console.log(data)
  return (
    <div
      className={`${card} ${
        !false ? "bg-teal-50" : "bg-teal-50 text-gray-400"
      } flex flex-col TestTaskId text-ellipsis`}
    >
      <Handle type="target" position={Position.Top} id="b" />
      <div className={`mb-2 flex items-center justify-between`}>
        <input
          type="checkbox"
          className={`TestTaskCheckbox cursor-pointer`}
        ></input>
        <button type="button" className={`TestTaskDelete`}>
          ✖
        </button>
      </div>
      <input
        type="text"
        className={`mb-2 p-2 rounded border text-ellipsis overflow-hidden ${
          !false ? "border-black" : "border-gray-400"
        } TestTaskTitle`}
      />
      <textarea
        rows={5}
        cols={20}
        className={`mb-2 p-2 resize-none rounded border ${
          !false ? "border-black" : "border-gray-400"
        } TestTaskDescription`}
      ></textarea>
    </div>
  )
}

export default TaskNode
