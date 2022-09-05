import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      noteService.setToken(loggedUser.token)
    }
  }, [])

  const login = (credentials) => {
    return loginService.login(credentials)
      .then(loggedUser => {
        window.localStorage.setItem(
          'loggedNoteAppUser', JSON.stringify(loggedUser)
        )
        noteService.setToken(loggedUser.token)
        setUser(loggedUser)
      })
  }

  const logout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return { user, login, logout }
}
