import { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = (url) => {
  return axios.get(url)
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState([])
  const [weatherCity, setWeatherCity] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  const matches = countryData.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

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
    if (matches.length === 1) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${apiKey}`
      weatherCity &&
        getAll(apiUrl).then((response) => {
          const weatherData = response.data

          setWeatherData({
            temperature: (weatherData.main.temp - 273, 15),
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            wind: `${weatherData.wind.speed} m/s`,
          })
        })
    } else {
      setWeatherData(null)
    }
    console.log(`capital is ${weatherCity}`)
  }, [weatherCity])

  const handleCountry = (evt) => {
    setFilter(filter)

    console.log(`matches length ${matches.length}`)
    if (matches.length === 1) {
      setWeatherCity(matches[0].capital)
    } else {
      setWeatherCity(null)
    }
  }

  return (
    <div key="body">
      <h1>find countries</h1>
      <input onChange={handleCountry} value={filter} />
      {matches.length === countryData.length ? (
        //      NOT matches length === 0 because initially the match variable matches everything
        <div>Please enter a filter</div>
      ) : matches.length < 11 ? (
        matches.length === 1 ? (
          // setWeatherCity(country.capital)
          matches.map((country) => {
            return (
              <div key="country-info">
                <h1 key={country.name}>{country.name} </h1>
                <div key={country.capital}>capital {country.capital}</div>
                <div key={country.area}>area {country.area} </div>
                <h2>languages</h2>
                <ul key="country-languages">
                  {country.languages.map((lang) => (
                    <li key={lang}>{lang} </li>
                  ))}
                </ul>
                <h2>flag</h2>
                <img src={country.flag} alt="country flag" />
                {weatherData && (
                  <div>
                    <div>temperature: {weatherData.temperature}° celsius</div>
                    <img src={weatherData.icon} alt="weather icon" />
                    <div>wind: {weatherData.wind} </div>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          matches.map((country) => {
            return (
              <ul key={country.name}>
                <li>{country.name}</li>
                <button value={country.name} onClick={handleCountry}>
                  show
                </button>
              </ul>
            )
          })
        )
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  )
}

export default App
