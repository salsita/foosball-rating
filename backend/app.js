const express = require('express')
const bodyParser = require('body-parser')

const storage = require("./storage/storage")
const matchRepository = require("./repositories/match-repository")
const userRepository = require("./repositories/user-repository")

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)

app.get('/users', (req, res) => {
    storage.getAllUsers()
        .then(res.send.bind(res))
        .catch(error => {
            console.error(error)
            res.statusCode = 500
            res.send("Failed to fetch matches.")
        })
})

app.get('/matches', (req, res) => {
    storage.getAllMatches()
        .then(res.send.bind(res))
        .catch(error => {
            console.error(error)
            res.statusCode = 500
            res.send("Failed to fetch users.")
        })
})

app.post('/users', (req, res) => {
    userRepository.addUser(req.body)
        .then(res.send.bind(res))
        .catch(error => {
            console.error(error)
            res.statusCode = error.httpStatusCode || 500
            res.send(error.message)
        })
})

app.post('/matches', (req, res) => {
    matchRepository.recordMatch(req.body)
        .then(res.send.bind(res))
        .catch(error => {
            console.error(error)
            res.statusCode = error.httpStatusCode || 500
            res.send(error.message)
        })
})

app.listen(port, () => console.log(`Foosball backend running on ${port}!`))
