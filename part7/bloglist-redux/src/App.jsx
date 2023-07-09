import { useEffect } from 'react'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Nav from './components/Nav'
import User from './components/User'
import Userlist from './components/Userlist'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { initializeUserlist } from './reducers/userlistReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserlist())
  }, [dispatch])

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotification('logged out succesfully!', 'success', 3))
    dispatch(logoutUser())
  }

  const Home = () => {
    return (
      <div>
        <div className=" justify-center">
          <Togglable buttonLabel={'new blog'}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-yellow-500 absolute inset-0">
      <div className="mx-5">
        <Router>
          <div>
            {user && (
              <div>
                <Nav username={user.name} handleLogout={handleLogout} />
              </div>
            )}
          </div>
          <h1 className="text-5xl my-5 font-bold underline flex justify-center">
            Bloglist
          </h1>
          {notification && <Notification />}

          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace to="/" />}
            />
            <Route
              path="/users/:id"
              element={user ? <User /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/users"
              element={user ? <Userlist /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/blogs/:id"
              element={user ? <Blog /> : <Navigate replace to="/login" />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
