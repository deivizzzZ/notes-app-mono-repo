import { useState, useEffect } from 'react'
import Note from './Note'
import NoteForm from './NoteForm'

export default function Notes ({ user, notes, getNotes, createNote, toggle }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getNotes()
    setLoading(false)
  }, [])

  const addNote = (noteObject) => createNote(noteObject)

  const toggleNote = (id, newObject) => toggle(id, newObject)

  return (
    <>
      <h2>Notes</h2>
      {loading ? 'Cargando...' : ''}
      {
        user
          ? <NoteForm addNote={addNote} />
          : 'Log in to create notes and change importance'
      }
      <ul>
        {notes.map(note => <Note key={note.id} note={note} user={user} toggleImportance={toggleNote} />)}
      </ul>
    </>
  )
}
