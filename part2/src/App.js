import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
  
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // Eliminamos el ID, se encarga el server
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true)

  // url es unica para cada nota
  // note guarda la nota que queremos cambiar
  // changedNote guarda la nota con la propiedad !important
  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    // Para establecer las notas, se hace un map de las notas actuales y, si no
    // tienen la id que estamos modificando, la guardamos tal cual, pero si es
    // la id que estamos modificando, guardamos la respuesta a la peticion
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

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
            <Note
              key={note.id}
              note={note}
              // Pasamos la funcion con la id de la nota para cada nota
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
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
