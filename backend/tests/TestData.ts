import { MatchWithId } from '../types/Match'
import { Player } from '../types/Player'

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

export const FOOSBALL_MATCH_ROW = {
  Id: '2',
  Team1Player1Id: '1',
  Team1Player1Rating: '1001',
  Team1Player2Id: '2',
  Team1Player2Rating: '1002',
  Team2Player1Id: '3',
  Team2Player1Rating: '1003',
  Team2Player2Id: '4',
  Team2Player2Rating: '1004',
  Date: new Date('2019-09-02 10:29:50.486'),
  WinningTeamRatingChange: '16',
  LosingTeamRatingChange: '-16',
  Team1Won: 'true',
  GameId: '1',
}

export const FOOSBALL_MATCH: MatchWithId = {
  id: 2,
  team1:[ { id: 1, matchRating: 1001 }, { id: 2, matchRating: 1002 }],
  team2:[ { id: 3, matchRating: 1003 }, { id: 4, matchRating: 1004 }],
  team1Won: true,
  date: FOOSBALL_MATCH_ROW.Date,
  winningTeamRatingChange: 16,
  losingTeamRatingChange: -16,
}

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

export const TONDA_USER_ROW = {
  Id: '4',
  Name: 'Tonda',
  Active: 'true',
}

export const TONDA_USER = {
  id: 4,
  name: 'Tonda',
  active: true,
}
