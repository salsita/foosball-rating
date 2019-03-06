const dbExecutor = require('./db/db-executor.js')
const dbTransformations = require('./db/db-transformations.js')
const dbQueries = require('./db-queries.js')

exports.getAllUsers = async () => dbExecutor.executeMultiResultQuery(dbQueries.selectAllUsers, [], dbTransformations.makeUserFromDbType)

exports.getUser = async (userId) => {
    const query = dbQueries.selectUser
    const values = [userId]

    dbExecutor.executeSingleResultQuery(query, values, dbTransformations.makeUserFromDbType)
}

exports.updateCurrentRatingForUser = async (userId, newRating) => {
    const query = dbQueries.updateCurrentRatingForUser
    const values = [newRating, userId]

    dbExecutor.executeSingleResultQuery(query, values, dbTransformations.makeUserFromDbType)
}

// Returns the newly added user
exports.addUser = async (user) => {
    const query = dbQueries.insertUser
    const values = [user.name, user.initialRating, true, user.initialRating]

    dbExecutor.executeSingleResultQuery(query, values, dbTransformations.makeUserFromDbType)
}

exports.addMatchRecord = async (matchRecord) => {
    console.log(matchRecord)
    // Ugggghhh, ugly
    const query = dbQueries.insertMatchRecord
    const values = [matchRecord.team1.player1.id, matchRecord.team1.player1.currentRating, matchRecord.team1.player2.id, matchRecord.team1.player2.currentRating,
                    matchRecord.team2.player1.id, matchRecord.team2.player1.currentRating, matchRecord.team2.player2.id, matchRecord.team2.player2.currentRating,
                    matchRecord.date, matchRecord.team1Won]
    
    dbExecutor.executeSingleResultQuery(query, values, dbTransformations.makeMatchRecordFromDbType)
}

exports.getAllMatchRecords = async () => dbExecutor.executeMultiResultQuery(dbQueries.selectAllMatchRecords, [], dbTransformations.makeMatchRecordFromDbType)