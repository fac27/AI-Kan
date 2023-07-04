"use client"

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from 'react'

interface ContextProps {
  taskId: number,
  setTaskId: Dispatch<SetStateAction<number>>,
  task: string,
  setTask: Dispatch<SetStateAction<string>>
}

interface GlobalContextProviderProps {
  children: ReactNode
}

const GlobalContext = createContext<ContextProps>({
  taskId: 0,
  setTaskId: (): number => 0,
  task: '',
  setTask: (): string => ''
})

export const GlobalContextProvider = ({ children}: GlobalContextProviderProps) => {
  const [taskId, setTaskId] = useState(0)
  const [task, setTask] = useState('')

  return (
    <GlobalContext.Provider value={{ taskId, setTaskId, task, setTask }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)


