import WeatherData from './WeatherData'

const CountryData = ({ filtered, weatherData }) => {
  return filtered.map((country) => {
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
        {weatherData ? (
          <WeatherData weatherData={weatherData} />
        ) : (
          <div>
            No weather data found. Probably because this country lacks a capital
            city.
          </div>
        )}
      </div>
    )
  })
}

export default CountryData
