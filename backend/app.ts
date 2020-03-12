import * as express from 'express'
import { Response, Request } from 'express'
import * as bodyParser from 'body-parser'

import * as storage from './storage/Storage'
import * as matchRepository from './repositories/MatchRepository'
import * as userRepository from './repositories/UserRepository'
import { addGame } from './repositories/GameRepository'

import { makeBot, SingleChannelBot } from './bot/bot-factory'

import { MatchReporter } from './match-reporter/MatchReporter'

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req, res, next): void {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)

let matchReporter
makeBot(process.env.FOOSBOT_TOKEN, process.env.FOOS_CHANNEL_NAME)
  .then((bot: SingleChannelBot) => {
    matchReporter = new MatchReporter(bot, process.env.MATCH_REPORT_PREFIX_SUFFIX_CONFIG)
    console.log('Slackbot initialized!')
  })
  .catch(error => console.warn('Slackbot initialization failed:', error.message))

const processError = (response, error): void => {
  console.error(error)
  response.statusCode = error.httpStatusCode || 500
  response.send(error.message)
}

app.get('/users', (req, res) => {
  storage.getAllUsers()
    .then(res.send.bind(res))
    .catch(error => processError(res, error))
})

app.get('/matches', (req, res) => {
  storage.getAllMatches()
    .then(res.send.bind(res))
    .catch(error => processError(res, error))

})

app.get('/games', (req: Request, res: Response) => {
  storage.getAllGames()
    .then(res.send.bind(res))
    .catch(error => processError(res, error))
})

app.post('/users', (req, res) => {
  userRepository.addUser(req.body)
    .then(res.send.bind(res))
    .catch(error => processError(res, error))

})

app.post('/matches', async (req, res) => {
  try {
    const oldUsers = await storage.getAllUsers()
    const match = await matchRepository.recordMatch(req.body)
    const newUsers = await storage.getAllUsers()
    if (matchReporter) {
      await matchReporter.reportMatchOnSlack(match, oldUsers, newUsers)
    } else {
      console.warn('Could not report match, match reporter is not initialized')
    }
    res.send()
  } catch (error) {
    processError(res, error)
  }
})

app.post('/games', (req: Request, res: Response) => {
  addGame(req.body)
    .then(res.send.bind(res))
    .catch(error => processError(res, error))
})

app.listen(port, () => console.log(`Foosball backend running on ${port}!`))
