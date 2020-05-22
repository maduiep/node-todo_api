const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => res.send(db.Todo.find()
 .then((todos) => {
  res.json(todos)
 })
 .catch((err) => {
  res.send(err)
 })
))

module.exports = router