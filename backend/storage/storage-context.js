const dbTransformations = require('./db/db-transformations')
const dbQueries = require('./db/db-queries')
const dbErrors = require('./db/db-errors')
const { ConflictError } = require('../errors/conflict-error')
const { InputError } = require('../errors/input-error')
const { NotFoundError } = require('../errors/not-found-error')

class StorageContext {
    constructor(transaction) {
        this.transaction = transaction
    }

    async getAllUsers() {
        let rows
        try {
            rows = await this.transaction.executeQuery(dbQueries.selectAllusers, [])
        } catch (error) {
            console.error(error)
            throw new Error("Unable to retrieve users")
        }
    
        return rows.map(dbTransformations.createUserFromDbRow)
    }
    
    async getUser(userId) {
        const query = dbQueries.selectUser
        const values = [userId]
    
        let row
        try {
            row = await this.transaction.executeSingleResultQuery(query, values)
        } catch (error) {
            console.error(error)
            throw new Error("Unable to fetch user")
        }
    
        if (!row) {
            throw new NotFoundError(`User ${userId} doesn't exist`)
        }
    
        return dbTransformations.createUserFromDbRow(row)
    }
    
    async updateRatingForUser(userId, newRating) {
        const query = dbQueries.updateRatingForUser
        const values = [newRating, userId]
    
        let row
        try {
            row = await this.transaction.executeSingleResultQuery(query, values)
        } catch (error) {
            console.error(error)
            throw new Error("Unable to update rating for user")
        }

        if (!row) {
            throw new NotFoundError(`User ${userId} doesn't exist`)
        }
    
        return dbTransformations.createUserFromDbRow(row)
    }
    
    async insertUser(user) {
        const query = dbQueries.insertUser
        const values = [user.name, user.initialRating, true, user.initialRating]
    
        let row
        try {
            row = await this.transaction.executeSingleResultQuery(query, values)
        } catch (error) {
            console.error(error)
            if (dbErrors.isUniqueViolation(error)) {
                throw new ConflictError(`User ${user.name} already exists`)
            }
            throw new Error("Unable to add user")
        }
    
        return dbTransformations.createUserFromDbRow(row)
    }
    
    async insertMatch(match) {
        const isTeamSizeSupported = (team) => team.length >= 1 && team.length <= 2
        if (!isTeamSizeSupported(match.team1) || !isTeamSizeSupported(match.team2)) {
            throw new InputError("Inserting teams with unsupported number of players")
        }
    
        const team1Player1 = match.team1[0]
        const team1Player2 = match.team1[1] || { }
        const team2Player1 = match.team2[0]
        const team2Player2 = match.team2[1] || { }
    
        const query = dbQueries.insertMatch
        const values = [team1Player1.id, team1Player1.rating, team1Player2.id, team1Player2.rating,
                        team2Player1.id, team2Player1.rating, team2Player2.id, team2Player2.rating,
                        match.date, match.ratingChange, match.team1Won]
        
        let row
        try {
            row = await this.transaction.executeSingleResultQuery(query, values)
        } catch (error) {
            console.error(error)
            throw new Error("Unable to create match")
        }
    
        return dbTransformations.createMatchFromDbRow(row)
    }
    
    async getAllMatches() {
        let rows
        try {
            rows = await this.transaction.executeQuery(dbQueries.selectAllMatches, [])
        } catch (error) {
            console.error(error)
            throw new Error("Unable to retrieve matches")
        }
    
        return rows.map(dbTransformations.createMatchFromDbRow)
    }

    async commit() {
        try {
            await this.transaction.commit()
        } catch (error) {
            console.error(error)
            throw new Error("Unable to commit transaction")
        }
    }

    async rollback() {
        await this.transaction.rollback()
    }
}

exports.StorageContext = StorageContext
