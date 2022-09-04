import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Notes from './components/Notes'

const Home = () => <h2>Home Page</h2>

const Users = () => <h2>Users</h2>

const App = () => {
  const inlineStyle = {
    padding: 5
  }

  return (
    <Router>
      <header>
        <h1>Notes App</h1>
        <Link to='/' style={inlineStyle}>Home</Link>
        <Link to='/notes' style={inlineStyle}>Notes</Link>
        <Link to='/users' style={inlineStyle}>Users</Link>
      </header>
      <Routes>
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <footer>
        <i>Notes App, 2022</i>
      </footer>
    </Router>
  )
}

export default App
