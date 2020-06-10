const express = require('express')
const server = express()

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
    return res.render("search-results.html")
})

//Starting server
server.listen(3000)