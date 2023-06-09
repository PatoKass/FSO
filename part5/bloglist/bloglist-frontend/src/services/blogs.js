import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((res) => res.data)
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, create, update, setToken, remove }
