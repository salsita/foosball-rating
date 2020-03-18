export const selectUser = 'SELECT * FROM "Users" WHERE "Id" = $1'

export const updateRatingForUser = 'UPDATE "Users" SET "Rating" = $1 WHERE "Id" = $2 RETURNING *'

export const insertUser = 'INSERT INTO "Users"("Name", "Rating", "Active", "InitialRating") VALUES($1, $2, $3, $4) RETURNING *'

export const insertMatch = 'INSERT INTO "Matches"("Team1Player1Id", "Team1Player1Rating", "Team1Player2Id", "Team1Player2Rating", \
                       "Team2Player1Id", "Team2Player1Rating", "Team2Player2Id", "Team2Player2Rating", \
                       "Date", "WinningTeamRatingChange", "LosingTeamRatingChange", "Team1Won", "GameId") \
                       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, \'1\') RETURNING *'

export const selectAllMatches = 'SELECT * FROM "Matches"'

export const selectLatestMatch = 'SELECT * FROM "Matches" ORDER BY "Date" DESC LIMIT 1'

export const selectAllusers = 'SELECT * FROM "Users"'
