import { useState } from 'react'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import Notes from './components/Notes'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import NoteDetail from './components/NoteDetail'
import Notification from './components/Notification'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'
import { Nav, Navbar } from 'react-bootstrap'
// import { Container, AppBar, Toolbar, IconButton, Button } from '@mui/material'

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
  // BOOTSTRAP

    <div className='container'>
      <h1>Notes App</h1>
      <Navbar collapseOnSelect expand='lg'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/notes'>Notes</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
            {
            user
              ? null
              : <Nav.Link as={Link} to='login'>Login</Nav.Link>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route
          path='/notes/:id'
          element={<NoteDetail note={note} />}
        />
        <Route
          path='/notes'
          element={<Notes user={user} notes={notes} createNote={createNote} toggle={toggle} />}
        />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/login'
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path='/'
          element={<Home user={user} notification={notification} handleLogout={handleLogout} />}
        />
      </Routes>
      <footer>
        <i>Notes App, Ludvig Amide, 2022</i>
      </footer>
    </div>

  // MATERIAL UI

  // <Container>
  //   <h1>Notes App</h1>
  //   <AppBar position='static'>
  //     <Container maxWidth='xl'>
  //       <Toolbar>
  //         <IconButton edge='start' color='inherit' aria-label='menu' />
  //         <header>
  //           <Button color='inherit' component={Link} to='/'>Home</Button>
  //           <Button color='inherit' component={Link} to='/notes'>Notes</Button>
  //           <Button color='inherit' component={Link} to='/users'>Users</Button>
  //           {
  //           user
  //             ? null
  //             : <Button color='inherit' component={Link} to='/login'>Login</Button>
  //         }
  //         </header>
  //       </Toolbar>
  //     </Container>
  //   </AppBar>
  //   <Routes>
  //     <Route
  //       path='/notes/:id'
  //       element={<NoteDetail note={note} />}
  //     />
  //     <Route
  //       path='/notes'
  //       element={<Notes user={user} notes={notes} createNote={createNote} toggle={toggle} />}
  //     />
  //     <Route
  //       path='/users'
  //       element={user ? <Users /> : <Navigate replace to='/login' />}
  //     />
  //     <Route
  //       path='/login'
  //       element={<LoginForm handleLogin={handleLogin} />}
  //     />
  //     <Route
  //       path='/'
  //       element={<Home user={user} notification={notification} handleLogout={handleLogout} />}
  //     />
  //   </Routes>
  //   <footer>
  //     <i>Notes App, Ludvig Amide, 2022</i>
  //   </footer>
  // </Container>
  )
}

export default App
