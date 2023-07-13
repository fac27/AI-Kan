"use client"
import { ReactNode, createContext, useContext, useReducer } from "react"
import {
  ActionTypes,
  DispatchType,
  ProjectType,
  TaskType,
  IssueType,
} from "../Types/types"

const ProjectContext = createContext<ProjectType | null>(null)
const ProjectDispatchContext = createContext<DispatchType | null>(null)

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, dispatch] = useReducer(projectReducer, {
    id: 0,
    name: "",
    tasks: [],
    xarrowChangeCounter: 0,
  })
  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  return useContext(ProjectContext)
}

export const useProjectDispatch = () => {
  return useContext(ProjectDispatchContext)
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

    default: {
      return project
    }
  }
}
