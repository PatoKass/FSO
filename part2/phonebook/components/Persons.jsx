import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <strong>
            {person.name}: {person.number}
          </strong>
          <button onClick={() => handleDelete(person, person.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons
