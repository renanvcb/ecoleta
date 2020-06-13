const express = require('express')
const server = express()

//Using database
const db = require("./database/db")

//Setup public firectory
server.use(express.static("public"))

//Enabling application to use req.body
server.use(express.urlencoded({ extended: true }))

//Using template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Setup routes
//Setup "/"
server.get("/", (req, res) => {
    return res.render("index.html")
})

//Setup create point
server.get("/create-point", (req, res) => {
    //receiving form data from query strings
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
    //receiving form data from req body
    //console.log(req.body)

    //Inserting req.body data into DB
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        // console.log("Cadastrado com sucesso!")
        // console.log(this)
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

//Setup search results
server.get("/search", (req, res) => {
    //Get data from DB
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        // console.log(rows)
        //showing html page with data from db
        return res.render("search-results.html", { places: rows, total})
    })
})

//Starting server
server.listen(3000)