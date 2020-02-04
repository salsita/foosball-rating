import { Player, PlayerInMatches } from '../types/Player';
import { Match, MatchDescription } from '../types/Match';
import { IStorageContext } from '../storage/IStorageContext';

import { Storage } from '../storage/Storage';

const ratingCalculator = require('../rating/rating-calculator')
const { InputError } = require('../errors/InputError')
const { NotFoundError } = require('../errors/NotFoundError')

const ADD_MATCH_COOLDOWN = process.env.ADD_MATCH_COOLDOWN || 60

export class MatchRepository {
    constructor() {
    }

    private static updateRatingForTeam = async (team: PlayerInMatches[], difference: number, storageContext: IStorageContext) => {
        await Promise.all(team.map(player => {
            const newRating = player.rating + difference
            return storageContext.updateRatingForPlayer(player.id, newRating)
        }))
    }

    private static storeMatch = async (match: Match): Promise<Match> => {
        const winningTeam = match.team1Won ? match.team1 : match.team2
        const losingTeam = match.team1Won ? match.team2 : match.team1

        const storageContext = await Storage.makeStorageContext()

        let result
        try {
            result = await storageContext.insertMatch(match)

            await MatchRepository.updateRatingForTeam(winningTeam, match.winningTeamRatingChange, storageContext)
            await MatchRepository.updateRatingForTeam(losingTeam, match.losingTeamRatingChange, storageContext)

            await storageContext.commit()
        } catch (error) {
            await storageContext.rollback()
            throw error
        }

        return result
    }

    private static getFilledTeam = async (playedIds: number[]): Promise<Player[]> => {
        try {
            return await Promise.all(playedIds.map(Storage.getPlayer))
        } catch (error) {
            console.error(error)
            if (error instanceof NotFoundError) {
                throw new InputError(`Invalid players for the match (${error.message})`)
            }
            throw new Error('Unable to fetch players for match.')
        }
    }

    private static getRatingChanges = ({ team1, team2 }: { team1: Player[], team2: Player[] }, team1Won: boolean) => {
        const winningTeam = team1Won ? team1 : team2
        const losingTeam = team1Won ? team2 : team1

        return ratingCalculator.computeRatingChanges(winningTeam, losingTeam)
    }

    private static constructMatch = async (matchDescription: MatchDescription) => {
        const teams = {
            team1: await MatchRepository.getFilledTeam(matchDescription.team1),
            team2: await MatchRepository.getFilledTeam(matchDescription.team2),
        }
        const { winningTeamRatingChange, losingTeamRatingChange } = MatchRepository.getRatingChanges(teams, matchDescription.team1Won)
        const date = new Date()
        return new Match(teams.team1, teams.team2, matchDescription.team1Won, date, winningTeamRatingChange, losingTeamRatingChange)
    }

    private static getElapsedSecondsSinceLatestMatch = async () => {
        const latestMatch = await Storage.getLatestMatch()
        if (latestMatch == null) {
            return null
        }

        const currentTime = Date.now()
        return Math.round((currentTime - latestMatch.date.getTime()) / 1000)
    }

    /**
     * @param matchDescription Description of the match to record.
     * @param {Array<number>} matchDescription.team1 Array of 1 or 2 elements containing IDs of players from team1.
     * @param {Array<number>} matchDescription.team2 Array of 1 or 2 elements containing IDs of players from team2.
     * @param {boolean} matchDescription.team1Won True if team1 won, false if team2 won.
     */
    public static recordMatch = async (matchDescription: MatchDescription) => {
        const elapsedTime = await MatchRepository.getElapsedSecondsSinceLatestMatch()
        if (elapsedTime != null && elapsedTime < ADD_MATCH_COOLDOWN) {
            throw new InputError(`Can't add match ${elapsedTime} seconds after the last one. Minimum time is ${ADD_MATCH_COOLDOWN}.`)
        }

        const match = await MatchRepository.constructMatch(matchDescription)
        await MatchRepository.storeMatch(match)

        return match
    }
}
