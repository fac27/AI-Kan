"use client"

import { ReactNode, createContext, useContext, useReducer } from "react"

import { ActionTypes, DispatchType, Project, Task, Issue } from "../types/types"

const ProjectContext = createContext<Project | null>(null)

const ProjectDispatchContext = createContext<DispatchType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, dispatch] = useReducer(projectReducer, {
    id: 0,
    name: "",
    tasks: [],
    xarrowChangeCounter: 0
  })
  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  )
}

export function useProject() {
  return useContext(ProjectContext)
}

export function useProjectDispatch() {
  return useContext(ProjectDispatchContext)
}

function projectReducer(project: Project, action: ActionTypes): Project {
  switch (action.type) {
    case "EDIT_TASK_TITLE": {
      const tasks = project.tasks.map((task: Task) => {
        if (task.id === action.payload.id) {
          const actionPayload = action.payload as Task
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
          const actionPayload = action.payload as Task
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
      const tasks = project.tasks.map((task: Task) => {
        const issuePayload = action.payload as Issue
        if (task.id === issuePayload.taskId) {
          return {
            ...task,
            issues: task.issues.map((issue: Issue) => {
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
      const tasks = project.tasks.map((task: Task) => {
        const issuePayload = action.payload as Issue
        if (task.id === issuePayload.taskId) {
          return {
            ...task,
            issues: task.issues.map((issue: Issue) => {
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
          const actionPayload = action.payload as Task | Issue
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
        const issuePayload = action.payload as Issue
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
        (task: Task) => task.id !== action.payload.id
      )
      const newXarrowChangeCounter = project.xarrowChangeCounter + 1;
      console.log(newXarrowChangeCounter)
      return { ...project, tasks, xarrowChangeCounter: newXarrowChangeCounter}
    }

    case "DELETE_ISSUE": {
      const tasks = project.tasks.map((task: Task) => {
        return {
          ...task,
          issues: task.issues.filter(
            (issue: Issue) => issue.id !== action.payload.id
          ),
        }
      })
      const newXarrowChangeCounter = project.xarrowChangeCounter + 1;
      console.log(newXarrowChangeCounter)
      return { ...project, tasks, xarrowChangeCounter: newXarrowChangeCounter}
    }

    case "NEW_PROJECT": {
      const actionPayload = action.payload as Project
      return actionPayload
    }

    default: {
      return project
    }
  }
}
