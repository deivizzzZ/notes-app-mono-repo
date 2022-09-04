import { useState, useEffect } from 'react'
import Note from './Note'
import LoginForm from './LoginForm'
import NoteForm from './NoteForm'
import Notification from './Notification'
import noteService from '../services/notes'
import loginService from '../services/login'

export default function Notes () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(false)

  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)

    noteService.getAll().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(prevNotes => prevNotes.concat(returnedNote))
      })
      .catch(error => console.error(error))
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)

      setUser(user)
    } catch (e) {
      console.error('Wrong credentials')
      setNotification(true)
      setTimeout(() => setNotification(false), 5000)
    }
  }

  return (
    <>
      <h2>Notes</h2>
      {loading ? 'Cargando...' : ''}
      {notification ? <Notification message='Wrong credentials' /> : null}
      {
        user
          ? <NoteForm addNote={addNote} handleLogout={handleLogout} />
          : <LoginForm handleLogin={handleLogin} />
      }
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
    </>
  )
}
