import { FC } from "react"

interface TaskProps {
  title: string
  description: string
  done: boolean
}

const Task: FC<TaskProps> = ({ title, description, done }) => {
  return (
    <div>
      <input type="checkbox" checked={done}></input>
      <input type="text" value={title} />
      <textarea rows={4} cols={50} value={description}></textarea>
      <button type="button">⌄</button>
      <button type="button">+</button>
    </div>
  )
}

export default Task
