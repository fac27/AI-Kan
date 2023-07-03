import { FC } from "react"

interface TaskProps {
  title: string;
  description: string;
}

const Task: FC<TaskProps> = ({title, description}) => {
  return (
    <div>
      <input type="checkbox"></input>
      <input type="text" value={title}/>
      <textarea rows={4} cols={50} value={description}></textarea>
      <button type="button">⌄</button>
      <button type="button">+</button>
    </div>
  )
}

export default Task