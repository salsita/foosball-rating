import { QueryResultRow } from 'pg'

export interface PlayerRow {
  Id: string;
  Name: string;
  Rating: string;
  Active: string;
  InitialRating: string;
}

export const isValidPlayerRow = (queryRow: QueryResultRow): queryRow is PlayerRow => {
  return queryRow.Id &&
         queryRow.Name &&
         queryRow.Rating &&
         queryRow.Active &&
         queryRow.InitialRating
}

export interface UserRow {
  Id: string;
  Name: string;
  Active: string;
}

export const isValidUserRow = (queryRow: QueryResultRow): queryRow is UserRow => {
  return queryRow.Id &&
         queryRow.Name &&
         queryRow.Active
}

export interface MatchRow {
  Id: string;
  Team1Player1Id: string;
  Team1Player1Rating: string;
  Team1Player2Id: string;
  Team1Player2Rating: string;
  Team2Player1Id: string;
  Team2Player1Rating: string;
  Team2Player2Id: string;
  Team2Player2Rating: string;
  Date: Date;
  WinningTeamRatingChange: string;
  LosingTeamRatingChange: string;
  Team1Won: string;
}

export const isValidMatchRow = (queryRow: QueryResultRow): queryRow is MatchRow => {
  return queryRow.Id &&
         queryRow.Team1Player1Id &&
         queryRow.Team1Player1Rating &&
         queryRow.Team1Player2Id &&
         queryRow.Team1Player2Rating &&
         queryRow.Team2Player1Id &&
         queryRow.Team2Player1Rating &&
         queryRow.Team2Player2Id &&
         queryRow.Team2Player2Rating &&
         queryRow.Date &&
         queryRow.WinningTeamRatingChange &&
         queryRow.LosingTeamRatingChange &&
         queryRow.Team1Won
}

export interface GameRow {
  Id: string;
  Name: string;
  Description: string;
}

export const isValidGameRow = (queryRow: QueryResultRow): queryRow is GameRow => {
  return queryRow.Id &&
         queryRow.Name &&
         queryRow.Description
}

export interface DBError extends Error {
  code: string;
}
