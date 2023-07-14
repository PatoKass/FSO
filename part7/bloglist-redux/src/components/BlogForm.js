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
    <div className="my-3 items-center rounded-2xl border-red-950 border-2">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className=" p-12 flex justify-between flex-col items-center"
      >
        <label htmlFor="title">
          title
          <input
            autoFocus
            className="mx-2"
            id="title"
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={handleTitle}
          />
        </label>
        <label className="my-4" htmlFor="title">
          author
          <input
            className="mx-2"
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
            className="mx-2"
            id="url"
            type="text"
            name="Url"
            value={newBlog.url}
            onChange={handleUrl}
          />
        </label>
        <button
          type="submit"
          className="p-2 my-4 text-white rounded-md bg-indigo-600"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
