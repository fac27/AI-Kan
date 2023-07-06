export interface Task {
  id: number
  title: string
  description: string
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

export interface Project {
  id: number
  name: string
  tasks: Task[]
}

type Action =
  | { type: "EDIT_TASK_TITLE"; payload: Task }
  | { type: "EDIT_TASK_DESCRIPTION"; payload: Task }
  | { type: "EDIT_ISSUE_TITLE"; payload: Issue }
  | { type: "EDIT_ISSUE_DESCRIPTION"; payload: Issue }
  | { type: "EDIT_TASK_CHECKBOX"; payload: Task }
  | { type: "EDIT_ISSUE_CHECKBOX"; payload: Issue }

export type DispatchType = (value: Action) => void

export type ActionTypes = {
  type: string
  payload: Task | Issue
}
