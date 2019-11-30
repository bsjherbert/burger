DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgerTable (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(20),
    devoured BOOLEAN DEFAULT true,
    PRIMARY KEY(id)
);