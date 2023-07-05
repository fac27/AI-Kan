"use client"

import { createContext, useContext, useReducer, Dispatch } from "react"

import exampleData from "../../data/exampleData"
import { ActionTypes, Project } from "../types/types"

const ProjectContext = createContext <Dispatch<Project> | null>(null)

const ProjectDispatchContext = createContext<Dispatch<ActionTypes> | null>(null)

export function ProjectProvider({ children }) {
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

function projectReducer(state: object[], action: ActionTypes) {
  switch (action.type) {
    case "EDIT_TITLE": {
      return state.map(project => {
        if (project.id === 0) {
          return {
            ...project,
            tasks: project.tasks.map(task => {
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
