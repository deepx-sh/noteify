import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { addToNotes, updateToNotes } from "../Features/notesSlice";

export default function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.notes)
  const navigate = useNavigate();
     useEffect(() => {
       if (noteId) {
       const note = allNotes.find((note) => note._id === noteId);
      console.log(note);
      console.log(note.title);
      
     setTitle(note.title);
     setValue(note.content);
     }
      },[noteId])
    function createNote() {
        const note = {
            title: title,
            content: value,
            _id: noteId || Date.now().toString(),
            createdAt: new Date().toISOString()
      }
      
     
        if (noteId) {
            // Update Note
          dispatch(updateToNotes(note))
          navigate("/notes")
          
        } else {
            // Create Note
            dispatch(addToNotes(note))
        }

        setTitle('');
        setValue('')
        setSearchParams({})
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-900 bg-white shadow-sm transition-all duration-200"
        />

        <button onClick={createNote} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer">
          {noteId ? "Edit Note" : "Create My Note"}
        </button>
      </div>

      <div className="w-full">
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-900 bg-white shadow-sm transition-all duration-200 resize-none font-mono text-sm leading-relaxed"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
}
