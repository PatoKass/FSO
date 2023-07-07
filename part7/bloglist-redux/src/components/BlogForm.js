import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const EMPTY_BLOG = { title: '', author: '', url: '' }
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState(EMPTY_BLOG)

  const handleTitle = (e) => {
    setNewBlog({ ...newBlog, title: e.target.value })
  }
  const handleAuthor = (e) => {
    setNewBlog({ ...newBlog, author: e.target.value })
  }
  const handleUrl = (e) => {
    setNewBlog({ ...newBlog, url: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newBlog)

    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      dispatch(
        setNotification(
          'please give a title, author and url for the new blog',
          'error',
          3
        )
      )
    }

    dispatch(createBlog(newBlog))

    dispatch(
      setNotification(
        `Blog '${newBlog.title}' by ${newBlog.author} has been added `,
        'success',
        3
      )
    )

    setNewBlog(EMPTY_BLOG)
  }

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit} className="BlogForm">
        <label htmlFor="title">
          title
          <input
            autoFocus
            id="title"
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={handleTitle}
          />
        </label>
        <label htmlFor="title">
          author
          <input
            id="author"
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={handleAuthor}
          />
        </label>
        <label htmlFor="url">
          url
          <input
            id="url"
            type="text"
            name="Url"
            value={newBlog.url}
            onChange={handleUrl}
          />
        </label>
        <button type="submit" className="submit-btn">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
