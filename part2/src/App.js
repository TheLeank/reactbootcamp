import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  // Estado usado para almacenar array de notas
  const [notes, setNotes] = useState(props.notes)
  // Estado usado para almacenar una nueva nota y concatenarlo al estado notes
  const [newNote, setNewNote] = useState('a new note...')
  // Estado para mostrar u ocultar las notas dependiendo de si son importantes
  const [showAll, setShowAll] = useState(true)

  // Handler asociado a un submit, por lo que usamos preventDefault para evitar
  // que la pagina se refresque al pulsarlo
  const addNote = (event) => {
    event.preventDefault()
    // Creamos un objeto en el que almacenamos la nueva nota
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    // Anadimos el objeto al estado con las notas usando concat y establecemos
    // el contenido del input a un string vacio
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }
  
  // Si el estado showAll es true, almacenamos en notesToShow el contenido del
  // estado notes. Si es false, almacenamos solo notas con important=true
  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {/* Al pulsar cambiamos showAll al contrario del valor que tenga */}
        {/* Y, dependiendo de su valor, modificamos el texto del boton */}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* Ahora no usamos directamente el estado, sino que usamos la var
        creada para almacenar todas o solo las notas importantes */}
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
