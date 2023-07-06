import { FC } from "react"
import { card, task} from "../Styles/TailwindClasses"

interface TaskProps {
  id: string
  title: string
  description: string
  done: boolean
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void
  targetRef: React.RefObject<HTMLDivElement>
}

const Task: FC<TaskProps> = ({
  id,
  title,
  description,
  done,
  handleChangeTask,
  targetRef
}) => {
  return (
    <div id={id} ref={targetRef} className={`${card} ${task} flex flex-col`}>
      <input type="checkbox" checked={done} className="mb-2 self-start"></input>
      <input
        type="text"
        value={title}
        onChange={handleChangeTask}
        className="mb-2 p-2 rounded"
      />
      <textarea
        rows={4}
        cols={20}
        value={description}
        className="mb-2 p-2 resize-none rounded"
      ></textarea>
      <div className="flex justify-between">
        <button type="button">⌄</button>
        <button type="button">+</button>
      </div>
    </div>
  )
}

export default Task
