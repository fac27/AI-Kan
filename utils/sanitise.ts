import { TaskType } from "../app/types/types"

const sanitise = (response: string) => {
  try {
    const jsonData = JSON.parse(`{${response}`)
    if (typeof jsonData !== "object" || !jsonData.tasks)
      return "not valid object"
    let issueid = 0
    jsonData.id = 0
    jsonData.xarrowChangeCounter = 0
    jsonData.tasks.forEach((task: TaskType, index: number) => {
      // Adding task id
      task.id = index
      if (task.issues) {
        task.issues.forEach(issue => {
          // Adding taskId and issue id to each issue
          issue.taskId = task.id
          issue.id = issueid
          issueid++
        })
      }
    })
    return jsonData
  } catch {
    return "not valid object"
  }
}

export default sanitise
