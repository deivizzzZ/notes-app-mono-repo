import { useState } from 'react'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import Notes from './components/Notes'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NoteDetail from './components/NoteDetail'
import Notification from './components/Notification'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

const Home = ({ user, notification, handleLogout }) => (
  <>
    <h2>Home Page</h2>
    {notification ? <Notification message={notification} /> : null}
    {user ? <Logout user={user} handleLogout={handleLogout} /> : null}
  </>
)

const Users = () => <h2>Users</h2>

const App = () => {
  const { notes, createNote, toggle } = useNotes()
  const { user, login, logout } = useUser()
  const [notification, setNotification] = useState(null)

  const inlineStyle = {
    padding: 5
  }

  const handleLogin = (credentials) => {
    login(credentials)
      .catch(error => {
        console.error(`${error.code}\n${error.name}\n${error.message}`)
        setNotification('Wrong credentials')
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const handleLogout = () => logout()

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
        <Route path='/notes' element={<Notes user={user} notes={notes} createNote={createNote} toggle={toggle} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
        <Route path='/' element={<Home user={user} notification={notification} handleLogout={handleLogout} />} />
      </Routes>
      <footer>
        <i>Notes App, Ludvig Amide, 2022</i>
      </footer>
    </div>
  )
}

export default App
