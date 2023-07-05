import { FC } from "react"
import { card, issue } from "../Styles/TailwindClasses"

interface IssueProps {
  title: string
  description: string
  done: boolean
}

const Issue: FC<IssueProps> = ({ title, description, done }) => {
  return (
    <div>
      <div className={`${card} ${issue}`}>
        <input type="checkbox" checked={done}></input>
        <input type="text" value={title} />
        <textarea
          rows={4}
          cols={20}
          value={description}
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
