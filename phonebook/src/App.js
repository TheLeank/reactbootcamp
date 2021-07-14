import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterText, setFilterText ] = useState('')

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
          setNewName('')
          setNewNumber('')
        })
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

  const filteredPersons = persons.filter((person) => 
    person.name.search(new RegExp(filterText, "i")) !== -1)

  const removePerson = id => {
    const p = persons.filter(p => p.id === id)
    if(window.confirm(`Delete ${p[0].name}?`)) {
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
      {/* Siempre usar map fuera del componente, de lo contrario no podría usar
      las propiedades del objeto a la hora de llamar a funciones declaradas en
      este mismo fichero */}
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