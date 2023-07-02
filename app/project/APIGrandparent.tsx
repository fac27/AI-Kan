const APIGrandparent: FC = ({
  onSubmit,
  projectInput,
  setProjectInput,
  result,
}) => {
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
      <div>{result}</div>
    </>
  )
}

export default APIGrandparent
