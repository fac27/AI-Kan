import { FC } from "react"
import { card, issueStyle } from "../Styles/TailwindClasses"
import { useProjectDispatch } from "../Context/store"
import { Issue } from "../types/types"

interface IssueProps {
  issue: Issue
}

const Issue: FC<IssueProps> = ({ issue }) => {
  const dispatch = useProjectDispatch()

  function handleIssueCheckbox(event) {
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

  return (
    <div>
      <div className={`${card} ${issueStyle}`}>
        <input
          type="checkbox"
          checked={issue.done}
          onChange={handleIssueCheckbox}
        ></input>
        <input type="text" value={issue.title} />
        <textarea
          rows={4}
          cols={20}
          value={issue.description}
          className="resize-none"
        ></textarea>
        <div className="flex justify-between">
          <button type="button">⌄</button>
          <button type="button">+</button>
        </div>
      </div>
    </div>
  )
}

export default Issue
