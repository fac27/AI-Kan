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
  xarrowChangeCounter: number
}

type Action =
  | { type: "EDIT_TASK_TITLE"; payload: Task }
  | { type: "EDIT_TASK_DESCRIPTION"; payload: Task }
  | { type: "EDIT_ISSUE_TITLE"; payload: Issue }
  | { type: "EDIT_ISSUE_DESCRIPTION"; payload: Issue }
  | { type: "EDIT_TASK_CHECKBOX"; payload: Task }
  | { type: "EDIT_ISSUE_CHECKBOX"; payload: Issue }
  | { type: "DELETE_TASK"; payload: Task }
  | { type: "DELETE_ISSUE"; payload: Issue }
  | { type: "NEW_PROJECT"; payload: Project }
  | { type: "CHANGE_XARROWS"; payload: string }

export type DispatchType = (value: Action) => void

export type ActionTypes = {
  type: string
  payload: Task | Issue | Project | string
}
