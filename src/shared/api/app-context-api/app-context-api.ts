import { createContext, useContext } from 'react'
import { Article, Country } from '../news-api'

interface User {
  login: string
  birthDay: string
}

interface AppC {
  isAuth: boolean
  user: User | null
  history: Article[]
  country: Country
  changeCountry: (country: Country) => void
  addToHistory: (article: Article) => void
}

export const AppContext = createContext<AppC>({
  isAuth: false,
  user: null,
  country: 'us',
  history: [],
  changeCountry: (country: Country) => {},
  addToHistory: (article: Article) => {},
})

export const useAppContext = () => {
  return useContext(AppContext)
}
