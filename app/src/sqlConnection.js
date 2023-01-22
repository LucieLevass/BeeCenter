const mysql = require("mysql");

let db_con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    socketPath: '/mysql/mysql.sock'
});

let createQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`;
// use the query to create a Database.
db_con.query(createQuery, (err) => {
    if (err) throw err;
});

db_con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    socketPath: '/mysql/mysql.sock'
});

db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
    }
});


module.exports = db_con;
