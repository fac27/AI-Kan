import { FC, useState } from "react"
import { card } from "../../Styles/TailwindClasses"
import { TaskType } from "../../types/types"
import { useProjectDispatch } from "../../Context/store"
import Confetti from "./Confetti"

interface TaskProps {
  id: string
  task: TaskType
  targetRef: React.RefObject<HTMLDivElement>
}

const Task: FC<TaskProps> = ({ id, task, targetRef }) => {
  const [confettiEnabled, setConfettiEnabled] = useState<boolean>(false)

  const dispatch = useProjectDispatch()

  const handleEditTitle = event => {
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

  const handleEditDescription = event => {
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

  const handleTaskCheckbox = event => {
    const isChecked = event.target.checked
    if (dispatch) {
      dispatch({
        type: "EDIT_TASK_CHECKBOX",
        payload: {
          ...task,
          done: isChecked,
        },
      })
    }
    if (isChecked) return setConfettiEnabled(true)
    setConfettiEnabled(false)
  }

  const handleDeleteTask = () => {
    if (dispatch) {
      dispatch({
        type: "DELETE_TASK",
        payload: task,
      })
    }
  }

  return (
    <div
      id={id}
      ref={targetRef}
      className={`${card} ${
        !task.done ? "bg-teal-50" : "bg-teal-50 text-gray-400"
      } flex flex-col TestTaskId${task.id} text-ellipsis`}
    >
      {confettiEnabled && <Confetti />}
      <div className={`mb-2 flex items-center justify-between`}>
        <input
          type="checkbox"
          checked={task.done}
          className={`TestTaskCheckbox${task.id} cursor-pointer`}
          onChange={handleTaskCheckbox}
        ></input>
        <button
          type="button"
          className={`TestTaskDelete${task.id}`}
          onClick={handleDeleteTask}
        >
          ✖
        </button>
      </div>
      <input
        type="text"
        value={task.title}
        onChange={handleEditTitle}
        className={`mb-2 p-2 rounded border text-ellipsis overflow-hidden ${
          !task.done ? "border-black" : "border-gray-400"
        } TestTaskTitle${task.id}`}
      />
      <textarea
        rows={5}
        cols={20}
        value={task.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border ${
          !task.done ? "border-black" : "border-gray-400"
        } TestTaskDescription${task.id}`}
      ></textarea>
    </div>
  )
}

export default Task
