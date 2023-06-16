import propTypes from 'prop-types'

const BlogForm = ({ createBlog, setNewBlog, newBlog }) => {
  const handleTitle = (e) => {
    setNewBlog({ ...newBlog, title: e.target.value })
  }
  const handleAuthor = (e) => {
    setNewBlog({ ...newBlog, author: e.target.value })
  }
  const handleUrl = (e) => {
    setNewBlog({ ...newBlog, url: e.target.value })
  }

  return (
    <div>
      <form
        action="submit"
        onSubmit={(e) => createBlog(e)}
        className="BlogForm"
      >
        <label htmlFor="title">
          title
          <input
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

BlogForm.propTypes = {
  createBlog: propTypes.func.isRequired,
  newBlog: propTypes.object.isRequired,
  setNewBlog: propTypes.func.isRequired,
}

export default BlogForm
