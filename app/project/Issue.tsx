import { FC } from "react"
import { card, issue } from "../Styles/TailwindClasses"

interface IssueProps {
  title: string
  description: string
  done: boolean
}

const Issue: FC<IssueProps> = ({ title, description, done }) => {
  return (
      <div className={`${card} ${issue} flex flex-col mb-4 border-none`}>
        <input type="checkbox" checked={done} className="mb-2 self-start"></input>
        <input type="text" value={title} className="mb-2 p-2 rounded border border-black" />
        <textarea
          rows={4}
          cols={20}
          value={description}
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
