import { FC } from "react"
import { card, taskstyle } from "../Styles/TailwindClasses"
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
    if (dispatch) {
      dispatch({
        type: "EDIT_TASK_TITLE",
        payload: {
          ...task,
          title: newTitle,
        },
      })
    }
  }

  function handleEditDescription(event) {
    const newDescription = event.target.value
    if (dispatch) {
      dispatch({
        type: "EDIT_TASK_DESCRIPTION",
        payload: {
          ...task,
          description: newDescription,
        },
      })
    }
  }
  return (
    <div
      id={id}
      ref={targetRef}
      className={`${card} ${taskstyle} flex flex-col`}
    >
      <input type="checkbox" checked={task.done}></input>
      <input
        type="text"
        value={task.title}
        onChange={handleEditTitle}
        className=""
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
