"use client"

import { ReactNode, createContext, useContext, useReducer } from "react"

import exampleData from "../../data/exampleData"
import {
  ActionTypes,
  Action,
  DispatchType,
  Project,
  Task,
  Issue,
} from "../types/types"

const ProjectContext = createContext<Project[] | null>(null)

const ProjectDispatchContext = createContext<DispatchType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, dispatch] = useReducer(projectReducer, exampleData)
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

function projectReducer(state: Project[], action: ActionTypes): Project[] {
  switch (action.type) {
    case "EDIT_TASK_TITLE": {
      return state.map(project => {
        return {
          ...project,
          tasks: project.tasks.map((task: Task) => {
            if (task.id === action.payload.id) {
              return {
                ...task,
                title: action.payload.title,
              }
            }
            return task
          }),
        }
      })
    }
    case "EDIT_TASK_DESCRIPTION": {
      return state.map(project => {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === action.payload.id) {
              return {
                ...task,
                description: action.payload.description,
              }
            }
            return task
          }),
        }
      })
    }
    case "EDIT_ISSUE_TITLE": {
      return state.map(project => {
        return {
          ...project,
          tasks: project.tasks.map((task: Task) => {
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
          }),
        }
      })
    }
    default: {
      return state
    }
  }
}
