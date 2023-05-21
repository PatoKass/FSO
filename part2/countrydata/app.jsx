import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = (url) => {
  return axios.get(url)
}

const App = () => {
  const [filtered, setFiltered] = useState('')
  const [countryData, setCountryData] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    getAll(baseUrl).then((response) => {
      const relevantData = response.data.map((country) => {
        const capital = // sanity check for countries with no capital
          country.capital && country.capital.length > 0
            ? country.capital[0]
            : 'N/A'

        const languages = country.languages && Object.values(country.languages) //another sanity check, returns array

        return {
          name: country.name.common,
          capital,
          area: `${country.area} km`,
          languages,
          flag: country.flags.png,
        } // note: every country has a name and a flag so no check needed
      })

      setCountryData(relevantData)
    })
  }, [])

  useEffect(() => {
    if (filtered.length === 1) {
      // only applies once there's a certain match (filtered.length === 1)
      const capital = filtered[0].capital
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
      capital && // there are cases when countries lack a capital, so if they do, we don't request for weather info
        getAll(apiUrl)
          .then((response) => {
            const weatherData = response.data

            setWeatherData({
              temperature: Math.round(weatherData.main.temp - 273.15),
              icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              wind: `${weatherData.wind.speed} m/s`,
            })
          })
          .catch((error) => {
            console.log('Country has no capital city.')
          })
    } else {
      setWeatherData(null)
    }
  }, [filtered])

  const handleCountry = (evt) => {
    // basically this function manages the "filtered" state
    const filter = evt.target.value

    const matches = countryData
      ? countryData.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )
      : ''
    setFiltered(matches)
  }

  return (
    <div key="body">
      <h1>find countries</h1>
      <input autoFocus onChange={handleCountry} />
      {filtered.length === 0 ? (
        filtered === '' ? (
          <h3>Please enter a filter.</h3>
        ) : (
          <h3>No countries found, please enter a valid filter</h3>
        )
      ) : filtered.length < 11 ? (
        filtered.length === 1 ? ( // if there's a certain match, show data
          <CountryData filtered={filtered} weatherData={weatherData} />
        ) : (
          // if there's a list of max 10 candidates, show the list
          <CountryList filtered={filtered} handleCountry={handleCountry} />
        )
      ) : (
        <h3>
          Too much countries fit your request, please give a more specific
          filter.
        </h3>
      )}
    </div>
  )
}

export default App
