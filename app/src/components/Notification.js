const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const mystyle = {
    margin: '5px 0',
    padding: '5px',
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
