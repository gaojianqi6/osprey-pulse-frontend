import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'dark' as 'dark' | 'light',
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
  },
})

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

