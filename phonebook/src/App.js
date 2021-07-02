import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  // Lo que guardo es el filtro
  const [ filterText, setFilterText ] = useState('')

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

 // Y lo uso aqui para guardar en una const en vez de en otro state
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