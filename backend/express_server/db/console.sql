create table offers
(
    offerId INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    /*small description*/
    offerPrice NUMERIC
);

select *from offers;
select last_insert_rowid() as lastID;

create table products
(
    productId INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    price     NUMERIC NOT NULL
);

create table offersProducts
(
    offerId   INTEGER,
    productId INTEGER,
    amount    INTEGER
);
select *from offersProducts;

create table orders
(
    orderId   INTEGER PRIMARY KEY,
    status    TEXT,
    orderedBy TEXT,
    qrCode    TEXT,
    offerId   INTEGER
);

insert into products(name, price)
values ('Apple', 10),
       ('Pear', 15.6),
       ('Banana', 5.5);

select *
from products;
insert into products(name, price) values('Pear',15.6);

update products
set name = 'pear', price = 15
where productId = 2;

delete from products where productId = 4;
delete from products;

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

select offers.description,
       products.name as productname,
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

drop table offers;
drop table products;
drop table offersProducts;
drop table orders;