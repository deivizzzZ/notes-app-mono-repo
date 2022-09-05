import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return { type, value, onChange }
}

export default function LoginForm ({ handleLogin }) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    handleLogin(credentials)

    navigate('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            {...username}
            name='Username'
            placeholder='Username'
          />
        </div>
        <div>
          <input
            {...password}
            name='Password'
            placeholder='Password'
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
