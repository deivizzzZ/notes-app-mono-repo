import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import Notes from './components/Notes'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NoteDetail from './components/NoteDetail'
import Notification from './components/Notification'
import loginService from './services/login'
import noteService from './services/notes'

const Home = ({ user, notification, handleLogout }) => (
  <>
    <h2>Home Page</h2>
    {notification ? <Notification message='Wrong credentials' /> : null}
    {user ? <Logout user={user} handleLogout={handleLogout} /> : null}
  </>
)

const Users = () => <h2>Users</h2>

const App = () => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const inlineStyle = {
    padding: 5
  }

  const getNotes = () => {
    noteService.getAll().then(notes => setNotes(notes))
  }

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

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(n => n.id === match.params.id)
    : null

  return (
    <div>
      <header>
        <h1>Notes App</h1>
        <Link to='/' style={inlineStyle}>Home</Link>
        <Link to='/notes' style={inlineStyle}>Notes</Link>
        <Link to='/users' style={inlineStyle}>Users</Link>
        {
          user
            ? <em>{user.name} logged in</em>
            : <Link to='login' style={inlineStyle}>Login</Link>
        }
      </header>
      <Routes>
        <Route path='/notes/:id' element={<NoteDetail note={note} />} />
        <Route path='/notes' element={<Notes user={user} notes={notes} getNotes={getNotes} createNote={createNote} toggle={toggle} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
        <Route path='/' element={<Home user={user} notification={notification} handleLogout={handleLogout} />} />
      </Routes>
      <footer>
        <i>Notes App, 2022</i>
      </footer>
    </div>
  )
}

export default App
