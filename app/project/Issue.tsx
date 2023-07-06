import { FC } from "react"
import { card, issuestyle } from "../Styles/TailwindClasses"
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
  return (
    <div className={`${card} ${issuestyle} flex flex-col mb-4 border-none`}>
      <input
        type="checkbox"
        checked={issue.done}
        className="mb-2 self-start"
      ></input>
      <input
        type="text"
        value={issue.title}
        onChange={handleEditTitle}
        className="mb-2 p-2 rounded border border-black"
      />
      <textarea
        rows={4}
        cols={20}
        value={issue.description}
        onChange={handleEditDescription}
        className="mb-2 p-2 resize-none rounded border border-black"
      ></textarea>
      <div className="flex justify-between">
        <button type="button">⌄</button>
        <button type="button">+</button>
      </div>
    </div>
  )
}

export default Issue
