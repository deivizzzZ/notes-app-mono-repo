import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleSubmit}>
      <Form.Group id='username'>
        <Form.Control
          {...username}
          name='Username'
          placeholder='Username'
        />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Control
          {...password}
          name='Password'
          placeholder='Password'
        />
      </Form.Group>
      <Button id='form-login-button' type='submit'>Login</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
