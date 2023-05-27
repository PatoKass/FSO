const { MONGODB_URI } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const { info } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connecting to MongoDB:', error.message)
  })

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.blog(req, res),
    ].join(' ')
  })
)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

morgan.token('blog', (req) => {
  return JSON.stringify(req.body)
})
module.exports = app
