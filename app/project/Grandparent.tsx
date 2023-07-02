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

const APIGrandparent: FC = () => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="project"
          placeholder="...a snake game in React"
          value={projectInput}
          onChange={e => setProjectInput(e.target.value)}
        />
        <input type="submit" value="Generate tasks" />
      </form>
      <div className={styles.result}>{result}</div>
    </>
  )
}
