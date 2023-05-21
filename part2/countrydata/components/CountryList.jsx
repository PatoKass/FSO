import React from 'react'

const CountryList = ({ filtered, handleCountry }) => {
  return filtered.map((country) => {
    return (
      <ul key={country.name}>
        <li>{country.name}</li>
        <button value={country.name} onClick={handleCountry}>
          show
        </button>
      </ul>
    )
  })
}

export default CountryList
