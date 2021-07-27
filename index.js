// Importar la config de dotenv
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

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

// Devuelve todas las notas
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)    
    })
})

// Devolver una nota buscando por id, usando findById de mongoose
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note.deleteOne({ _id: request.params.id }).then(response => {
        console.log(response)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    // Creamos la nota usando el constructor del model
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        // Responder con la nota solo si se ha guardado, usando response dentro
        // de la función callback de save(). Se mostrará el objeto con el
        // formato definido en su modelo
        response.json(savedNote)
    })
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// Acceder a las variables declaradas en dotenv como si fuesen vars de entorno
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})