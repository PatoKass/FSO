import axios from 'axios'
const blogUrl = '/api/blogs'
const userUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(blogUrl, newObject, config)
  return res.data
}

const postComment = async (id, comment) => {
  const res = await axios.post(`${blogUrl}/${id}/comments`, { comment })

  return res.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${blogUrl}/${id}`, newObject)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(blogUrl)
  return res.data
}

const getUsers = async () => {
  const res = await axios.get(userUrl)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${blogUrl}/${id}`, config)
  return res.data
}

export default {
  getAll,
  getUsers,
  create,
  update,
  setToken,
  remove,
  postComment,
}
