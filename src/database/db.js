//Import sqlite dependencies
const sqlite3 = require("sqlite3").verbose()

//Creating DB operational object
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//Using DB operational object on SQL operations
// db.serialize( () => {
//     //Creating table using
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         name TEXT,
//     //         image TEXT,
//     //         address TEXT,
//     //         address2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `)
//     //Inserting data
//     // const query = `
//     //     INSERT INTO places (
//     //         name,
//     //         image,
//     //         address,
//     //         address2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `
//     // const values = [
//     //     "Papersider",
//     //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
//     //     "Rua Guilherme Gemballa, Jardim América",
//     //     "nº 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Papéis e Papelão"
//     // ]

//     // function afterInsertData(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Cadastrado com sucesso!")
//     //     console.log(this)
//     // }

//     // db.run(query, values, afterInsertData)

//     //Querying/consulting data
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })

//     //Deleting data
//     // db.run("DELETE FROM places WHERE id=?", [4], function(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro deletado com sucesso!")
//     // })
// })