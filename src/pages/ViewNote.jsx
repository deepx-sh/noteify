import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

export default function ViewNote() {
  const { id } = useParams();
  
  const allNotes = useSelector((state) => state.notes.notes);
  
  const note = allNotes.find((n) => n._id === id);
  
  return (
    <div>
      <h4>{note.title}</h4>
      <p>{ note.content}</p>
    </div>
  )
}
