const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10)

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash
  })

  user
    .save()
    .then(savedUser => res.json(savedUser))
})

module.exports = userRouter