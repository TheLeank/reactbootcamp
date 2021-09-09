const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  // mostrar el contenido de las notas, y no solo la id, al hacer el get
  // de todos los usuarios. la funcion populate hace de "join", el cuál no
  // existe realmente en mongodb
  const users = await User.find({}).populate('notes')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
