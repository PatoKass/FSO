import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = async (name) => {
  const response = await axios.get(`${baseUrl}/api/name/${name}`)
  if (response.ok) {
    return {
      found: true,
    }
  }
  return response.data
}

export default getCountry
