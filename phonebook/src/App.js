import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    // Comprobamos si en el estado ya existe un objeto cuyo name es el que 
    // queremos guardar
    if(!persons.find(p => p.name === newName)) {
      const tempPerson = {
        name: newName
      }
  
      setPersons(persons.concat(tempPerson))
      setNewName('')
    } else {
      // Usando template string para mostrar el valor de la variable. Notense
      // las backquotes
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name} >{person.name}</p>)}       
    </div>
  )
}

export default App