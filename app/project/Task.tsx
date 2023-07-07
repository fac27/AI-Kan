import { FC, useState } from "react"
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

  const [expanded, setExpanded] = useState(false)

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

  function handleTaskCheckbox(event) {
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
  }

  function handleDeleteTask() {
    if (dispatch) {
      dispatch({
        type: "DELETE_TASK",
        payload: task,
      })
    }
  }

  const toggleExpanded = () => {
    setExpanded(prev => !prev)
  }

  return (
    <div
      id={id}
      ref={targetRef}
      className={`${card} ${taskstyle} flex flex-col TestTaskId${task.id}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <input
          type="checkbox"
          checked={task.done}
          className={`TestTaskCheckbox${task.id}`}
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
        className={`mb-2 p-2 rounded border border-black TestTaskTitle${task.id} `}
      />
      <textarea
        rows={4}
        cols={20}
        value={task.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border border-black TestTaskDescription${
          task.id
        } ${expanded ? "" : "hidden"}`}
      ></textarea>
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={toggleExpanded}
          type="button"
          className="-translate-y-1"
        >
          ⌄
        </button>
        <button type="button">＋</button>
      </div>
    </div>
  )
}

export default Task
