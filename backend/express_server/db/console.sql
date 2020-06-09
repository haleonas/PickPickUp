create table user
(
    userId INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);


create table offers
(
    offerId      INTEGER PRIMARY KEY,
    name         TEXT,
    description  TEXT,
    offerPrice   NUMERIC,
    offerPicture TEXT
);

select *
from offers;
select last_insert_rowid() as lastID;

create table products
(
    productId INTEGER PRIMARY KEY,
    name      TEXT    NOT NULL,
    price     NUMERIC NOT NULL
);

create table offersProducts
(
    offerId   INTEGER,
    productId INTEGER,
    amount    INTEGER
);
select *
from offersProducts;

create table orders
(
    orderId   INTEGER PRIMARY KEY,
    status    TEXT,
    orderedBy TEXT,
    qrCode    TEXT,
    amount    INTEGER,
    orderTime NUMERIC,
    offerId   INTEGER
);

select *
from orders;

/*respond with order object*/

insert into products(name, price)
values ('Apple', 10),
       ('Pear', 15.6),
       ('Banana', 5.5);

select *
from products;

select last_insert_rowid();

insert into products(name, price)
values ('Pear', 15.6);

update products
set name  = 'pear',
    price = 15
where productId = 2;

delete
FROM products
where productId = 4;
delete
FROM products;

insert into offers(description)
values ('A good combination of Apples, Pears and bananas');
select description
from offers;

insert into offersProducts(offerId, productId, amount)
values (1, 1, 3),
       (1, 2, 1),
       (1, 3, 5);
select offerId, productId, amount
from offersProducts;

select products.name, oP.amount
from products
         inner join offersProducts oP on products.productId = oP.productId
where oP.offerId = 15;

SELECT *
FROM orders
WHERE orderId = 3;

SELECT *
FROM orders
order by case when status = 'in progress' then 1 when status = 'declined' then 2 when status = 'completed' then 3 end;

select offers.description,
       products.name                          as productname,
       products.price * offersProducts.amount as totalProductPrice,
       offersProducts.amount
from offers
         inner join offersProducts on offersProducts.offerId = offers.offerId
         inner join products on offersProducts.productId = products.productId;

/* Example not summarizing correctly though*/
select offers.description, group_concat(products.name), sum(products.price), sum(offersProducts.amount)
from offers
         inner join offersProducts on offersProducts.offerId = offers.offerId
         inner join products on offersProducts.productId = products.productId;

select offers.offerId, offers.name, offers.description, offers.offerPrice, group_concat(p.name) as products
from offers
         inner join offersProducts oP on offers.offerId = oP.offerId
         inner join products p on oP.productId = p.productId
group by offers.offerId;

select offers.offerId, offers.name, offers.description, offers.offerPrice, p.name as products, oP.amount
from offers
         inner join offersProducts oP on offers.offerId = oP.offerId
         inner join products p on oP.productId = p.productId;

select *
from offers;

select offers.name, offers.description, offers.offerPrice, group_concat(p.name) as products
from offers
         inner join offersProducts oP on offers.offerId = oP.offerId
         inner join products p on oP.productId = p.productId
where offers.offerId = 15;


select *
from offers;
select *
from offersProducts
where offerId = 18;

select *
from offersProducts;

drop table offers;
drop table orders;
drop table products;
drop table offersProducts;

drop table *;