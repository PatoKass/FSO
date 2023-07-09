import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    modifyBlog(state, action) {
      const blogs = state.filter((blog) => blog.id !== action.payload.id)
      return [...blogs, action.payload]
    },
  },
})

export const { appendBlog, setBlogs, modifyBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (id) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    const blog = state.find((blog) => blog.id === id)

    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    let updatedBlog = await blogService.update(id, likedBlog)

    //this fixes a bug because the server responds only with the user id instead of all user data, so this line prevents the user field to change
    //same with comments!

    updatedBlog = {
      ...updatedBlog,
      user: blog.user,
      comments: likedBlog.comments,
    }

    const updatedBlogs = state.map((blog) =>
      blog.id !== id ? blog : updatedBlog
    )

    dispatch(setBlogs(updatedBlogs))
  }
}
export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    await blogService.remove(id)

    const updatedBlogs = state.filter((blog) => blog.id !== id)
    dispatch(setBlogs(updatedBlogs))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blog = blogs.find((blog) => blog.id === id)

    const newComment = await blogService.postComment(id, comment)

    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, newComment],
    }

    dispatch(modifyBlog(updatedBlog))
  }
}

export default blogSlice.reducer
