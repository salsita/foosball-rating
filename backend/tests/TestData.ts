import { MatchWithId, Match } from '../types/Match'
import { Player } from '../types/Player'
import { MatchDescription } from '../types/MatchDescription'
import * as moment from 'moment'
import { UserRow, MatchRow } from '../types/Database'

const NOW_MOMENT = moment('2020-03-25 10:00:00')
export const NOW = NOW_MOMENT.toDate()
export const ONE_MINUTE_AFTER = moment(NOW_MOMENT).add(1, 'minute').toDate()
export const HALF_MINUTE_AFTER = moment(NOW_MOMENT).add(30, 'seconds').toDate()

export const FOOSBALL_DATA = {
  name: 'foosball',
  description: 'what a game',
}

export const FOOSBALL_ROW = {
  Id: '1',
  Name: FOOSBALL_DATA.name,
  Description: FOOSBALL_DATA.description,
}

export const FOOSBALL_GAME = {
  id: 1,
  ...FOOSBALL_DATA,
}

export const FOOSBALL_MATCH_ROW: MatchRow = {
  Id: '2',
  Team1Player1Id: 1,
  Team1Player1Rating: 1001,
  Team1Player2Id: 2,
  Team1Player2Rating: 1002,
  Team2Player1Id: 3,
  Team2Player1Rating: 1003,
  Team2Player2Id: 4,
  Team2Player2Rating: 1004,
  Date: NOW,
  WinningTeamRatingChange: 16,
  LosingTeamRatingChange: -16,
  Team1Score: 1,
  Team2Score: 0,
  GameId: 1,
}

export const FOOSBALL_MATCH_DESCRIPTION: MatchDescription = {
  team1: [ 1 ],
  team2: [ 3, 4 ],
  team1Score: 1,
  team2Score: 0,
}

export const FOOSBALL_MATCH_WITH_ID = new MatchWithId(
  2,
  [ { id: 1, matchRating: 1001 }, { id: 2, matchRating: 1002 }],
  [ { id: 3, matchRating: 1003 }, { id: 4, matchRating: 1004 }],
  true,
  NOW,
  16,
  -16,
)

export const TONDA_PLAYER_ROW = {
  Id: '3',
  Name: 'Tonda',
  Rating: '1200',
  Active: 'true',
  InitialRating: '1000',
}

export const TONDA_PLAYER: Player = {
  id: 3,
  name: 'Tonda',
  rating: 1200,
  active: true,
  initialRating: 1000,
}

export const RADEK_PLAYER_ROW = {
  Id: '4',
  Name: 'Radek',
  Rating: '1001',
  Active: 'true',
  InitialRating: '1300',
}

export const RADEK_PLAYER: Player = {
  id: 4,
  name: 'Radek',
  rating: 1001,
  active: true,
  initialRating: 1300,
}

export const PETR_PLAYER_ROW = {
  Id: '4',
  Name: 'Petr',
  Rating: '1001',
  Active: 'true',
  InitialRating: '1300',
}

export const PETR_PLAYER: Player = {
  id: 5,
  name: 'Petr',
  rating: 999,
  active: true,
  initialRating: 1200,
}

export const FOOSBALL_MATCH = new Match(
  [ TONDA_PLAYER ],
  [ RADEK_PLAYER, PETR_PLAYER],
  { team1Score: 1, team2Score: 0 },
  FOOSBALL_MATCH_ROW.Date,
  16,
  -16,
  1,
)

export const TONDA_USER_ROW: UserRow = {
  Id: 4,
  Name: 'Tonda',
  Active: true,
}

export const TONDA_USER = {
  id: 4,
  name: 'Tonda',
  active: true,
}

export const ERROR = 'error'
