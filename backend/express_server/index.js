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

let connectedUsers = []


let database_

sqlite
    .open({driver: sqlite3.Database, filename: './db/pickpickup.sqlite'})
    .then(database => {
        database_ = database
    })

server.listen(3000, () => {
    console.log('Server is listening')
})


//implementing socket
io.on('connection', (socket) => {
    //socket.emit('msg','Test')

    socket.on('userOrder', (data) => {
        var user = {}
        user['user'] = socket.id
        user['orderId'] = data.orderId
        connectedUsers.push(user)
        console.log('CONNECTED USERS: ', connectedUsers)
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (request, response) => {
    response.send('Hello from Pick & Pick up server')
})

app.get('/products', (request, response) => {
    database_.all('SELECT * from products')
        .then((rows) => {
            console.log('Sending all products')
            return response.status(201).send(rows)
        })
        .catch((error) => {
            console.log('Something went wrong while retrieving products')
            return response.status(401).send({message: error}
            )
        })

})

app.post('/products', (request, response) => {
    database_.run('INSERT INTO products (name, price) VALUES (?,?)',
        [request.body.name, request.body.price])
        .then(() => {
            console.log('Product added')
            return response.status(201).send({status: 1, message: 'Product added'})
        })
        .catch(() => {
            console.log()
            return response.status(401).send({status: -1, message: 'Product couldn/t be added'})
        })


})

app.get('/offerproducts', (request, response) => {
    database_.all('select products.name, products.price,oP.amount from products inner join offersProducts oP on products.productId = oP.productId where oP.offerId = ?;', [request.query.offerId])
        .then(rows => {
            console.log('Sending all offer products')
            return response.status(201).send(rows)
        })
        .catch((error) => {
            console.log('Couldn\'t retrieve offerproducts')
            return response.status(401).send({status: -1, message: error})
        })

})

app.get('/offers', (request, response) => {
    if (request.query.offerId) {
        database_.all('select * from offers where offers.offerId = ?;', [request.query.offerId])
            .then((rows) => {
                console.log('sending all offer')
                return response.status(201).send(rows)
            })
            .catch((error) => {
                return response.status(401).send({status: -1, message: error})
            })

    } else {
        database_.all('select offers.offerId, offers.name,offers.description, offers.offerPrice, offers.offerPicture,group_concat(p.name) as products from offers inner join offersProducts oP on offers.offerId = oP.offerId inner join products p on oP.productId = p.productId group by offers.offerId;')
            .then((rows) => {
                console.log('Sending all offers')
                return response.status(201).send(rows)
            })
            .catch((error) => {
                console.log('Couldn\'t send all offers')
                return response.status(401).send({status: -1, message: error})
            })
    }

})

app.post('/offers', (request, response) => {
    database_.run('INSERT INTO offers(name,description,offerPrice,offerPicture)values(?,?,?,?); SELECT last_insert_rowid();',
        [request.body.offer.name, request.body.offer.description, request.body.offer.offerPrice, request.body.offer.offerPicture])
        .then((rows) => {
            console.log('Offer added')
            const products = request.body.products
            const lastId = rows.lastID
            for (let i = 0; i < products.length; ++i) {
                database_.run('INSERT INTO offersProducts(offerId,productId,amount) VALUES(?,?,?)', [lastId, products[i].productId, products[i].amount])
                    .catch((error) => {
                        return response.status(401).send({status: -1, message: error})
                    })
            }
            return response.send({status: 1, message: 'Offer added'})
        }).catch((error) => {
        response.status(401).send({status: -1, message: error})
    })

})

app.post('/upload', (request, response) => {

    const image = request.files.image
    const fileName = request.files.image.name
    const path = `./assets/${fileName}`

    image.mv(path, (error) => {
        console.error(error)
        if (error) {
            return response.status(401).send({status: -1, message: error})
        }
        return response.send({status: 1, message: 'Image added'})
    })

})

app.get('/orders', (request, response) => {


    if (request.query.userId) {
        database_.all('SELECT orderId,status,userId,qrCode,amount,orderTime, o.name FROM orders inner join offers o on orders.offerId = o.offerId where userId = ?', [request.query.userId])
            .then((rows) => {
                console.log('Sending order')
                return response.status(201).send(rows)
            })
            .catch((error) => {
                console.log('Error getting order: ' + error)
                return response.status(401).send({status: -1, message: error})
            })
    } else {
        database_.all('SELECT * FROM orders order by case when status = \'in progress\' then 1 when status = \'declined\' then 2 when status = \'completed\' then 3 end;')
            .then((rows) => {
                console.log('Sending all orders')
                return response.status(201).send(rows)
            })
            .catch(() => {
                console.log('Couldn\'t get order')
                return response.status(401).send({status: -1, message: error})
            })
    }


})

app.post('/orders', async (request, response) => {
    await database_.run('INSERT INTO orders(userId,status,qrCode,amount,offerid,orderTime) VALUES(?,?,?,?,?,?);', [request.body.userId, 'awaiting response', 'temp', request.body.amount, request.body.offerId, request.body.orderTime])
        .then(() => {
            console.log('Order added')
            //return response.status(201).send({status: 1, message: 'Order added'})
        })
        .catch((error) => {
            console.log(error)
            console.log('Order couldn\'t be added')
            return response.status(201).send({status: -1, message: error})
        })

    await database_.all('SELECT * FROM orders WHERE orderId = (SELECT MAX(orderId) from orders)')
        .then((rows) => {
            console.log('Order Sent')
            return response.status(201).send(rows[0])
        }).catch((error) => {
            console.log('Order couldn\'t be added')
            return response.status(201).send({status: -1, message: error})
        })


})

app.put('/orders', (request, response) => {
    //orderId & status
    database_.run('UPDATE orders SET status = ? where orderId = ?', [request.body.status, request.body.orderId])
        .then(() => {
            const orderId = Number(request.body.orderId)
            const user = connectedUsers.filter(obj => obj.orderId === orderId)[0]
            const socketId = user.user

            io.to(socketId).emit('msg', {
                orderId,
                status: request.body.status
            })

            //displaying the update message
            console.log('Order Updated')
            return response.status(201).send({status: 1, message: 'Order Updated'})


        })
        .catch((error) => {
            console.log('Order update failed', error)
            return response.status(500).send({status: 1, message: error})
        })

})

app.put('/products', (request, response) => {
    database_.run('UPDATE products SET name = ?, price = ? where productId = ?',
        [request.body.name, request.body.price, request.body.productId])
        .then(() => {
            console.log('Product updated')
            response.status(201).send({status: 1, message: 'Product updated'})
        })
        .catch((error) => {
            console.log('Product not updated')
            return response.status(401).send({status: 1, message: error})
        })

})

app.delete('/products', (request, response) => {
    database_.run('DELETE FROM products where productId = ?',
        [request.body.productId])
        .then(() => {
            console.log('Product deleted')
            return response.status(201).send({status: 1, message: 'Product deleted'})
        })
        .catch(() => {
            console.log('Product not deleted')
            return response.send({status: -1, message: 'Product not deleted'})
        })

})


app.delete('/offers', (request, response) => {
    database_.all('DELETE FROM offers where offerId = ?',
        [request.body.offerId])
        .then(() => {
            console.log('Offer Deleted')
        })
        .catch((error) => {
            console.log('Couldn\'t retrieve offer')
            return response.status(401).send({status: -1, message: error})
        })

    database_.all('Delete from offersProducts where offerId = ?', [request.body.offerId])
        .then(() => {
            console.log('Offersproduct Deleted')
            return response.status(201).send({status: 1, message: 'Offer removed'})
        })
        .catch((error) => {
            console.log(error)
            return response.status(401).send({status: -1, message: error})
        })
})


app.delete('/products', (request, response) => {
    database_.run('DELETE FROM products where productId = ?',
        [request.body.productId])
        .then(() => {
            console.log('Product deleted')
            return response.status(201).send({status: 1, message: 'Product deleted'})
        })
        .catch(() => {
            console.log('Product not deleted')
            return response.send({status: -1, message: 'Product not deleted'})
        })

})


app.post('/register', (request, response) => {
    database_.run('insert into user(username,password) values(?,?)',
        [request.body.username, request.body.password])
        .then((rows) => {
            console.log('User registered')
            return response.status(201).send({userId: rows.lastId})
        })
        .catch((error) => {
            console.log('User not registered')
            return response.send({message: error})
        })

})

app.post('/login', (request, response) => {
    database_.all('select userId from user where username=? AND password=?', [request.body.username, request.body.password])
        .then((rows) => {
            if (rows.length === 1) {
                console.log('User logged in')
                return response.status(201).send({userid: rows[0].userId})
            } else {
                console.log('User not logged in')
                return response.status(401).send({status: -1, message: 'User not logged in'})
            }
        }).catch((error) => {
        console.log('User not logged in')
        return response.status(401).send({status: -1, message: error})
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
                        console.log('Couldn\'t update the offerproduct')
                        return response.status(401).send({status: 1, message: error})
                    })
            }
            return response.status(201).send({status: 1, message: 'Offer updated'})
        }).catch((error) => {
        return response.send({status: -1, message: error})
    })

})

app.get('/pictures', (request, response) => {
    response.sendFile(__dirname + '/assets/' + request.query.image)
})