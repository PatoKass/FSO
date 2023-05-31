const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !name) {
    return res.status(400).json({ error: 'Name or username are missing' })
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password must be at least three characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
