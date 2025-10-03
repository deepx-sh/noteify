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
      if (note.title === "" || note.content === "") {
        toast.error("Title and Content cannot be empty!");
        return;
      }
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note added successfully!");
    },
    updateToNotes: (state,action) => {
      
      const note = action.payload;
      console.log(note);
      
      const index = state.notes.findIndex((item) => item._id === note._id);
      console.log(index);
      
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes))
   
        toast.success("Note updated successfully!");
      }
    },
    resetAllNotes: (state, action) => {
      state.notes = [];
      localStorage.removeItem("notes");
      toast.success("All notes have been reset!");
      },
      deleteFromNotes: (state, action) => {
        const noteId = action.payload;

        const index = state.notes.findIndex((item) => item._id == noteId);

        if (index >= 0) {
          state.notes.splice(index, 1);
          localStorage.setItem("notes", JSON.stringify(state.notes));

            toast.success("Note deleted successfully!");
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes,updateToNotes,resetAllNotes,deleteFromNotes } = notesSlice.actions

export default notesSlice.reducer