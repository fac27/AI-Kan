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

export type Project = object[]

export type ActionTypes = {
  type: string
  payload: Task
}
