import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromNotes } from "../Features/notesSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";
export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  const filterNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleDelete(noteId) {
    console.log(noteId);

    dispatch(deleteFromNotes(noteId));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-900 bg-white shadow-sm transition-all duration-200"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Grid Notes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterNotes.length > 0 &&
          filterNotes.map((note) => {
            return (
              <div
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 space-y-4"
                key={note._id}
              >
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {note.title || "Untitled Note"}
                  </h3>
                </div>

                <div className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {note.content?.substring(0, 120)}
                  {note.content?.length > 120 && "..."}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-200 transition-colors duration-200">
                    <Link to={`/notes/${note._id}`}>View</Link>
                  </button>

                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-md hover:bg-purple-200 transition-colors duration-200">
                    <Link to={`/?noteId=${note._id}`}>Edit</Link>
                  </button>

                  <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-md hover:bg-red-200 cursor-pointer transition-colors duration-200" onClick={() => handleDelete(note?._id)}>
                    Delete
                  </button>

                  <button className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium cursor-pointer rounded-md hover:bg-green-200 transition-colors duration-200"
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Note copied to clipboard!");
                    }}
                  >
                    Copy
                  </button>

                  <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-md cursor-pointer hover:bg-yellow-200 transition-colors duration-200">Share</button>
                </div>
              </div>
            );
          })}
      </div>

      {filterNotes.length == 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Not notes found</h3>
          <p className="text-gray-500">Try adjusting you search or create your first note.</p>
        </div>
      )}
    </div>
  );
}
