const mongoose = require('mongoose')

// Coger la url del .env
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// Definición del constructor
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

// Modificar la función toJSON del schema para formatear el objeto al devolverlo
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Exportar el modelo con nombre Note y asignamos el constructor
module.exports = mongoose.model('Note', noteSchema)
