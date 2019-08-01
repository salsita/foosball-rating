const express = require('express')
const bodyParser = require('body-parser')

const storage = require("./storage/storage")
const matchRepository = require("./repositories/match-repository")
const userRepository = require("./repositories/user-repository")

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

require('./bot');

const addCrossDomainHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)

const processError = (response, error) => {
    console.error(error)
    response.statusCode = error.httpStatusCode || 500
    response.send(error.message)
}

app.get('/users', (req, res) => {
    storage.getAllUsers()
        .then(res.send.bind(res))
        .catch((error) => processError(res, error))
})

app.get('/matches', (req, res) => {
    storage.getAllMatches()
        .then(res.send.bind(res))
        .catch((error) => processError(res, error))

})

app.post('/users', (req, res) => {
    userRepository.addUser(req.body)
        .then(res.send.bind(res))
        .catch((error) => processError(res, error))

})

app.post('/matches', (req, res) => {
    if (req.connection.remoteAddress == "192.168.23.86") return
    matchRepository.recordMatch(req.body)
        .then(res.send.bind(res))
        .catch((error) => processError(res, error))
})

app.listen(port, () => console.log(`Foosball backend running on ${port}!`))
