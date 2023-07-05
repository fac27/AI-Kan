"use client"

import { ReactNode, createContext, useContext, useReducer } from "react"

import exampleData from "../../data/exampleData"
import { ActionTypes, DispatchType, Project, Task } from "../types/types"

const ProjectContext = createContext<Project[] | null>(null)

const ProjectDispatchContext = createContext<DispatchType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, dispatch] = useReducer(projectReducer, exampleData)
  console.log(project)
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

function projectReducer(state: Project[], action: ActionTypes) {
  switch (action.type) {
    case "EDIT_TITLE": {
      return state.map(project => {
        if (project.id === 0) {
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
        }
        return state
      })
    }
    case "EDIT_DESCRIPTION": {
      return state.map(project => {
        if (project.id === 0) {
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
        }
        return state
      })
    }
    default: {
      return state
    }
  }
}
