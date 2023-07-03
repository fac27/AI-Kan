const APIGrandparent: FC = ({
  projectInput,
  setProjectInput,
  result,
  setResult,
}) => {
  async function onSubmit(event) {
    event.preventDefault()
    console.log(projectInput)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: projectInput }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
      setProjectInput("")
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

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
