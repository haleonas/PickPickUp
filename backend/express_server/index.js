const express = require('express')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cors())

let database_

sqlite
    .open({ driver: sqlite3.Database, filename: './db/pickpickup.sqlite' })
    .then(database => {
        database_ = database
    })

    app.get('/products', (request, response) => {
      database_.all('SELECT *from products')
          .then((rows) => {
              response.status(200).send(rows)
          }).catch(() => {
          response.status(401).send({message: -1}
          )
      })
  })


app.post('/products', (request,response) => {
    database_.run('INSERT INTO products (name, price) VALUES (?,?)',
    [request.body.name, request.body.price] )
    .then(() =>{
      response.send({message: 1})
    }).catch(() => {
      response.send({message: -1})
    })
})


app.listen(3000, () => {
  console.log('Server is running')
})




