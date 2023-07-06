import { FC } from "react"
import { card, project } from "../Styles/TailwindClasses"

interface Props {
  id: string
}

const Title: FC<Props> = ({ id }: Props) => {
  return (
    <div
      id={id}
      className={`mt-10 flex flex-col items-center justify-center ${card} ${project}`}
    >
      <label htmlFor="promptInput">I want to make a...</label>
      <div className="flex justify-between mt-2.5">
        <input
          type="text"
          id="promptInput"
          placeholder="Snake game in React"
          className="p-1.5 rounded border border-black"
        />
        <button
          type="submit"
          className="border border-black bg-gray-50 p-1.5 rounded ml-5"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Title
