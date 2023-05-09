import React from 'react'

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input onChange={handleNameChange} value={newName} />
          number:
          <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
