import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '../../features/searchbar/model/searchbar-slice'
import { authReducer } from '../../features/userbar/model/login-slice'
import { regReducer } from '../../features/registration/model/registration-slice'
import { newsApi } from '../../shared/api/news-api'
import { registrationMiddleware } from './middleware/reg-middleware'

const rootReducer = combineReducers({
  searchBar: searchReducer,
  auth: authReducer,
  registration: regReducer,
  [newsApi.reducerPath]: newsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registrationMiddleware, newsApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
