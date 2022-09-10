import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import { TableCell, Button } from '@mui/material'

export default function Note ({ note, user, toggleImportance }) {
  const label = note.important ? 'make not important' : 'make important'

  const setImportance = (note) => {
    const newNote = { ...note, important: !note.important }
    toggleImportance(note.id, newNote)
  }

  return (
  // BOOTSTRAP

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

  // MATERIAL UI

  // <>
  //   <TableCell className='note'>
  //     <Link to={`/notes/${note.id}`}>{note.content}</Link>
  //   </TableCell>
  //   {
  //     user
  //       ? (
  //         <TableCell>
  //           <Button color='primary' variant='outlined' onClick={() => setImportance(note)}>{label}</Button>
  //         </TableCell>
  //         )
  //       : null
  //   }
  // </>
  )
}
