import loginService from '../services/login'
import blogService from '../services/blogs'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(
        setNotification('please give a valid username and password', 'error', 3)
      )
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form className="flex flex-col" onSubmit={handleLogin} id="login-form">
        <h2 className="flex self-center my-5 text-xl ">
          Log in to application
        </h2>
        <div className="m-3">
          username
          <input
            className="mx-3"
            autoFocus
            type="text"
            id="username"
            value={username}
            name="Username"
            autoComplete="on"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="m-3">
          password
          <input
            className="mx-3"
            type="password"
            id="password"
            value={password}
            name="Password"
            autoComplete="on"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className="p-2 my-4 text-white rounded-md bg-indigo-600"
          id="login-button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
