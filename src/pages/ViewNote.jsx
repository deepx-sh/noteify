import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

export default function ViewNote() {
  const { id } = useParams();
  
  const allNotes = useSelector((state) => state.notes.notes);
  
  const note = allNotes.find((n) => n._id === id);
  
  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <h4 className=''>{note.title}</h4>
      <p className=''>{ note.content}</p>
    </div>
  )
}
