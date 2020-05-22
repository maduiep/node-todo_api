const express = require('express')
const app = express()
const port = 3000

const todoRoutes = require('./routes/todo')

app.use('/api/todos', todoRoutes)

app.get('/', (req, res) => res.send('Hello from root routes'))

app.listen(port, () => console.log(`app listening on port ${port}!`))