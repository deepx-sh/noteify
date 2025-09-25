import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromNotes } from "../Features/notesSlice";
import toast from "react-hot-toast";

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  const filterNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleDelete(noteId) {
    console.log(noteId);
    
    dispatch(deleteFromNotes(noteId))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Note"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        {filterNotes.length > 0 &&
          filterNotes.map((note) => {
            return (
              <div className="border" key={note._id}>
                <div>{note.title}</div>

                <div>{note.content}</div>

                <div>
                  <button>View</button>

                  <button>Edit</button>

                  <button onClick={()=> handleDelete(note?._id)}>Delete</button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(note?.content)
                    toast.success("Note copied to clipboard!")
                  }}>Copy</button>

                  <button>Share</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
