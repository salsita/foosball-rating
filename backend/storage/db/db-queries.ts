import { oneLine } from 'common-tags'

export const selectUser = 'SELECT * FROM "Users" WHERE "Id" = $1'

export const updateRatingForPlayer = oneLine`
  UPDATE "Players"
  SET "Rating" = $1
  WHERE "Id" = $2
  RETURNING *
`

export const insertUser = 'INSERT INTO "Users"("Name", "Active") VALUES($1, $2) RETURNING *'

export const selectUserByName = 'SELECT * FROM "Users" WHERE "Name" = $1'

export const insertMatch = oneLine`
  INSERT INTO "Matches"(
    "Team1Player1Id", "Team1Player1Rating", "Team1Player2Id", "Team1Player2Rating",
    "Team2Player1Id", "Team2Player1Rating", "Team2Player2Id", "Team2Player2Rating",
    "Date", "WinningTeamRatingChange", "LosingTeamRatingChange", "GameId",
    "Team1Score", "Team2Score"
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
`

export const selectAllMatches = 'SELECT * FROM "Matches"'

export const selectMatchesByGameId = 'SELECT * FROM "Matches" WHERE "GameId" = $1'

export const selectLatestMatchByGameId = oneLine`
  SELECT *
  FROM "Matches"
  WHERE "GameId" = $1
  ORDER BY "Date" DESC
  LIMIT 1
`

export const selectAllusers = 'SELECT * FROM "Users"'

export const insertGame = 'INSERT INTO "Games"("Name", "Description") VALUES($1, $2) RETURNING *'

export const selectAllGames = 'SELECT * FROM "Games"'

export const selectGameByName = 'SELECT * FROM "Games" WHERE "Name" = $1'

export const selectPlayersByGameIdJoinUsers = oneLine`
  SELECT p."Id", "Name", "Rating", "Active", "InitialRating","GameId"
  FROM "Players" p, "Users" u
  WHERE p."GameId"=$1 AND p."UserId" = u."Id";
`

export const selectPlayerByIdJoinUser = oneLine`
  SELECT p."Id", "Name", "Rating", "Active", "InitialRating", "GameId"
  FROM "Players" p, "Users" u
  WHERE p."Id" = $1 AND p."UserId" = u."Id";
`

export const insertPlayer = oneLine`
  INSERT INTO "Players"("UserId","Rating","InitialRating","GameId")
  VALUES($1, $2, $3, $4);
`
