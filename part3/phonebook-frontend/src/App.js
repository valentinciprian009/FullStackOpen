import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import numbersService from './services/numbers'
import Notification from './Notification'

const App = ({}) => {
  const [persons, setPersons] = useState([])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    numbersService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
        setFilteredPersons(initialNumbers)
      })
      .catch(error => {
        setIsError(true)
        setErrorMessage(`Error: ${error.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }
        , 5000)
      })
  }, [])

  const confirmUpdate = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      numbersService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setFilteredPersons(filteredPersons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setIsError(false)
          setErrorMessage(
            `Updated ${returnedPerson.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setIsError(true)
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
        })
    }

  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      setIsError(true)
      setErrorMessage(
        `${newName} is already added to phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
        confirmUpdate()
      }, 1000)

      return
    }

    // name should only include letters and spaces
    if (!newName.match(/^[a-zA-Z ]+$/)) {
      alert(`Name should only include letters and spaces`)
      return
    }

    // name should not be empty
    if (newName === '') {
      alert(`Name should not be empty`)
      return
    }

    // number should only include numbers and - characters
    if (!newNumber.match(/^[0-9-]+$/)) {
      alert(`number should only include numbers and - characters`)
      return
    }

    // number should not be empty
    if (newNumber === '') {
      alert(`number should not be empty`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    numbersService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilteredPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setIsError(false)
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }
          , 5000)
      })
      .catch(error => {
        setIsError(true)
        setErrorMessage(`Error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }
          , 5000)
      })
  }

  const showPersonsByFilter = (event) => {
    const filter = event.target.value
    const newFilteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setFilteredPersons(newFilteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError}/>
      <Filter onChangeFunction={showPersonsByFilter} />
      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={(event) => setNewName(event.target.value)} newNumber={newNumber} handleNumberChange={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} setFilteredPersons={setFilteredPersons} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setIsError={setIsError} />
    </div>
  )
}

export default App