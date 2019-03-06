const dbExecutor = require('./db/db-executor')
const dbTransformations = require('./db/db-transformations')
const dbQueries = require('./db/db-queries')

exports.getAllUsers = async () =>{
    const rows = await dbExecutor.executeQuery(dbQueries.selectAllusers, [])
    return rows.map(dbTransformations.createUserFromDbRow)
}

exports.getUser = async (userId) => {
    const query = dbQueries.selectUser
    const values = [userId]

    const row = await dbExecutor.executeSingleResultQuery(query, values)
    return dbTransformations.createUserFromDbRow(row)
}

exports.updateRatingForUser = async (userId, newRating) => {
    const query = dbQueries.updateRatingForUser
    const values = [newRating, userId]

    console.log(userId)
    console.log(newRating)

    const row = await dbExecutor.executeSingleResultQuery(query, values)
    return dbTransformations.createUserFromDbRow(row)
}

exports.addUser = async (user) => {
    const query = dbQueries.insertUser
    const values = [user.name, user.initialRating, true, user.initialRating]

    const row = await dbExecutor.executeSingleResultQuery(query, values)
    return dbTransformations.createUserFromDbRow(row)
}

exports.insertMatch = async (match) => {
    const isTeamSupported = (team) => team.length >= 1 && team.length <= 2
    if (!isTeamSupported(match.team1) || !isTeamSupported(match.team2)) {
        throw new Error("Inserting teams with unsupported number of players")
    }

    const team1Player1 = match.team1[0]
    const team1Player2 = match.team1[1] || { }
    const team2Player1 = match.team2[0]
    const team2Player2 = match.team2[1] || { }

    console.log(match)

    const query = dbQueries.insertMatch
    const values = [team1Player1.id, team1Player1.rating, team1Player2.id, team1Player2.rating,
                    team2Player1.id, team2Player1.rating, team2Player2.id, team2Player2.rating,
                    match.date, match.team1Won]
    
    const row = await dbExecutor.executeSingleResultQuery(query, values)
    return dbTransformations.createMatchFromDbRow(row)
}

exports.getAllMatches = async () => {
    const rows = await dbExecutor.executeQuery(dbQueries.selectAllMatches, [])
    return rows.map(dbTransformations.createMatchFromDbRow)
}
