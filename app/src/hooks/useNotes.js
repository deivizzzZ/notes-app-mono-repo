import { useEffect, useState } from 'react'
import noteService from '../services/notes'

export const useNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(notes => setNotes(notes))
  }, [])

  const createNote = (noteObject) => {
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(prevNotes => prevNotes.concat(returnedNote))
      })
      .catch(error => console.error(error))
  }

  const toggle = (id, newObject) => {
    noteService.update(id, newObject)
      .then(returnedNote => {
        setNotes(prevNotes => {
          return prevNotes.map(note => {
            return note.id === returnedNote.id ? returnedNote : note
          })
        })
      })
  }

  return { notes, createNote, toggle }
}
