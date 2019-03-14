const dbTransactions = require('./db/db-transactions')
const { StorageContext } = require('./storage-context')

exports.makeStorageContext = async () => {
    const transaction = await dbTransactions.beginTransaction()
    return new StorageContext(transaction)
}

const executeAndCommit = async (operation) => {
    const context = await exports.makeStorageContext()
    try {
        const result = await operation(context)
        await context.commit()
        return result
    } catch (error) {
        await context.rollback()
        throw error
    }
}

exports.getAllUsers = async () => executeAndCommit((context) => context.getAllUsers())

exports.getUser = async (userId) => executeAndCommit((context) => context.getUser(userId))

exports.updateRatingForUser = async (userId, newRating) => 
    executeAndCommit((context) => context.updateRatingForUser(userId, newRating))

exports.insertUser = async (user) => executeAndCommit((context) => context.insertUser(user))

exports.insertMatch = async (match) => executeAndCommit((context) => context.insertMatch(match))

exports.getAllMatches = async () => executeAndCommit((context) => context.getAllMatches())
