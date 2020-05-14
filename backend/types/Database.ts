import { QueryResultRow } from 'pg'

export interface PlayerRow {
  Id: string;
  Name: string;
  Rating: number;
  Active: boolean;
  InitialRating: number;
}

export const isValidPlayerRow = (queryRow: QueryResultRow): queryRow is PlayerRow => {
  return queryRow.Id &&
         queryRow.Name &&
         queryRow.Rating !== undefined &&
         queryRow.Active !== undefined &&
         queryRow.InitialRating !== undefined
}

export interface UserRow {
  Id: number;
  Name: string;
  Active: boolean;
}

export const isValidUserRow = (queryRow: QueryResultRow): queryRow is UserRow => {
  return queryRow.Id !== undefined &&
         queryRow.Name &&
         queryRow.Active !== undefined
}

export interface MatchRow {
  Id: string;
  Team1Player1Id: number;
  Team1Player1Rating: number;
  Team1Player2Id: number | null;
  Team1Player2Rating: number | null;
  Team2Player1Id: number;
  Team2Player1Rating: number;
  Team2Player2Id: number | null;
  Team2Player2Rating: number | null;
  Date: Date;
  WinningTeamRatingChange: number;
  LosingTeamRatingChange: number;
  GameId: number;
  Team1Score: number;
  Team2Score: number;
}

export const isValidMatchRow = (queryRow: QueryResultRow): queryRow is MatchRow => {
  return queryRow.Id &&
         queryRow.Team1Player1Id !== undefined &&
         queryRow.Team1Player1Rating !== undefined &&
         queryRow.Team1Player2Id !== undefined &&
         queryRow.Team1Player2Rating !== undefined &&
         queryRow.Team2Player1Id !== undefined &&
         queryRow.Team2Player1Rating !== undefined &&
         queryRow.Team2Player2Id !== undefined &&
         queryRow.Team2Player2Rating !== undefined &&
         queryRow.Date &&
         queryRow.WinningTeamRatingChange !== undefined &&
         queryRow.LosingTeamRatingChange !== undefined &&
         queryRow.Team1Score !== undefined &&
         queryRow.Team2Score !== undefined
}

export interface GameRow {
  Id: number;
  Name: string;
  Description: string;
}

export const isValidGameRow = (queryRow: QueryResultRow): queryRow is GameRow => {
  return queryRow.Id !== undefined &&
         queryRow.Name &&
         queryRow.Description
}

export interface DBError extends Error {
  code: string;
}
