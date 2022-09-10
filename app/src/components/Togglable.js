import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
// import Button from '@mui/material/Button'

const Togglable = forwardRef(({ children, buttonLabel = 'Mostrar' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
  // BOOTSTRAP

    <div>
      <div style={hideWhenVisible}>
        <Button variant='info' onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant='danger' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>

  // MATERIAL UI

  // <div>
  //   <div style={hideWhenVisible}>
  //     <Button color='primary' onClick={toggleVisibility}>{buttonLabel}</Button>
  //   </div>
  //   <div style={showWhenVisible}>
  //     {children}
  //     <Button variant='outlined' color='error' onClick={toggleVisibility}>Cancel</Button>
  //   </div>
  // </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable
