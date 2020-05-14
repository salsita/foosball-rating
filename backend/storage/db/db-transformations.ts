import { User } from '../../types/User'
import { MatchWithId } from '../../types/Match'
import { Game } from '../../types/Game'
import { Player } from '../../types/Player'
import { QueryResultRow } from 'pg'
import {
  isValidMatchRow,
  isValidPlayerRow,
  isValidGameRow,
  isValidUserRow,
} from '../../types/Database'

export const createUserFromDbRow = (userRow: QueryResultRow): User => {
  if (!isValidUserRow(userRow)) {
    throw new Error('Invalid row to transform to create User')
  }
  return new User(
    Number(userRow.Id),
    userRow.Name,
    Boolean(userRow.Active)
  )
}

export const createPlayerFromDbRow = (player: QueryResultRow): Player => {
  if (!isValidPlayerRow(player)) {
    throw new Error('Invalid row to transform to create Player')
  }
  return new Player(
    Number(player.Id),
    player.Name,
    Number(player.Rating),
    Boolean(player.Active),
    Number(player.InitialRating),
  )
}

export const createMatchFromDbRow = (matchRow: QueryResultRow): MatchWithId => {
  if (!isValidMatchRow(matchRow)) {
    throw new Error('Invalid row to transform to create Match')
  }
  const team1Player2Array = matchRow.Team1Player2Id ? [{
    id: Number(matchRow.Team1Player2Id),
    matchRating: Number(matchRow.Team1Player2Rating),
  }] : []

  const team2Player2Array = matchRow.Team2Player2Id ? [{
    id: Number(matchRow.Team2Player2Id),
    matchRating: Number(matchRow.Team2Player2Rating),
  }] : []

  return new MatchWithId(
    Number(matchRow.Id),
    [
      {
        id: Number(matchRow.Team1Player1Id),
        matchRating: Number(matchRow.Team1Player1Rating),
      },
      ...team1Player2Array,
    ],
    [
      {
        id: Number(matchRow.Team2Player1Id),
        matchRating: Number(matchRow.Team2Player1Rating),
      },
      ...team2Player2Array,
    ],
    matchRow.Team1Score > matchRow.Team2Score,
    matchRow.Date,
    Number(matchRow.WinningTeamRatingChange),
    Number(matchRow.LosingTeamRatingChange),
  )
}

export const createGameFromDbRow = (gameRow: QueryResultRow): Game => {
  if (!isValidGameRow(gameRow)) {
    throw new Error('Invalid row to transform to create Game')
  }
  return new Game(
    Number(gameRow.Id),
    gameRow.Name,
    gameRow.Description,
  )
}
