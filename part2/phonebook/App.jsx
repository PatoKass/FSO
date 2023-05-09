import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import PersonServices from './services/persons'
import Notification from './Notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    PersonServices.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  // match variable stores either the filtered persons list or the whole list if nothing was yet written on the filter field
  const match = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons

  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name}?`)

    const deletePerson = (id) => {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setNewMessage({
            text: `Deleted ${person.name}`,
            type: 'success',
          })
        })
        .catch((error) => {
          setNewMessage({
            text: `Information of ${person.name} has already been deleted`,
            type: 'error',
          })
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
    }
    deletePerson(person.id)
    const updatedPersons = persons.filter((p) => p.id !== person.id)
    setPersons(updatedPersons)
  }

  const handleNameChange = (evt) => {
    setNewName(evt.target.value)
  }
  const handleNumberChange = (evt) => {
    setNewNumber(evt.target.value)
  }
  const handleSearch = (evt) => {
    setSearch(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const getNextId = () => {
      // this function i made to avoid id collision:
      const maxId =
        persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0
      return maxId + 1
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: getNextId(),
    }

    // new array that adds the recently entered data to the previous persons state using spread operator
    const alreadyPerson = persons.find((person) => person.name === newName) // if the name already exists in book, this variable takes a truthy value

    if (alreadyPerson) {
      window.confirm(
        `${alreadyPerson.name} is already added to phonebook, replace old number?`
      )
      const updatedPersons = persons.map((person) =>
        person.id === alreadyPerson.id // replace the number of the person with coincidental id
          ? { ...person, number: newNumber }
          : person
      )
      setPersons(updatedPersons)
    } else {
      const newPersons = [...persons, newPerson]
      setPersons(newPersons)
      PersonServices.create(newPerson)
    }

    setNewMessage({ text: 'Added succesfully!', type: 'success' })

    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {match.length > 0 ? ( // in case they wrote something that matches nothing, say "no matches found"
          <Persons persons={match} handleDelete={handleDelete} />
        ) : (
          <div>
            <strong>No matches found</strong>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
