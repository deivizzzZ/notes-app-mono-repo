import Button from 'react-bootstrap/Button'

const Logout = ({ user, handleLogout }) => (
  <>
    <div>
      <em>{user.name} logged in</em>
    </div>
    <Button variant='secondary' onClick={handleLogout}>Logout</Button>
  </>
)

export default Logout
