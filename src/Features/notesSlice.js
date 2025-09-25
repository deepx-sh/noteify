import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) :[]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
      const note = action.payload;
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note added successfully!");
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