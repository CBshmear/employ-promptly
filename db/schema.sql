DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id int primary key auto_increment not null,
    department_name VARCHAR(30) 
);

CREATE TABLE roles (
    id int primary key auto_increment not null,
    title VARCHAR(30),
    salary text,
    department_id int, -- to hold reference to the department the role belongs to
    foreign key(department_id)
    REFERENCES departments(id)
    ON DELETE set null
);

CREATE TABLE employees (
    id int primary key auto_increment not null,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int ,
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE set null
);
