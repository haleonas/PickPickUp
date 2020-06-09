const express = require('express')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const limiter = rateLimit({
    windowsMs: 1 * 60 * 1000, //minutes * seconds * milliseconds
    max: 5, //number of orders
    //5request per minutes
})

app.use(cors(), express.json(), fileUpload())

let database_

sqlite
    .open({driver: sqlite3.Database, filename: './db/pickpickup.sqlite'})
    .then(database => {
        database_ = database
    })

server.listen(3000, () => {
    console.log('Server is listening')
})

io.on('connection', (socket) => {
    socket.on('user disconnected', () => {
        console.log('user disconnected')
    })

    socket.on('userObj', async (msg) => {
        //userOBj = {orderedBy: "Jesper", offerId: 15}

        await database_.all('SELECT * FROM orders WHERE orderId = ?', [msg.orderId])
            .then(async (rows) => {
                console.log(rows)
                await socket.emit('msg', rows[0])
            })

        console.log(msg)
    })
    //socket.emit('msg',{server:'hej'})
})

//starting page
app.get('/', (request, response) => {
    response.send('hej')
    //response.send('Hello from Pick & Pick up server')
})

app.get('/products', (request, response) => {
    database_.all('SELECT * from products')
        .then((rows) => {
            response.status(200).send(rows)
        }).catch(() => {
        response.status(401).send({message: -1}
        )
    })
})

app.post('/products', (request, response) => {
    database_.run('INSERT INTO products (name, price) VALUES (?,?)',
        [request.body.name, request.body.price])
        .then(() => {
            response.send({message: 1})
        }).catch(() => {
        response.send({message: -1})
    })
})

app.get('/offerproducts', (request, response) => {
    database_.all('select products.name, products.price,oP.amount from products inner join offersProducts oP on products.productId = oP.productId where oP.offerId = ?;', [request.query.offerId])
        .then(rows => {
            response.send(rows)
        })
})

app.get('/offers', (request, response) => {

    if (request.query.offerId) {
        database_.all('select * from offers where offers.offerId = ?;', [request.query.offerId])
            .then((rows) => {
                response.send(rows)
            })
    } else {
        database_.all('select offers.offerId, offers.name,offers.description, offers.offerPrice, group_concat(p.name) as products from offers inner join offersProducts oP on offers.offerId = oP.offerId inner join products p on oP.productId = p.productId group by offers.offerId;')
            .then((rows) => {
                response.send(rows)
            })
    }
})

app.post('/offers', (request, response) => {
    database_.run('INSERT INTO offers(name,description,offerPrice,offerPicture)values(?,?,?,?); SELECT last_insert_rowid();',
        [request.body.offer.name, request.body.offer.description, request.body.offer.offerPrice, request.body.offer.offerPicture])
        .then((rows) => {
            const products = request.body.products
            const lastId = rows.lastID
            for (let i = 0; i < products.length; ++i) {
                database_.run('INSERT INTO offersProducts(offerId,productId,amount) VALUES(?,?,?)', [lastId, products[i].productId, products[i].amount])
                    .catch((error) => {
                        response.send(error)
                    })
            }
            response.send({message: 1})
        }).catch(() => {
        response.send({message: -1})
    })
})

app.post('/upload', (request, response) => {

    const image = request.files.image
    const fileName = request.files.image.name
    const path = `./assets/${fileName}`

    image.mv(path, (error) => {
        console.error(error)
        if (error) {
            return response.send({message: error})
        }
        response.send({message: 1})
    })
})

app.get('/orders', (request, response) => {
    database_.all('SELECT * FROM orders order by case when status = \'in progress\' then 1 when status = \'declined\' then 2 when status = \'completed\' then 3 end;')
        .then((rows) => {
            response.send(rows)
        })
        .catch(() => {
            response.send('Something went wrong')
        })
})

/*
timestamp
sätt i databasen

frontend
skriva ut olika tids gränser  beroende på vilken tid det är kvar
*/

app.post('/orders', async (request, response) => {
    let qrCode = `${request.body.orderedBy}`
    await database_.all('SELECT name FROM offers where offerId = ?', [request.body.offerId])
        .then(async (rows) => {
            qrCode += ' ' + await rows[0].name
        })

    await database_.run('INSERT INTO orders(orderedBy,status,qrCode,amount,offerid,orderTime) VALUES(?,?,?,?,?,?);', [request.body.orderedBy, 'awaiting response', qrCode, request.body.amount, request.body.offerId, request.body.timeStamp])
        .then(() => {
            console.log('yay')
        })
        .catch((error) => {
            response.send(error)
        })
    await database_.all('SELECT * FROM orders WHERE orderId = (SELECT MAX(orderId) from orders)')
        .then((rows) => {
            response.send(rows)
        })
})

app.put('/orders', (request, response) => {
    //orderId & status
    database_.run('UPDATE orders SET status = ? where orderId = ?', [request.body.status, request.body.orderId])
        .then(() => {
            response.send('YAY')
        })
        .catch(() => {
            response.send('NAY')
        })
})

app.put('/products', (request, response) => {
    database_.run('UPDATE products SET name = ?, price = ? where productId = ?',
        [request.body.name, request.body.price, request.body.productId])
        .then(() => {
            response.send({message: 1})
        }).catch(() => {
        response.send({message: -1})
    })
})

app.delete('/products', (request, response) => {
    database_.run('DELETE FROM products where productId = ?',
        [request.body.productId])
        .then(() => {
            response.send({message: 1})
        }).catch(() => {
        response.send({message: -1})
    })
})

app.post('/register', (request, response) => {
    database_.run('insert into user(username,password) values(?,?)',
        [request.body.username, request.body.password])
        .then((rows) => {

            response.send({userId: rows.lastId})
        }).catch(() => {
        response.send({message: -1})
    })
})

app.post('/login', (request, response) => {
    database_.all('select userId from user where username=? AND password=?', [request.body.username, request.body.password])
        .then((rows) => {
            if (rows.length === 1) {
                response.status(201).send({userid: rows[0].userId})
            } else {
                response.status(401).send({error: -1})
            }
        }).catch(() => {
        response.status(401).send({error: -1})
    })
})

app.put('/editoffer', (request, response) => {
    database_.run('UPDATE offers SET name = ?, description = ?,offerPrice = ? where offerId = ?',
        [request.body.offer.name, request.body.offer.description, request.body.offer.offerPrice, request.body.offerId])
        .then((rows) => {
            const products = request.body.products
            const offerId = rows.offerId
            for (let i = 0; i < products.length; ++i) {
                database_.run('UPDATE offersProducts SET amount = ? where offerId = ? AND productId = ?',
                    [products[i].amount, offerId, products[i].productId])
                    .catch((error) => {
                        response.send(error)
                    })
            }
            response.send({message: 1})
        }).catch(() => {
        response.send({message: -1})
    })
})