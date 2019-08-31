const express = require('express')
const bodyParser = require('body-parser')

const storage = require("./storage/storage")
const matchRepository = require("./repositories/match-repository")
const userRepository = require("./repositories/user-repository")
const botFactory = require('./botFactory')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)

let bot
botFactory.makeBot(process.env.FOOSBOT_TOKEN, process.env.FOOS_CHANNEL_NAME)
    .then(botInstance => {
        bot = botInstance
        console.log('Slackbot initialized!')
    })
    .catch(error => {
        console.warn('Slackbot initialization failed!', error)
    })
        


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
    matchRepository.recordMatch(req.body, bot)
        .then(res.send.bind(res))
        .catch((error) => processError(res, error))
})

app.listen(port, () => console.log(`Foosball backend running on ${port}!`))
