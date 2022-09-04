const Logout = ({ user, handleLogout }) => (
  <>
    <div>
      <em>{user.name} logged in</em>
    </div>
    <button onClick={handleLogout}>Logout</button>
  </>
)

export default Logout
