"use client"

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react"

interface ContextProps {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

interface GlobalContextProviderProps {
  children: ReactNode
}

const GlobalContext = createContext<ContextProps>({
  title: '',
  setTitle: (): string => '',
  description: "",
  setDescription: (): string => "",
})

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("")

  return (
    <GlobalContext.Provider value={{ title, setTitle, description, setDescription }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
