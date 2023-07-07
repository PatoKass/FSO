import { useDispatch } from 'react-redux'
import { addLike, deleteBlog, commentBlog } from '../reducers/blogReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = () => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  // this setup is to access the name of the user currently logged, doing the trick for the fix required in ex 5.8
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  const loggedName = loggedUser?.name
  const uploader = blog.user.name

  const handleLike = () => {
    dispatch(addLike(blog.id))
  }

  const handleComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification(`blog '${blog.title}' has been deleted`, 'success', 3)
    )
    navigate('/')
  }

  const addComment = () => {
    dispatch(commentBlog(id, newComment))
    setNewComment('')
  }

  return (
    <div className="blog">
      <div>
        <h1>{blog.title} </h1>
        <a
          href={
            // the conditional is needed because if 'http' is not present, it will redirect to `blogs/${blog.url}`
            blog.url.startsWith('http') ? blog.url : `http://${blog.url}`
          }
        >
          {blog.url}
        </a>
        <div>
          <p>likes: {blog.likes} </p>
          <button onClick={handleLike}>like</button>
        </div>
        <p>added by {blog.user.name} </p>
      </div>
      <div>
        {uploader === loggedName && (
          <button className="delete-btn" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
      <div>
        <h2>Comments:</h2>
        <input
          type="text"
          placeholder="comment"
          value={newComment}
          onChange={handleComment}
        />
        <button onClick={addComment}>add comment</button>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
