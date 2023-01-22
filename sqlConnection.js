const mysql = require("mysql");
const fs = require('fs');


let db_con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: '', //modifier le mot de passe en fonction de son root mysql

});

module.exports = db_con;
