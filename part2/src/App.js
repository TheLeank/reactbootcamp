import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  // La key ahora se indica en la llamada al componente, y no en el
  // propio <li> del componente
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App;
