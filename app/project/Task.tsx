import { FC } from "react"

interface TaskProps {
  title: string
  description: string
  done: boolean
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Task: FC<TaskProps> = ({ title, description, done, handleChangeTask }) => {
  return (
    <div className="p-4 w-25 break-normal border border-black">
      <input type="checkbox" checked={done}></input>
      <input type="text" value={title} onChange={handleChangeTask} className="border border-black" />
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
