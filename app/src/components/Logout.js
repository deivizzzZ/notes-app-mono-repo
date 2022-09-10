import Button from 'react-bootstrap/Button'
// import Button from '@mui/material/Button'

const Logout = ({ user, handleLogout }) => (
  <>
    <div>
      <em>{user.name} logged in</em>
    </div>
    {/* BOOTSTRAP */}
    <Button variant='secondary' onClick={handleLogout}>Logout</Button>
    {/* MATERIAL UI */}
    {/* <Button variant='contained' onClick={handleLogout}>Logout</Button> */}
  </>
)

export default Logout
