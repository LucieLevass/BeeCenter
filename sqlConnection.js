const mysql = require("mysql");
const fs = require('fs');


let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root', //modifier le mot de passe en fonction de son root mysql

});

module.exports = db_con;
