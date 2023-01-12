const mysql = require("mysql");

let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "beecenter"
});

let create_plante = "CREATE TABLE IF NOT EXISTS Plante ( \
                        id_plante INT PRIMARY KEY, \
                        nom VARCHAR(255), \
                        nom_latin VARCHAR(255), \
                        hauteur INT, \
                        nectar INT, \
                        pollen INT, \
                        miellat VARCHAR(255), \
                        floraison VARCHAR(255), \
                        couleur VARCHAR(255), \
                        emplacement_jardin VARCHAR(255), \
                        photo BLOB \
                    );";

let create_user = "CREATE TABLE IF NOT EXISTS Utilisateur ( \
                        id_utilisateur INT PRIMARY KEY, \
                        pseudo VARCHAR(255), \
                        mail VARCHAR(255), \
                        telephone VARCHAR(255), \
                        mot_de_passe VARCHAR(255) \
                    );";

let create_partie = "CREATE TABLE IF NOT EXISTS Partie ( \
                        id_partie INT PRIMARY KEY, \
                        temps_minute INT, \
                        id_utilisateur INT,  \
                        FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) \
                    );";

let create_plante_partie = "CREATE TABLE IF NOT EXISTS Plantes_Partie ( \
                                id_partie INT, \
                                id_plante INT, \
                                PRIMARY KEY (id_partie, id_plante), \
                                FOREIGN KEY (id_partie) REFERENCES Partie(id_partie), \
                                FOREIGN KEY (id_plante) REFERENCES Plante(id_plante) \
                            );";



db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
        var sql = create_plante;
        db_con.query(sql, function(err, result){
            if (err) throw err;
            console.log("Table Plante crée"); 
        });
        
        var sql = create_user;
        db_con.query(sql, function(err, result){
            if (err) throw err;
            console.log("Table Utilisateur crée"); 
        });

        var sql = create_partie;
        db_con.query(sql, function(err, result){
            if (err) throw err;
            console.log("Table Partie crée"); 
        });

        var sql = create_plante_partie;
        db_con.query(sql, function(err, result){
            if (err) throw err;
            console.log("Table Plante_partie crée"); 
        });
    }
});

module.exports = db_con;
