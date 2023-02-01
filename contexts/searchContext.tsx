import {
  createContext, useContext, Dispatch, SetStateAction, ReactNode, useState,
} from 'react'

interface SearchContextProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

interface Props {
  children: ReactNode
}

const SearchContext = createContext<SearchContextProps>({} as SearchContextProps)

export function SearchContextWrapper({ children }: Props) {
  const [search, setSearch] = useState('')

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>
}

export function useSearchContext() {
  return useContext(SearchContext)
}
