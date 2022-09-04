import { Link } from 'react-router-dom'

export default function Note ({ note, user, toggleImportance }) {
  const label = note.important ? 'make not important' : 'make important'

  const setImportance = (note) => {
    const newNote = { ...note, important: !note.important }
    toggleImportance(note.id, newNote)
  }

  return (
    <li className='note'>
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
      {user ? <button onClick={() => setImportance(note)}>{label}</button> : null}
    </li>
  )
}
