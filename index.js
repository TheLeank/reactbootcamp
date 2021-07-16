// Ahora usamos express, un framework para Nodejs que abstrae el uso del
// módulo http, que es necesario para crear un backend (o algo así)
const express = require('express')
const app = express()

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

// Get recibe un event handler para las peticiones HTTP GET a /, que recibe dos 
// params: request, y response. El primero contiene la información de la
// petición http, y el segundo se usa para definir cómo se responde a esa 
// petición
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
