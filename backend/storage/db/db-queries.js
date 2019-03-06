exports.selectUser = 'SELECT * FROM "Users" WHERE "UserID" = $1'

exports.updateCurrentRatingForUser = 'UPDATE "Users" SET "CurrentRating" = $1 WHERE "UserID" = $2'

exports.insertUser = 'INSERT INTO "Users"("Name", "CurrentRating", "Active", "InitialRating") VALUES($1, $2, $3, $4) RETURNING *'

exports.insertMatchRecord = 'INSERT INTO "MatchRecords"("Team1Player1ID", "Team1Player1Rating", "Team1Player2ID", "Team1Player2Rating",' +
                      '"Team2Player1ID", "Team2Player1Rating", "Team2Player2ID", "Team2Player2Rating",' +
                      '"Date", "Team1Won") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'

exports.selectAllMatchRecords = 'SELECT * FROM "MatchRecords"'

exports.selectAllusers = 'SELECT * FROM "Users"'