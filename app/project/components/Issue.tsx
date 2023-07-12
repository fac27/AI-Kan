import { FC } from "react"
import { card } from "../../Styles/TailwindClasses"
import { useProjectDispatch } from "../../Context/store"
import { IssueType } from "../../Types/types"

interface IssueProps {
  issue: IssueType
}

const Issue: FC<IssueProps> = ({ issue }) => {
  const dispatch = useProjectDispatch()

  const handleEditTitle = event => {
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

  const handleEditDescription = event => {
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

  const handleIssueCheckbox = event => {
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

  const handleDeleteIssue = () => {
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
          className={`TestIssueCheckbox${issue.taskId}-${issue.id} cursor-pointer`}
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
        className={`mb-2 p-2 rounded border ${
          !issue.done ? "border-black" : "border-gray-400"
        } TestIssueTitle${issue.id} text-ellipsis overflow-hidden`}
      />
      <textarea
        rows={4}
        cols={20}
        value={issue.description}
        onChange={handleEditDescription}
        className={`mb-2 p-2 resize-none rounded border ${
          !issue.done ? "border-black" : "border-gray-400"
        } TestIssueDescription${issue.id} text-ellipsis overflow-scroll`}
      ></textarea>
    </div>
  )
}

export default Issue
