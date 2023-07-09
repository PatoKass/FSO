import { useDispatch } from 'react-redux'
import { addLike, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
// import { initializeComments } from '../reducers/commentReducer'

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

  const addComment = async () => {
    dispatch(commentBlog(blog.id, newComment))
    setNewComment('')
  }

  return (
    <div className="flex items-center flex-col">
      <div>
        <h1 className="text-3xl">
          {blog.title} {blog.author}
        </h1>
        <a
          className="text-2xl"
          href={
            // the conditional is needed because if 'http' is not present, it will redirect to `blogs/${blog.url}`
            blog.url.startsWith('http') ? blog.url : `http://${blog.url}`
          }
        >
          {blog.url}
        </a>
        <div className="flex p-3">
          <p>likes: {blog.likes} </p>
          <button
            onClick={handleLike}
            className="p-2 mx-3 text-white rounded-md bg-indigo-600"
          >
            like
          </button>
        </div>
      </div>
      <div className="flex">
        <p>added by {blog.user.name} </p>
        {uploader === loggedName && (
          <button
            className="p-2 mx-12 text-white rounded-md bg-indigo-600"
            onClick={handleDelete}
          >
            remove
          </button>
        )}
      </div>
      <div>
        <h2 className="p-3 text-3xl">Comments:</h2>
        <input
          type="text"
          placeholder="comment"
          value={newComment}
          onChange={handleComment}
        />
        <button
          onClick={addComment}
          className="p-2 mx-12 text-white rounded-md bg-indigo-600"
        >
          add comment
        </button>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
