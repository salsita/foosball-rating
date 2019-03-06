const storage = require("./storage/storage.js")
const matchRepository = require("./repositories/match-repository.js")

const express = require('express')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

app.use(urlencodedParser)
app.use(jsonParser)

app.get('/users', (req, res) => {
    storage.getAllUsers()
        .then(users => res.send(users))
        .catch(error => {
            console.error(error)
            res.send("Failed to fetch matches.")
        })
})

app.get('/matches', (req, res) => {
    storage.getAllMatchRecords()
        .then(matches => res.send(matches))
        .catch(error => {
            console.error(error)
            res.send("Failed to fetch users.")
        })
})

app.post('/users', (req, res) => {
    console.log(req.body)
    storage.addUser(req.body)
        .then(user => res.send(user))
        .catch(error => {
            console.error(error)
            // TODO: More detailed error?
            res.send("Failed to add user")
        })
})

app.post('/matches', (req, res) => {
    console.log(req.body)
    matchRepository.recordMatch(req.body)
        .then(match => res.send(match))
        .catch(error => {
            console.error(error)
            // TODO: More detailed error?
            res.send("Failed to record match")
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))