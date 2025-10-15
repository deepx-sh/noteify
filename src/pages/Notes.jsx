import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromNotes, resetAllNotes } from "../Features/notesSlice";
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

  function resetAll() {
    dispatch(resetAllNotes())
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
                    <Link
                      to={`/notes/${note._id}`}
                      className="flex items-center gap-1.5"
                    >
                      {" "}
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </Link>
                  </button>

                  <button className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-md hover:bg-purple-200 transition-colors duration-200">
                    <Link
                      to={`/?noteId=${note._id}`}
                      className="flex items-center gap-1.5"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>{" "}
                      Edit
                    </Link>
                  </button>

                  <button
                    className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-md hover:bg-red-200 cursor-pointer transition-colors duration-200 flex items-center gap-1.5"
                    onClick={() => handleDelete(note?._id)}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>{" "}
                    Delete
                  </button>

                  <button
                    className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium cursor-pointer rounded-md hover:bg-green-200 transition-colors duration-200 flex items-center gap-1.5"
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Note copied to clipboard!");
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const shareLink = `${window.location.origin}/notes/${note._id}`;

                        if (navigator.share) {
                          await navigator.share({
                            title: note?.title || "Untitled Note",
                            text: note?.content,
                            url: shareLink,
                          });
                          toast.success("Note shared successfully");
                        } else {
                          await navigator.clipboard.writeText(shareLink);
                          toast.success("Link copied to clipboard");
                        }
                      } catch (error) {
                        if (error.name === "AbortError") {
                          toast("Share cancelled");
                        } else {
                          console.log("Error sharing", error);
                          const shareLink = `${window.location.origin}/notes/${note._id}`;
                          await navigator.clipboard.writeText(shareLink);
                          toast.success("Link copied to clipboard");
                        }
                      }
                    }}
                    className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-md cursor-pointer hover:bg-yellow-200 transition-colors duration-200 flex items-center gap-1.5"
                  >
                    {" "}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>{" "}
                    Share
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {filterNotes.length == 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Not notes found
          </h3>
          <p className="text-gray-500">
            Try adjusting you search or create your first note.
          </p>
        </div>
      )}

      {/* Delete Note */}
      {filterNotes.length>0 && <div className='mt-6 flex justify-center'>
        <button onClick={resetAll} className='flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium border border-red-200'><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg> Delete All</button>
      </div>}
    </div>
  );
}
