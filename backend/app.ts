import * as express from 'express'
import { NextFunction, Response, Request } from 'express'
import * as bodyParser from 'body-parser'

import * as storage from './storage/Storage'
import * as matchRepository from './repositories/MatchRepository'
import * as userRepository from './repositories/UserRepository'
import { addGame } from './repositories/GameRepository'

import { makeBot, SingleChannelBot } from './bot/bot-factory'

import { MatchReporter } from './match-reporter/MatchReporter'
import { InputError } from './errors/InputError'

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)

let matchReporter: MatchReporter
makeBot(process.env.FOOSBOT_TOKEN, process.env.FOOS_CHANNEL_NAME)
  .then((bot: SingleChannelBot) => {
    matchReporter = new MatchReporter(bot, process.env.MATCH_REPORT_PREFIX_SUFFIX_CONFIG)
    console.log('Slackbot initialized!')
  })
  .catch(error => console.warn('Slackbot initialization failed:', error.message))

const processError = (response: Response, error: InputError): void => {
  console.error(error)
  response.statusCode = error.httpStatusCode || 500
  response.send(error.message)
}

app.get('/games/:name/players', (req, res) => {
  storage.getPlayersByGame(req.params.name)
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

app.get('/games/:name', async (req: Request, res: Response) => {
  try {
    const game = await storage.getGameByName(req.params.name)
    res.send(game)
  } catch (error) {
    processError(res, error)
  }
})

app.get('/games/:name/matches', async (req: Request, res: Response) => {
  try {
    const matches = await storage.getMatchesByGameName(req.params.name)
    res.send(matches)
  } catch (error) {
    processError(res, error)
  }
})

app.post('/games/:name/players', async (req: Request, res: Response) => {
  try {
    await userRepository.addUserToGame(req.params.name, req.body)
    res.send()
  } catch (error) {
    processError(res, error)
  }
})

app.post('/games/:name/matches', async (req: Request, res: Response) => {
  try {
    const gameName = req.params.name
    const oldUsers = await storage.getPlayersByGame(gameName)
    const match = await matchRepository.recordMatch(gameName, req.body)
    const newUsers = await storage.getPlayersByGame(gameName)
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
