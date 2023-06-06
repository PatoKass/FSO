const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  console.log(req.user)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    res.status(400).json('Please give a title and url for your blog')
  }

  // const users = await User.find({})
  // const user = users[0]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  user.blogs = user.blogs.filter((blog) => blog.id !== user._id)
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const newLikes = req.body.likes
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: newLikes },
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedBlog)
})

module.exports = blogsRouter
