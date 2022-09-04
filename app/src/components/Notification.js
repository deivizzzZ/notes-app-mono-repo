const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const mystyle = {
    color: 'red',
    backgroundColor: 'lightgrey',
    border: '2px solid red',
    borderRadius: '5px'
  }

  return (
    <div style={mystyle} className='error'>
      {message}
    </div>
  )
}

export default Notification
