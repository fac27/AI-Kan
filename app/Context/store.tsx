"use client"

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react"

interface GlobalContextProviderProps {
  children: ReactNode
}

interface Task {
  id: number
  title: string
  description: string
  timeEstimate: string
  issues: Issue[]
  done: boolean
}

interface Issue {
  id: number
  taskId: number
  title: string
  description: string
  timeEstimate: string
  done: boolean
}

interface ContextProps {
  projectId: number
  setProjectId: Dispatch<SetStateAction<number>>
  task: Task
  setTask: Dispatch<SetStateAction<Task>>
}

const initialTask = {
  id: 0,
  title: "",
  description: "",
  timeEstimate: "",
  issues: [
    {
      id: 0,
      taskId: 0,
      title: "",
      description: "",
      timeEstimate: "",
      done: false,
    },
  ],
  done: false,
}

const GlobalContext = createContext<ContextProps>({
  projectId: 0,
  setProjectId: (): number => 0,
  task: initialTask,
  setTask: (): Task => initialTask,
})

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [projectId, setProjectId] = useState(0)
  const [task, setTask] = useState<Task>(initialTask)

  return (
    <GlobalContext.Provider value={{ projectId, setProjectId, task, setTask }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
