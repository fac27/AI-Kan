import { FC } from "react"

const Grandparent: FC = () => {
  return (
    <div>
      <label htmlFor="promptInput">I want to make a...</label>
      <input type="text" id="promptInput" placeholder="Snake game in React" />
      <button type="submit">Submit</button>
    </div>
  )
}

export default Grandparent
