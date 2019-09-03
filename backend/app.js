const express = require('express')
const bodyParser = require('body-parser')

const storage = require('./storage/storage')
const matchRepository = require('./repositories/match-repository')
const userRepository = require('./repositories/user-repository')

const MatchReporter = require('./match-reporter/match-reporter')

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

const matchReporter = new MatchReporter(
  process.env.FOOSBOT_TOKEN,
  process.env.FOOS_CHANNEL_NAME,
  process.env.MATCH_RESULT_PREFIX_SUFFIX_CONFIG
)

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

app.post('/matches', async (req, res) => {
    try {
        const oldUsers = await storage.getAllUsers()
        const match = await matchRepository.recordMatch(req.body)
        const newUsers = await storage.getAllUsers()
        if (matchReporter.isInitialized()) {
            await matchReporter.reportMatchOnSlack(match, oldUsers, newUsers)
        } else {
            console.warn('Could not report match, match reporter is not initialized')
        }
        res.send()
    } catch (error) {
        processError(res, error)
    }
})

app.listen(port, () => console.log(`Foosball backend running on ${port}!`))
