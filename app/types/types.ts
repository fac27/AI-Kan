export interface GlobalContextProviderProps {
  children: ReactNode
}

export interface Task {
  id: number
  title: string
  description: string
  timeEstimate: string
  issues: Issue[]
  done: boolean
}

export interface Issue {
  id: number
  taskId: number
  title: string
  description: string
  timeEstimate: string
  done: boolean
}

export interface ContextProps {
  projectId: number
  setProjectId: Dispatch<SetStateAction<number>>
  task: Task
  setTask: Dispatch<SetStateAction<Task>>
}
