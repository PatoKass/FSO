const loginForm = ({
  password,
  setPassword,
  username,
  setUsername,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} id="login-form">
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default loginForm
