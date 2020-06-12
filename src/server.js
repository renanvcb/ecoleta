const express = require('express')
const server = express()

//Using database
const db = require("./database/db")

//Setup public firectory
server.use(express.static("public"))

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
    return res.render("create-point.html")
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