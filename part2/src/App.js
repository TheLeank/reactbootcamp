import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
  
const App = () => {
  // Inicializar las notas como un array vac'io. Ya no hay props en App que 
  // hayan sido definidas en index.js
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  // Se ejecuta primero el componente y, despues, se ejecuta useEffect, que
  // consta de dos parametros, siendo el primero la funcion o efecto en si
  // y el segundo, en este caso [], indica la frecuencia con la que se ejecuta
  // el efecto. Con [] indicamos que se lance unicamente al renderizar el 
  // componente por primera vez.
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fullfiled');
        setNotes(response.data)
      })
  }, [])
  // Esta linea se ejecuta primero con 0 notes y, tras renderizarse el comp App
  // se vuelve a ejecutar, pues App se re-renderiza por el useEffect (creo)
  console.log('render', notes.length, 'notes');
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }
  
  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
