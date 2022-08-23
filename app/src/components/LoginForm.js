import { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

export default function LoginForm ({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const credentials = { username, password }

    handleLogin(credentials)

    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel='Show login'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
