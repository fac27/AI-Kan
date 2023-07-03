import { FC } from "react"

interface IssueProps {
  title: string;
  description: string;
}

const Issue: FC<IssueProps> = ( { title, description }) => {
  return (
    <div>
      <div>
        <input type="checkbox"></input>
        <input type="text" value={title}/>
        <textarea rows={4} cols={50} value={description}></textarea>
        <button type="button">⌄</button>
        <button type="button">+</button>
      </div>
    </div>
  )
}

export default Issue