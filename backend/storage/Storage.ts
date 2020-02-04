import { IStorageContext } from './IStorageContext';
import { PlayerToCreate } from '../types/Player';
import { Match } from '../types/Match';

const dbTransactions = require('./db/db-transactions')
const { StorageContext } = require('./StorageContext')

export class Storage {
    private constructor() {}

    static makeStorageContext = async () => {
        const transaction = await dbTransactions.beginTransaction()
        return new StorageContext(transaction)
    }

    private static executeAndCommit = async <TResult>(operation: (context: IStorageContext) => Promise<TResult>): Promise<TResult> => {
        const context: IStorageContext = await Storage.makeStorageContext()
        try {
            const result = await operation(context)
            await context.commit()
            return result
        } catch (error) {
            await context.rollback()
            throw error
        }
    }

    static getAllPlayers = async () => Storage.executeAndCommit((context) => context.getAllPlayers())
    static getPlayer = async (playerId: number) => Storage.executeAndCommit((context) => context.getPlayer(playerId))
    static updateRatingForPlayer = async (playerId: number, newRating: number) => Storage.executeAndCommit((context) => context.updateRatingForPlayer(playerId, newRating))
    static insertPlayer = async (player: PlayerToCreate) => Storage.executeAndCommit((context) => context.insertPlayer(player))
    static insertMatch = async (match: Match) => Storage.executeAndCommit((context) => context.insertMatch(match))
    static getAllMatches = async () => Storage.executeAndCommit((context) => context.getAllMatches())
    static getLatestMatch = async () => Storage.executeAndCommit((context) => context.getLatestMatch())
}
