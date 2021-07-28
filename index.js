require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

// el orden en que se llama al middleware con app.use() es muy importante, ya
// que es ese orden en el que se ejecutan los middlewares
// si, por ejemplo, cargamos express.json() después de un app.get, el body
// estaría vacío ya que el contenido nos llega como json (creo)
app.use(express.static('build'))
app.use(express.json())
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

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)    
    })
})

// http://expressjs.com/en/guide/writing-middleware.html#mw-fig
// pasamos como tercer argumento next
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        note ? response.json(note) : response.status(404).end()
    })
    // Usamos next para pasar el error al middleware errorhandler
    .catch(err => next(err))
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

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
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

// Escribimos el errorHandler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    
    // si identificamos el tipo de error, en este caso CastError, podemos 
    // enviar una respuesta al cliente que ayude a solucionar el error
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }

    // si no es un CastError, pasamos el error al siguiente middleware de 
    // express
    next(error)
}
  
// tiene que ser el último middleware cargado, porque al usar next en el error
// handler que tenemos justo arriba, nos cargará este middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})