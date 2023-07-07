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
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

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
    updatedBlog = { ...updatedBlog, user: blog.user }

    const updatedBlogs = state.map((blog) =>
      blog.id !== id ? blog : updatedBlog
    )

    dispatch(setBlogs(updatedBlogs))
    console.log(state.blogs)
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
    const blogIndex = blogs.findIndex((blog) => blog.id === id)

    const blog = blogs[blogIndex]
    const comments = [...blog.comments, comment]

    const updatedBlog = {
      ...blog,
      comments,
    }

    const updatedBlogs = [...blogs]
    updatedBlogs[blogIndex] = updatedBlog

    await blogService.update(id, updatedBlog)

    dispatch(setBlogs(updatedBlogs))
  }
}

// export const commentBlog = (id, comment) => {
//   return async (dispatch, getState) => {
//     const state = getState().blogs
//     const blog = state.filter((blog) => blog.id === id)[0]
//     const comments = [...blog.comments, comment]

//     const commentedBlog = {
//       ...blog,
//       comments,
//     }

//     console.log(`commented blog is ${JSON.stringify(commentedBlog)}`)
//     const updatedBlogs = await blogService.update(id, commentedBlog)
//     console.log(`updated blogs is ${JSON.stringify(updatedBlogs)}`)

//     dispatch(setBlogs(updatedBlogs))
//   }
// }

export default blogSlice.reducer
