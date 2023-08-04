"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react"
import {
  ActionTypes,
  DispatchType,
  ProjectType,
  TaskType,
  IssueType,
} from "../types/types"
import sanitise from "../../utils/sanitise"

const ProjectContext = createContext<ProjectType>({
  id: 0,
  name: "",
  tasks: [],
  xarrowChangeCounter: 0,
})
const ProjectDispatchContext = createContext<DispatchType | null>(null)

interface StreamContextProps {
  projectInput: string
  setProjectInput: React.Dispatch<React.SetStateAction<string>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  stream: string
  setStream: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isCleared: boolean
  setIsCleared: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const StreamContext = createContext<StreamContextProps | undefined>(undefined)

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, dispatch] = useReducer(projectReducer, {
    id: 0,
    name: "",
    tasks: [],
    xarrowChangeCounter: 0,
  })

  const [projectInput, setProjectInput] = useState("")
  const [error, setError] = useState("")
  const [stream, setStream] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCleared, setIsCleared] = useState<boolean>(true)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const time = 1000

    if (!isCleared) {
      setError("Need to clear project first")
      setTimeout(() => setError(""), time)
      return
    }

    const prompt = projectInput

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (response.status === 400) {
      setError(response.statusText)
      setTimeout(() => setError(""), time)
      return
    }

    if (response.status === 404) {
      setError("404 Not Found")
      setTimeout(() => setError(""), time)
      return
    }
    if (response.status === 500) {
      setError("API Key Depracated, contact developers.")
      setTimeout(() => setError(""), time)
      return
    }
    if (response.status !== 200) {
      const data = await response.json()
      setError(data.statusText)
      setTimeout(() => setError(""), time)
    }

    const data = response.body

    if (!data) {
      return
    }
    setIsCleared(false)
    setIsLoading(true)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    const streamedData: string[] = []

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setStream(prev => prev + chunkValue)
      streamedData.push(chunkValue)
    }

    const finalData = streamedData.join("")

    const sanitisedData = sanitise(finalData)

    if (sanitisedData === "not valid object") {
      setError("OpenAI returned invalid JSON \n Try re-sending request.")
      setTimeout(() => setError(""), time + 1500)
      setIsLoading(false)
      return
    }

    setStream("")
    setIsLoading(false)

    if (dispatch) {
      dispatch({
        type: "NEW_PROJECT",
        payload: sanitisedData,
      })
    }
  }

  return (
    <StreamContext.Provider
      value={{
        projectInput,
        setProjectInput,
        error,
        setError,
        stream,
        setStream,
        isLoading,
        setIsLoading,
        isCleared,
        setIsCleared,
        onSubmit,
      }}
    >
      <ProjectContext.Provider value={project}>
        <ProjectDispatchContext.Provider value={dispatch}>
          {children}
        </ProjectDispatchContext.Provider>
      </ProjectContext.Provider>
    </StreamContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("Context is undefined")
  }
  return context
}

export const useProjectDispatch = () => {
  const context = useContext(ProjectDispatchContext)
  if (context === null) {
    throw new Error("Context is undefined")
  }
  return context
}

export const useStreamContext = () => {
  const context = useContext(StreamContext)
  if (context === undefined) {
    throw new Error("Context is undefined")
  }
  return context
}

export const projectReducer = (
  project: ProjectType,
  action: ActionTypes
): ProjectType => {
  switch (action.type) {
    case "EDIT_TASK_TITLE": {
      const tasks = project.tasks.map((task: TaskType) => {
        if (task.id === action.payload.id) {
          const actionPayload = action.payload as TaskType
          return {
            ...task,
            title: actionPayload.title,
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "EDIT_TASK_DESCRIPTION": {
      const tasks = project.tasks.map(task => {
        if (task.id === action.payload.id) {
          const actionPayload = action.payload as TaskType
          return {
            ...task,
            description: actionPayload.description,
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "EDIT_ISSUE_TITLE": {
      const tasks = project.tasks.map((task: TaskType) => {
        const issuePayload = action.payload as IssueType
        if (task.id === issuePayload.taskId) {
          return {
            ...task,
            issues: task.issues.map((issue: IssueType) => {
              if (issue.id === issuePayload.id) {
                return {
                  ...issue,
                  title: issuePayload.title,
                }
              }
              return issue
            }),
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "EDIT_ISSUE_DESCRIPTION": {
      const tasks = project.tasks.map((task: TaskType) => {
        const issuePayload = action.payload as IssueType
        if (task.id === issuePayload.taskId) {
          return {
            ...task,
            issues: task.issues.map((issue: IssueType) => {
              if (issue.id === issuePayload.id) {
                return {
                  ...issue,
                  description: issuePayload.description,
                }
              }
              return issue
            }),
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "EDIT_TASK_CHECKBOX": {
      const tasks = project.tasks.map(task => {
        if (task.id === action.payload.id) {
          const actionPayload = action.payload as TaskType | IssueType
          return {
            ...task,
            done: actionPayload.done,
            issues: task.issues.map(issue => {
              return {
                ...issue,
                done: actionPayload.done,
              }
            }),
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "EDIT_ISSUE_CHECKBOX": {
      const tasks = project.tasks.map(task => {
        const issuePayload = action.payload as IssueType
        if (task.id === issuePayload.taskId) {
          const updatedIssues = task.issues.map(issue => {
            if (
              issue.taskId === issuePayload.taskId &&
              issue.id === issuePayload.id
            ) {
              return {
                ...issue,
                done: issuePayload.done,
              }
            }
            return issue
          })
          const areAllIssuesDone = updatedIssues.every(issue => issue.done)
          return {
            ...task,
            issues: updatedIssues,
            done: areAllIssuesDone,
          }
        }
        return task
      })
      return { ...project, tasks }
    }

    case "DELETE_TASK": {
      const tasks = project.tasks.filter(
        (task: TaskType) => task.id !== action.payload.id
      )
      const newXarrowChangeCounter = project.xarrowChangeCounter + 1
      return { ...project, tasks, xarrowChangeCounter: newXarrowChangeCounter }
    }

    case "DELETE_ISSUE": {
      const tasks = project.tasks.map((task: TaskType) => {
        return {
          ...task,
          issues: task.issues.filter(
            (issue: IssueType) => issue.id !== action.payload.id
          ),
        }
      })
      const newXarrowChangeCounter = project.xarrowChangeCounter + 1
      return { ...project, tasks, xarrowChangeCounter: newXarrowChangeCounter }
    }

    case "NEW_PROJECT": {
      const actionPayload = action.payload as ProjectType
      return actionPayload
    }

    case "CLEAR_PROJECT": {
      const emptyProject: ProjectType = {
        id: 0,
        name: "clearedProject",
        tasks: [],
        xarrowChangeCounter: 0,
      }
      return emptyProject
    }

    default: {
      return project
    }
  }
}
