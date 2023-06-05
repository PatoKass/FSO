import { useState } from 'react'
import blogService from '../services/blogs'

const EMPTY_BLOG = { title: '', author: '', url: '' }

const BlogForm = ({ blogs, setBlogs, setNewMessage }) => {
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

    blogService.create(newBlog)
    setNewMessage({
      text: `blog '${newBlog.title}' by ${newBlog.author} has been added `,
      type: 'success',
    })
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    setBlogs([...blogs, newBlog])
    console.log(blogs)
    setNewBlog(EMPTY_BLOG)
  }

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit} className="BlogForm">
        <label htmlFor="title">
          title
          <input
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={handleTitle}
          />
        </label>
        <label htmlFor="title">
          author
          <input
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={handleAuthor}
          />
        </label>
        <label htmlFor="url">
          url
          <input
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
