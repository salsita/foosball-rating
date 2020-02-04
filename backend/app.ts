import { HttpError } from './errors/HttpError';

require('dotenv').config();

import { NextFunction, Request, Response, } from 'express';
import bodyParser = require('body-parser');
import express = require('express');

import { PlayerRepository } from './repositories/PlayerRepository';
import { MatchRepository } from './repositories/MatchRepository';
import { Storage } from './storage/Storage';
import { makeBot } from './bot/bot-factory';
import { MatchReporter } from './match-reporter/match-reporter';

const port = process.env.SERVER_PORT || '3000';
const app = express();

const addCrossDomainHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(addCrossDomainHeaders);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const processError = (response: Response, error: HttpError) => {
  console.error(error);
  response.statusCode = error.httpStatusCode || 500;
  response.send(error.message);
};

let matchReporter: any;
makeBot(process.env.FOOSBOT_TOKEN || '', process.env.FOOS_CHANNEL_NAME || '')
  .then((bot: any) => {
    matchReporter = new MatchReporter(bot, process.env.MATCH_REPORT_PREFIX_SUFFIX_CONFIG || '');
    console.log('Slackbot initialized!');
  })
  .catch((error) => console.warn('Slackbot initialization failed:', error.message));

app.get('/users', (req, res) => {
  Storage.getAllPlayers()
    .then(res.send.bind(res))
    .catch((error) => processError(res, error));
});

app.get('/matches', (req, res) => {
  Storage.getAllMatches()
    .then(res.send.bind(res))
    .catch((error) => processError(res, error));

});

app.post('/users', (req, res) => {
  PlayerRepository.addPlayer(req.body)
    .then(res.send.bind(res))
    .catch((error) => processError(res, error));

});

app.post('/matches', async (req, res) => {
  try {
    const oldUsers = await Storage.getAllPlayers();
    const match = await MatchRepository.recordMatch(req.body);
    const newUsers = await Storage.getAllPlayers();
    if (matchReporter) {
      await matchReporter.reportMatchOnSlack(match, oldUsers, newUsers);
    } else {
      console.warn('Could not report match, match reporter is not initialized');
    }
    res.send();
  } catch (error) {
    processError(res, error);
  }
});

app.listen(port, () => console.log(`Foosball backend running on ${port}!`));
