import { useState, useRef } from 'react'
import Togglable from './Togglable'
import { Button, Form } from 'react-bootstrap'

export default function NoteForm ({ addNote }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New Note' ref={togglableRef}>
      <h3>Create a new note</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='new-note'>
          <Form.Control
            type='text'
            value={newNote}
            placeholder='Write your note content'
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='success' type='submit'>Save</Button>
      </Form>
    </Togglable>
  )
}
