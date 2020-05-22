const express = require('express')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('Hello from Pick & Pick up server')
})

app.get('/stores', (request, response) => {
  sqlite
    .open({ driver: sqlite3.Database, filename: './db/pickpickup.sqlite' })
    .then(database => {
      database.all('SELECT *FROM stores')
        .then((rows) => {
          response.status(201).send(rows)
        })
    })
})

app.listen(3000, () => {
  console.log('Server is running')
})



