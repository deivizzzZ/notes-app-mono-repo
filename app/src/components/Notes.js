import Note from './Note'
import NoteForm from './NoteForm'
// import { Table } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

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
      <Table striped>
        <tbody>
          {notes.map(note =>
            <tr key={note.id}>
              <Note
                note={note}
                user={user}
                toggleImportance={toggleNote}
              />
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}
