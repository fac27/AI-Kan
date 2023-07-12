import { FC, useState } from "react"
import { card } from "../../Styles/TailwindClasses"
import { useProjectDispatch } from "../../Context/store"
import { Issue } from "../../types/types"
import Saving from "../components/Saving"

interface IssueProps {
  issue: Issue
}

const Issue: FC<IssueProps> = ({ issue }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const dispatch = useProjectDispatch()

  function handleEditTitle(event) {
    const newTitle = event.target.value
    setIsSaving(true)
    if (dispatch) {
      dispatch({
        type: "EDIT_ISSUE_TITLE",
        payload: {
          ...issue,
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
        type: "EDIT_ISSUE_DESCRIPTION",
        payload: {
          ...issue,
          description: newDescription,
        },
      })
    }
    return setTimeout(() => setIsSaving(false), 60 * 60)
  }

  function handleIssueCheckbox(event) {
    const isChecked = event.target.checked
    setIsSaving(true)
    if (dispatch) {
      dispatch({
        type: "EDIT_ISSUE_CHECKBOX",
        payload: {
          ...issue,
          done: isChecked,
        },
      })
    }
    return setTimeout(() => setIsSaving(false), 60 * 10)
  }

  function handleDeleteIssue() {
    if (dispatch) {
      dispatch({
        type: "DELETE_ISSUE",
        payload: issue,
      })
    }
  }

  return (
    <div
      className={`${card} ${
        !issue.done ? "bg-pink-50" : "bg-pink-50 text-gray-400"
      } flex flex-col mb-4 border-none TestIssueId${issue.taskId}-${issue.id}`}
    >
      <div className={`mb-2 flex items-center justify-between`}>
        <input
          type="checkbox"
          checked={issue.done}
          onChange={handleIssueCheckbox}
          className={`TestIssueCheckbox${issue.taskId}-${issue.id}`}
        ></input>
        {isSaving && <Saving />}
        <button
          type="button"
          className={`TestIssueDelete${issue.taskId}-${issue.id}`}
          onClick={handleDeleteIssue}
        >
          ✖
        </button>
      </div>
      <input
        type="text"
        value={issue.title}
        onChange={handleEditTitle}
        className={`mb-2 p-2 rounded border ${
          !issue.done ? "border-black" : "border-gray-400"
        } TestIssueTitle${issue.id}`}
      />
      <textarea
        rows={4}
        cols={20}
        value={issue.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border ${
          !issue.done ? "border-black" : "border-gray-400"
        } TestIssueDescription${issue.id}`}
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

export default Issue
