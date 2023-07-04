import { FC } from "react"

interface TaskProps {
  id: string
  title: string
  description: string
  done: boolean
}

const Task: FC<TaskProps> = ({ id, title, description, done }) => {
  return (
    <div id={id} className="p-4 w-25 break-normal border border-black">
      <input type="checkbox" checked={done}></input>
      <input type="text" value={title} className="border border-black" />
      <textarea
        rows={4}
        cols={20}
        value={description}
        className="border border-black"
      ></textarea>
      <div className="flex justify-between">
        <button type="button">⌄</button>
        <button type="button">+</button>
      </div>
    </div>
  )
}

export default Task
