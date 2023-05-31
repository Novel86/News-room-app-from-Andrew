import { useState, useEffect } from 'react'
import { Article } from '../api/news-api'
import { User } from './use-auth'

interface UseViewHistory {
  history: Article[]
  clearHistory: () => void
  addToHistory: (article: Article) => void
}

const useViewHistory = (user: User | null, isAuth: boolean): UseViewHistory => {
  const [history, setHistory] = useState<Article[]>([])
  useEffect(() => {
    if (user) {
      const appNewsUserHistory = localStorage.getItem(
        `news-app-history-${user.login}`,
      )
      const data = JSON.parse(appNewsUserHistory || 'null')
      setHistory(data || [])
    } else {
      const appNewsViewsHistory = localStorage.getItem('news-app-views-history')
      const data = JSON.parse(appNewsViewsHistory || 'null')
      setHistory(data || [])
    }
  }, [user])

  const addToHistory = (article: Article) => {
    if (isAuth) {
      localStorage.setItem(
        `news-app-history-${user?.login}`,
        JSON.stringify([...history, article]),
      )
    } else {
      localStorage.setItem(
        `news-app-views-history`,
        JSON.stringify([...history, article]),
      )
    }
    setHistory((prev) => [...prev, article])
  }

  const clearHistory = () => {
    if (isAuth) {
      localStorage.setItem(
        `news-app-history-${user?.login}`,
        JSON.stringify([]),
      )
    } else {
      localStorage.setItem(`news-app-views-history`, JSON.stringify([]))
    }
  }
  return { addToHistory, clearHistory, history }
}
export default useViewHistory
