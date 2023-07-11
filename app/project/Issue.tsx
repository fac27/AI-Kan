import { FC, useState  } from "react"
import { card } from "../Styles/TailwindClasses"
import { useProjectDispatch } from "../Context/store"
import { Issue } from "../types/types"

interface IssueProps {
  issue: Issue
}

const Issue: FC<IssueProps> = ({ issue }) => {
  const dispatch = useProjectDispatch()
  function handleEditTitle(event) {
    const newTitle = event.target.value
    if (dispatch) {
      dispatch({
        type: "EDIT_ISSUE_TITLE",
        payload: {
          ...issue,
          title: newTitle,
        },
      })
    }
  }

  function handleEditDescription(event) {
    const newDescription = event.target.value
    if (dispatch) {
      dispatch({
        type: "EDIT_ISSUE_DESCRIPTION",
        payload: {
          ...issue,
          description: newDescription,
        },
      })
    }
  }

  const [issueStyle, setIssueStyle] = useState("bg-pink-50")

  function handleIssueCheckbox(event) {
    setIssueStyle("bg-black")
    const isChecked = event.target.checked

    if (dispatch) {
      dispatch({
        type: "EDIT_ISSUE_CHECKBOX",
        payload: {
          ...issue,
          done: isChecked,
        },
      })
    }
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
      className={`${card} ${issueStyle} flex flex-col mb-4 border-none TestIssueId${issue.taskId}-${issue.id}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <input
          type="checkbox"
          checked={issue.done}
          onChange={handleIssueCheckbox}
          className={`TestIssueCheckbox${issue.taskId}-${issue.id}`}
        ></input>
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
        className={`mb-2 p-2 rounded border border-black TestIssueTitle${issue.id}`}
      />
      <textarea
        rows={4}
        cols={20}
        value={issue.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border border-black TestIssueDescription${issue.id}`}
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
