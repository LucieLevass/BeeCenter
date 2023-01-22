const express = require("express");
const database = require('./sqlConnection');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {
    console.log(`Server is up and running on 3000 ...`);
});



app.get("/createDatabase", (req, res) => {

    // Variables qui contiennent le sql pour la creation de la BDD et l'insertion des plantes
    let create_plante = "CREATE TABLE IF NOT EXISTS Plante ( \
        id_plante INT PRIMARY KEY, \
        nom VARCHAR(255), \
        nom_latin VARCHAR(255), \
        hauteur VARCHAR(255), \
        nectar INT, \
        pollen INT, \
        miellat VARCHAR(255), \
        floraison VARCHAR(255), \
        couleur VARCHAR(255), \
        emplacement_jardin VARCHAR(255)\
    );";

    let insert_plantes = "INSERT INTO Plante (id_plante,nom,nom_latin,hauteur,nectar,pollen,miellat,floraison,couleur,emplacement_jardin)\
    VALUES \
    (0001,'érable champêtre','Acer campestris','15m',3,2,'M','avril,mai','vert clair','collection historique'), \
    (0002,'érable sycomore','Acer pseudoplatanus','25m',2,2,'','mai','jaunâtre','forêt'), \
    (0003,'aulne glutineux','Alnus glutinosa','25m',1,2,'M','mars,avril','jaune','étang'),\
    (0004,'ancolie','Aquilegia vulgaris','0.50m',2,3,'','mars,juin','bleu','collection historique'),\
    (0005,'herbe à la ouate','Asclépias syriaca','1.50m',3,1,'','juin,juillet,août','mauve','collection ornementale'), \
    (0006,'épine vinette','Berberis vulgaris','2m',2,1,'','juin,juillet','jaune','secteur arboretum Chine'),\
    (0007,'bourrache officinalis','Borago offinalis','0.5m',3,2,'','juin,juillet,août','bleu tendre','collection historique'),\
    (0008,'moutarde des champs','Brassica arvensis','0.6,3m',3,1,'','juin,juillet,août','jaune','collection historique'), \
    (0009,'bruyère commune callune','Calluna vulgaris','0.15,0.30m',2,1,'','août','blanc,rose','secteur terre de bruyère'),\
    (0010,'noisetier de Bysance','Corylus colurna','10,15m',0,1,'','fevrier,mars','jaune','secteur arboretum Europe'), \
    (0011,'cotoneaster','Cotoneaster horizontalis','2,3m',3,2,'','juin,juillet','rose','arboretum, secteur chine'),\
    (0012,'crocus de printemps','Crocus Vernus','0.15m',1,2,'','fevrier,mars','toutes couleurs','pelouses'),\
    (0013,'dalhia CV','Dalhia variabilis','0.5,2m',0,2,'','juillet,août,septembre','toutes couleurs','collection de dahlias'),\
    (0014,'epilobe en épis','Epilobium angustifolium','2m',3,2,'','juillet,août','rose','ruisseau'),\
    (0015,'sarrasin ou blé noir','Fagopyrum esculentum','1m',2,1,'','juin,juillet,août','blanc','collection historique'),\
    (0016,'frêne à fleurs','Fraxinus ornus','10m',1,2,'','mai, juin','blanche','secteur arboretum Europe'),\
    (0017,'févier','Gleditsia triacanthos','20m',2,0,'','juin,juillet','jaune,verte','arborteum, secteur Amérique du nord'),\
    (0018,'lierre','Hedera helix','rampant',3,3,'','septembre,octobre','vert tendre','forêt'),\
    (0019,'Lavande à feuilles étroites','Lavandula officinale','0.30,0.60m',3,1,'','juillet,août','bleu lilas','potager'),\
    (0020,'chèvrefeuille','Lonicera tartarica','3m',2,2,'','mai,juin','blanc','collection historique'),\
    (0021,'Iuzerne cultivé','Médicago sativa','0.50m',3,1,'','juin,juillet,août','mauve','collection historique'),\
    (0022,'phacelia à feuilles de tanaisie','Phacelia tanacetifolia','0.50m',3,2,'','juillet,août,septembre','bleu clair','potager écologique'),\
    (0023,'merisier','Prunus avium','10.15m',2,3,'M','avril,mai','blanche','forêt'),\
    (0024,'prunelier','Prunus spinosa','3,4m',2,2,'','avril,mai','blanc','roseraie'),\
    (0025,'buisson ardent','Pyracantha coccinéa','2,3m',2,3,'','juin,juillet','blanc','roseraie'),\
    (0026,'robinier faux acacia','Robinia pseudoacacia','20m',3,2,'','juin','blanche','étang,pavillon d accueil'),\
    (0027,'rudbeckia lacinié','Rudbeckia laciniata','1.50m',0,3,'','juillet,août','jaune','collection historique, ornementale'),\
    (0028,'saule marsault','Salix capréa','1.5,2.5m',2,3,'','mars,avril','jaune,vert','ruisseau'),\
    (0029,'verge d or','Solidago virgaurea','1.50m',2,2,'','août,septembre,octobre','jaune','collection historique'),\
    (0030,'sophora du japon','Sophora japonica','15,20m',3,1,'','août,septembre','blan crème',''),\
    (0031,'pissenlit','Taraxacum officinalis','0.30,0.60',3,3,'','avril,mai,juin,juillet','jaune','pelouse, prairie'),\
    (0032,'thym','Thymus vulgaris','0.20m',3,0,'','juin,juillet,août','mauve','jardin écologique,potager'),\
    (0033,'tilleul de Henry','Tilia henryana','12m',3,2,'','septembre','jaunâtre','étang, pavillon d accueil'),\
    (0034,'tilleul à larges feuilles','Tilia platyphillos','20m',3,2,'','juin','jaunâtre','parcelle Emille Gallé'),\
    (0035,'trèfle blanc','Trifolium repens','0.10,0.40m',3,2,'','mai,juin,juillet,août,septembre','blanc','pelouse'),\
    (0036,'petite pervenche','Vinca minor','0.30m',2,0,'','mars,avril','bleu','arboretum');";

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


    let databaseName = "beecenter";

    // let createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

    // use the query to create a Database.
    // database.query(createQuery, (err) => {
    //     if (err) throw err;

    // console.log("Database Created Successfully !");

    let useQuery = `USE ${databaseName}`;
    database.query(useQuery, (error) => {
        if (error) throw error;

        console.log("Using Database");

        var sql = create_plante;
        database.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table Plante crée");
        });

        var sql = create_user;
        database.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table Utilisateur crée");
        });

        var sql = create_partie;
        database.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table Partie crée");
        });

        var sql = create_plante_partie;
        database.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table Plante_partie crée");
        });

        var sql = insert_plantes;
        database.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Plantes insérées");

        });


        return res.send(
            `Created and Using ${databaseName} Database`);
    })


});
// });



app.get('/', (req, res) => {
    connection.query('SELECT * FROM Plante', function (err, results, fields) {
        if (err) {
            console.error(err);
            return;
        }
        res.sendFile(path.join(__dirname, '../public/plantes.html'));
    });
});
