import Note from './Note'
import NoteForm from './NoteForm'

export default function Notes ({ user, notes, createNote, toggle }) {
  const addNote = (noteObject) => createNote(noteObject)

  const toggleNote = (id, newObject) => toggle(id, newObject)

  return (
    <>
      <h2>Notes</h2>
      {!notes ? 'Cargando...' : ''}
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
