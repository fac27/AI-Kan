import { FC } from "react"
import { card, task } from "../Styles/TailwindClasses"
import { Task } from "../types/types"
import { useProjectDispatch } from "../Context/store"

interface TaskProps {
  id: string
  task: Task
  targetRef: React.RefObject<HTMLDivElement>
}

const Task: FC<TaskProps> = ({ id, task, targetRef }) => {
  const dispatch = useProjectDispatch()

  function handleEditTitle(event) {
    const newTitle = event.target.value
    dispatch({
      type: "EDIT_TITLE",
      payload: {
        ...task,
        title: newTitle,
      },
    })
  }

  function handleEditDescription(event) {
    const newDescription = event.target.value
    dispatch({
      type: "EDIT_DESCRIPTION",
      payload: {
        ...task,
        description: newDescription,
      },
    })
  }
  return (
    <div id={id} ref={targetRef} className={`${card} ${task} flex flex-col`}>
      <input type="checkbox" checked={done}></input>
      <input
        type="text"
        value={task.title}
        onChange={handleEditTitle}
        className="border border-black"
      />
      <textarea
        rows={4}
        cols={20}
        value={task.description}
        onChange={handleEditDescription}
        className="resize-none"
      ></textarea>
      <div className="flex justify-between">
        <button type="button">⌄</button>
        <button type="button">+</button>
      </div>
    </div>
  )
}

export default Task
