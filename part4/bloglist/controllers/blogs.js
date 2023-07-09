const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {
      name: 1,
      username: 1,
      id: 1,
    })
    .populate('comments', { comment: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    res.status(400).json('Please give a title and url for your blog')
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user,
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

blogsRouter.post('/:id/comments', async (req, res) => {
  const { comment } = req.body
  const blog = await Blog.findById(req.params.id)

  const newComment = new Comment({
    comment,
    _id: new mongoose.Types.ObjectId(),
  })

  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  res.status(201).json(savedComment)
})

module.exports = blogsRouter
