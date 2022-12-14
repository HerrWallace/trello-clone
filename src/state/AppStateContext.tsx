import { createContext, useContext } from 'react'

type Task = {
  id: string,
  text: string
}

type List = {
  id: string,
  text: string,
  tasks: Task[]
}

export type AppState = {
  lists: List[]
}

type AppStateContextProps = {
  lists: List[],
  getTasksByListId(id: string): Task[]
}

const AppStateContext = createContext({} as AppStateContextProps)

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To do',
      tasks: [{ id: 't0', text: 'Supper' }]
    },
    {
      id: '1',
      text: 'In progress',
      tasks: [{ id: 't1', text: 'Dinner' }, {id: 't2', text: 'Lunch'}]
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 't3', text: 'Breakfast' }]
    }
  ]
}

type AppStateProviderProps = {
  children: React.ReactNode
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const { lists }  = appData
  
  
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }
  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
