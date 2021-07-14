import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ notification, setNotification ] = useState({
    message: null,
    color: 'green',
  })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    if(!persons.find(p => p.name === newName)) {
      const tempPerson = {
        name: newName,
        number: newNumber
      }
  
      personsService
        .add(tempPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNotification({
            message: `Added ${person.name}`,
            color: 'green'
          })
          setTimeout(() => {
            setNotification({
              ...notification,
              message: null
            })
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
        const p = persons.find(p => p.name === newName)
        const updatedP = {...p, number: newNumber}
        personsService
          .update(p.id, updatedP)
          .then(receivedData => {
            setPersons(persons.map(p => p.name === newName ? receivedData : p))
          })
          .catch(error => {
            setPersons(persons.filter(p => p.name !== newName))
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              color: 'red'
            })
            setTimeout(() => {
              setNotification({message: null})
            }, 3000)
          })
      }
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  }

  const filteredPersons = persons.filter((person) => 
    person.name.search(new RegExp(filterText, "i")) !== -1)

  const removePerson = id => {
    const p = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${p.name}?`)) {
      personsService
        .del(id)
        .then(response => {
          personsService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
        })
        .catch(error => {
          alert(`the person with id ${id} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} color={notification.color} />
      <Filter handle={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        handleAdd={handleAddPerson}
      />
      <h2>Numbers</h2>
      {
        filteredPersons.map(person =>
          <Persons 
            key={person.id} 
            person={person} 
            remove={() => removePerson(person.id)}
          />
        )
      }
    </div>
)
}

export default App