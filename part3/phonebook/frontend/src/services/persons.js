import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
//can't name it "delete" because it's a reserved keyword
const deletion = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  deletion,
}
