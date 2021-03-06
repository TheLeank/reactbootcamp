import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterText, setFilterText ] = useState('')

  // Cargamos las notas de manera dinámica usando la librería axios
  useEffect(() => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    if(!persons.find(p => p.name === newName)) {
      const tempPerson = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(tempPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
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

  const filteredPersons = persons.filter((person) => person.name.search(new RegExp(filterText, "i")) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons shown={filteredPersons} />
    </div>
)
}

export default App