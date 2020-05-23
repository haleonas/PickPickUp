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
    .open({driver: sqlite3.Database, filename: './db/pickpickup.sqlite'})
    .then(database => {
        database_ = database
    })

//starting page
app.get('/', (request, response) => {
    response.send('Hello from Pick & Pick up server')
})

//to get all the products from the database
app.get('/products', (request, response) => {
    database_.all('SELECT *from products')
        .then((rows) => {
            response.status(200).send(rows)
        }).catch(() => {
            response.status(401).send({message: -1}
        )
    })
})

//delete a product from the database
app.delete('/products', (request, response) => {
    database_.run('delete from products where productId = ?', [request.body.productId])
        .then(() => {
            response.status(200).send({message: 1})
        }).catch(() => {
        response.status(401).send({message: -1})
    })
})

//add a product to the database
app.post('/products', (request, response) => {
    database_.run('INSERT INTO products(name,price)values(?,?)', [request.body.name, request.body.price])
        .then(() => {
            response.status(200).send({message: 1})
        }).catch((error) => {
        response.status(401).send({message: -1}
        )
    })
})

//updating a product in the database
app.put('/products',(request,response) => {
    database_.run('UPDATE products SET name = ?, price = ? where productId = ?',
        [request.body.name, request.body.price, request.body.productId])
        .then(()=>{
            response.status(200).send({message:1})
        })
        .catch(()=>{
            response.status(401).send({message:-1})
        })
})

//which port it should listen to
app.listen(3000, () => {
    console.log('Server is running')
})




