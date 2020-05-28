const express = require('express')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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
//starting page
app.get('/', (request, response) => {
    response.send('Hello from Pick & Pick up server')
})

app.get('/offers',(request, response)=> {
    database_.all('select offers.offerId, offers.name,offers.description, offers.offerPrice, group_concat(p.name) as products from offers inner join offersProducts oP on offers.offerId = oP.offerId inner join products p on oP.productId = p.productId group by offers.offerId;')
        .then((rows)=>{
            response.send(rows)
        })
})

app.post('/offers', (request, response) => {
    database_.run('INSERT INTO offers(name,description,offerPrice)values(?,?,?); SELECT last_insert_rowid();',
        [request.body.offer.name, request.body.offer.description, request.body.offer.offerPrice])
        .then((rows) => {
            const products = request.body.products
            const lastId = rows.lastID
            for (let i = 0; i < products.length; ++i) {
                database_.run('INSERT INTO offersProducts(offerId,productId,amount) VALUES(?,?,?)',[lastId,products[i].productId,products[i].amount])
                   .catch((error)=>{
                       response.send(error)
                })
            }
            response.send({message:1})
        }).catch(() => {
        response.send({message:-1})
    })
})


app.listen(3000, () => {
  console.log('Server is running')
})




