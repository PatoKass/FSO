const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 1 },
  author: { type: String, required: true, minLength: 1 },
  url: { type: String, required: true, minLength: 1 },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
