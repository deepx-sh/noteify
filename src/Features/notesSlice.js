import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) :[]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
      
    },
    updateToNotes: (state,action) => {
      
    },
    resetAllNotes: (state, action) => {
     
      },
      deleteFromNotes: (state, action) => {
        
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes,updateToNotes,resetAllNotes,deleteFromNotes } = notesSlice.actions

export default notesSlice.reducer