const express = require('express')
const app = express()

// Activamos el parser de json
app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

// Anteriormente comprobamos que las notas se recibían correctamente en el
// backend. Ahora la guardaremos calculando la id única.
app.post('/api/notes', (request, response) => {
    // El body es requerido al crear una nota, por tanto devolvemos error
    // si en el body no hay contenido, algo que antes no hacíamos
    // El código 400 es bad request
    const body = request.body
    if (!body.content) {
        // Especial atención al return, que hace que la ejecución se detenga y
        // no se malforme y guarde un objeto no válido
        return response.status(400).json({ 
          error: 'content missing' 
        })
    }

    const note = {
        content: body.content,
        // Si en body existe important, será la que traiga el objeto (sea true 
        // o false), en caso contrario, será false
        important: body.important || false,
        // Generamos la fecha usando el backend, de manera que nos aseguramos
        // el usar una fecha correcta, ya que si se genera en el navegador nos
        // exponemos a que el usuario no tenga una fecha bien definida
        date: new Date(),
        // Usamos el método definido para generar la nueva id
        id: generateId(),
    }

    notes = notes.concat(note)
    response.json(note)
})

// Sacamos la id más alta que existe actualmente en las notas y la guardamos
// No es un método recomendado, pero por ahora nos vale
const generateId = () => {
    const maxId = notes.length > 0
        // notes.map(n => n.id) devuelve un array con todas las notas, pero 
        // Math.max ha de trabajar con números directamente, y no con un array
        // con números. Usando el spread operator estamos devolviendo únicamente
        // la id de la nota, como número, y no un array. 
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
