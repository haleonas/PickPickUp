create table stores(
    storeId integer primary key,
    storeName text);

create table offers(
  offerId integer primary key,
  description text,
  price NUMERIC,
  sId integer,
  products text,
  status text
);

create table ordersOffers(
      oid integer,
      offerId integer
);

create table orders(
    orderId integer primary key,
    user text,
    status text,
    pickUpTime date,
    uid integer
);

create table users(
  userId integer primary key,
  username text unique,
  password text
);

drop table stores;
drop table offers;
drop table orders;
drop table users;