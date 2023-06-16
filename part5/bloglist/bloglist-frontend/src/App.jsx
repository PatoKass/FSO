import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const EMPTY_BLOG = { title: '', author: '', url: '' }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(EMPTY_BLOG)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log(blogs)
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      setNewMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setNewMessage({ text: 'logged out', type: 'success' })
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    setUser(null)
  }

  const createBlog = async (e) => {
    e.preventDefault()

    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      setNewMessage({
        text: 'Please provide a title, author, and URL.',
        type: 'error',
      })
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
      return
    }
    const createdBlog = await blogService.create(newBlog)
    setNewMessage({
      text: `Blog '${newBlog.title}' by ${newBlog.author} has been added `,
      type: 'success',
    })
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)

    setBlogs([...blogs, createdBlog])
    setNewBlog(EMPTY_BLOG)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={newMessage} />

      {user === null ? (
        <LoginForm
          password={password}
          username={username}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div>
          <div>
            <strong>{user.name} logged in</strong>

            <button id="logout-btn" type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Togglable buttonLabel={'new blog'}>
            <BlogForm
              createBlog={createBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          </Togglable>

          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>
      )}
    </div>
  )
}

export default App
