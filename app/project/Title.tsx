import { FC } from "react"

interface Props {
  id: string
}

const Title: FC = ({ id }: Props) => {
  return (
    <div id={id} className="">
      <label htmlFor="promptInput">I want to make a...</label>
      <input type="text" id="promptInput" placeholder="Snake game in React" />
      <button type="submit">Submit</button>
    </div>
  )
}

export default Title
