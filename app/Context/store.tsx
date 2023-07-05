"use client"

import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react"

import {
  Task,
  Issue,
  GlobalContextProviderProps,
  ContextProps,
} from "../types/types"

import exampleData from "../../data/exampleData"

const ProjectContext = createContext(null)

const ProjectDispatchContext = createContext(null)

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

function projectReducer(state, action) {
  console.log(action.payload)
  switch (action.type) {
    case "EDIT_TASK": {
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
        return project
      })
    }
    default: {
      return state
    }
  }
}
