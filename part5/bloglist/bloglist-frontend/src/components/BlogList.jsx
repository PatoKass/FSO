import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes) //sorted according to likes, from most to least

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <h3>Blog List</h3>
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Blog
            id={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            sortedBlogs={sortedBlogs}
          />
        </div>
      ))}
    </div>
  )
}

export default BlogList
