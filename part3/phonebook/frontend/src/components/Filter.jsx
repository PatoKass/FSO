import React from 'react'

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with:
      <input onChange={handleSearch} value={search} />
    </div>
  )
}

export default Filter
