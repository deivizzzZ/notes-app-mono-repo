import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function Note ({ note, user, toggleImportance }) {
  const label = note.important ? 'make not important' : 'make important'

  const setImportance = (note) => {
    const newNote = { ...note, important: !note.important }
    toggleImportance(note.id, newNote)
  }

  return (
    <>
      <td className='note'>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </td>
      {
        user
          ? (
            <td>
              <Button onClick={() => setImportance(note)}>{label}</Button>
            </td>
            )
          : null
      }
    </>
  )
}
