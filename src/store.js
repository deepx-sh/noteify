import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './Features/notesSlice'
export const store = configureStore({
    reducer: {
      notes:notesReducer
  },
})