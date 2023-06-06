import { useState } from 'react'

import blogServices from '../services/blogs'

const Blog = ({ blog, sortedBlogs, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes ? blog.likes : 0)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  // this setup is to access the name of the user currently logged, doing the trick for the fix required in ex 5.8
  const loggedUserJSON = localStorage.getItem('loggedUser')
  const loggedUser = JSON.parse(loggedUserJSON)
  const loggedName = loggedUser.name
  // if the app didn't assign the blog a user.name (because it's a newly added blog), then it's because it was posted by currently logged in user
  const uploader = blog.user.name ? blog.user.name : loggedName

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    }

    setLikes(likes + 1)
    blogServices.update(blog.id, updatedBlog)
    console.log(loggedUser)
    console.log(blog.user.name)
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this blog?'
    )
    if (confirmed) {
      blogServices.remove(blog.id)
      const updatedBlogs = sortedBlogs.filter(
        (otherBlog) => otherBlog.id !== blog.id
      )
      setBlogs(updatedBlogs)
    }
  }

  return (
    <div>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setBlogVisible(false)}>hide</button>
        <p>{blog.url} </p>
        <div>
          <p>likes: {likes} </p>
          <button onClick={() => handleLike()}>like </button>
        </div>
        {blog.user && <p>{uploader}</p>}
        {uploader === loggedName && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
