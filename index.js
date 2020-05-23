const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todo')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello from root routes'))
app.use('/api/todos', todoRoutes)

app.listen(port, () => console.log(`app listening on port ${port}!`))