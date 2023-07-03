import { FC } from "react"

const Title: FC = () => {
  return (
    <div className="m-4 mt-0 border border-black">
      <label htmlFor="promptInput">I want to make a...</label>
      <input type="text" id="promptInput" placeholder="Snake game in React" />
      <button type="submit">Submit</button>
    </div>
  )
}

export default Title
