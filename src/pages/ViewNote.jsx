import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { deleteFromNotes } from '../Features/notesSlice';

export default function ViewNote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allNotes = useSelector((state) => state.notes.notes);
  
  const note = allNotes.find((n) => n._id === id);
  
  function handleDelete(noteId) {
    dispatch(deleteFromNotes(noteId));

    navigate('/notes');
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      
      {/* Header with back button */}
      <div className='space-y-4 mb-6'>
        <Link to="/notes" className='inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Notes
        </Link>

        <div className='flex flex-wrap gap-2'>
          <Link to={`/?noteId=${note?._id}`} className='flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200 text-sm font-medium rounded-lg'>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Note
          </Link>

          <button onClick={() => {
            navigator.clipboard.writeText(note?.content)
            toast.success("Note copied to clipboard!")
            
            
            
          }} className='flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200 text-sm font-medium rounded-lg'><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg> Copy</button>
          
          <button onClick={async () => {
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
                          
                          const shareLink = `${window.location.origin}/notes/${note._id}`;
                          await navigator.clipboard.writeText(shareLink);
                          toast.success("Link copied to clipboard");
                        }
                      }
                    }} className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-sm font-medium rounded-lg cursor-pointer'><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg> Share</button>
        </div>
      </div>


      {/* Note Card */}
      <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-8'>
        {/* Title */}
        <div className='border-b border-gray-100 pb-6 mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 leading-tight'>{ note?.title || "Untitled Note"}</h1>
          <div className='flex items-center gap-4 mt-3  text-sm text-gray-500'>
            <div className='flex items-center gap-1.5'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 5V8h6v4m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V3" />
              </svg>
              Created: {new Date(note?.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day:'numeric'
              })}
            </div>
            {note?.updatedAt && note.updatedAt !== note.createdAt && (
              <div className='flex items-center gap-1.5'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 5V8h6v4m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V3" />
              </svg>
              Updated: {new Date(note?.updatedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day:'numeric'
              })}
            </div>
            )}
          </div>
        </div>
        {/* Note Content */}
        <div className='prose prose-gray max-w-none'>
          <div className='whitespace-pre-wrap text-gray-800 leading-relaxed text-base'>
            {note?.content || "No content available"}
          </div>
        </div>
      </div>

      {/* Delete Note */}
      <div className='mt-6 flex justify-center'>
        <button onClick={() => {
          handleDelete(note?._id)
        }} className='flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium border border-red-200'><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg> Delete</button>
      </div>
    </div>
  )
}
