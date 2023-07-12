import { FC, useState } from "react"
import { card } from "../../Styles/TailwindClasses"
import { Task } from "../../types/types"
import { useProjectDispatch } from "../../Context/store"
import Confetti from "./Confetti"
import Saving from "./Saving"

interface TaskProps {
  id: string
  task: Task
  targetRef: React.RefObject<HTMLDivElement>
}

const Task: FC<TaskProps> = ({ id, task, targetRef }) => {
  const dispatch = useProjectDispatch()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  function handleEditTitle(event) {
    const newTitle = event.target.value
    setIsSaving(true)
    if (dispatch) {
      dispatch({
        type: "EDIT_TASK_TITLE",
        payload: {
          ...task,
          title: newTitle,
        },
      })
    }
    return setTimeout(() => setIsSaving(false), 60 * 60)
  }

  function handleEditDescription(event) {
    const newDescription = event.target.value
    setIsSaving(true)
    if (dispatch) {
      dispatch({
        type: "EDIT_TASK_DESCRIPTION",
        payload: {
          ...task,
          description: newDescription,
        },
      })
    }
    return setTimeout(() => setIsSaving(false), 60 * 60)
  }

  function handleTaskCheckbox(event) {
    setIsSaving(true)
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
    return setTimeout(() => setIsSaving(false), 60 * 10)
  }

  function handleDeleteTask() {
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
      } flex flex-col TestTaskId${task.id}`}
    >
      {task.done && <Confetti />}
      <div className={`mb-2 flex items-center justify-between`}>
        <input
          type="checkbox"
          checked={task.done}
          className={`TestTaskCheckbox${task.id}`}
          onChange={handleTaskCheckbox}
        ></input>
        {isSaving && <Saving />}
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
        className={`mb-2 p-2 rounded border ${
          !task.done ? "border-black" : "border-gray-400"
        } TestTaskTitle${task.id}`}
      />
      <textarea
        rows={4}
        cols={20}
        value={task.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border ${
          !task.done ? "border-black" : "border-gray-400"
        } TestTaskDescription${task.id}`}
      ></textarea>
      <div className="mt-2 flex items-center justify-between">
        <button type="button" className="-translate-y-1">
          ⌄
        </button>
        <button type="button">＋</button>
      </div>
    </div>
  )
}

export default Task
