import React from 'react'

const WeatherData = ({ weatherData }) => {
  return (
    <div>
      <div>temperature: {weatherData.temperature}° celsius</div>
      <img src={weatherData.icon} alt="weather icon" />
      <div>wind: {weatherData.wind} </div>
    </div>
  )
}

export default WeatherData
