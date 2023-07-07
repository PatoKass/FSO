import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found.</div>
  }
  let sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes) //sorted according to likes, from most to least

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div id="blog-list">
      <h3>Blog List</h3>
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
