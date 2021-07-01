import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  // Creo un nuevo estado para almacenar las personas a mostrar
  const [ personsShown, setPersonsShown ] = useState(persons)

  const handleAddPerson = (event) => {
    event.preventDefault()
    if(!persons.find(p => p.name === newName)) {
      const tempPerson = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(tempPerson))
      setNewName('')
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
  
  // Seria posible hacer esto con una variable y no con una funcion?
  const handleFilter = (event) => {
     event.target.value.length > 0
      ? setPersonsShown(persons.filter((person) => person.name.search(new RegExp(event.target.value, "i")) !== -1))
      : setPersonsShown(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Creo el input y anado un handler */}
      filter shown with <input type="text" onChange={handleFilter}/>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} /><br/>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* Cambio para mostrar el estado personsShown */}
      {personsShown.map(person => <p key={person.name} >{person.name} {person.number}</p>)}       
    </div>
  )
}

export default App