import { Player } from '../types/Player';
import { MatchRatingChanges } from '../types/Match';

const average = (array: number[]) => {
	const sum = array.reduce((a, b) => a + b)
	return sum / array.length
}

/**
  * @typedef {Object} User
  *	@property {number} id The ID of the user.
  * @property {string} name The unique name of the user.
  * @property {number} rating Current rating of the user.
  * @property {number} initialRating Initial rating of the user.
  * @property {boolean} active True if the user is active and visible.
 *
 * @typedef {Object} RatingChanges
 * @property {number} winningTeamRatingChange The rating change of the winning team.
 * @property {number} losingTeamRatingChange The rating change of the losing team.
  *
  * @param {Array<Player>} winningTeam Array of at least one element containing players of the winning team.
  * @param {Array<Player>} losingTeam Array of at least one element containing players of the losing team.
  *
  * @returns {MatchRatingChanges} The rating changes of the teams.
  */
export const computeRatingChanges = (winningTeam: Player[], losingTeam: Player[]): MatchRatingChanges => {
	const winningAvg = average(winningTeam.map(player => player.rating))
	const losingAvg = average(losingTeam.map(player => player.rating))

	const x = 10 ** (Math.abs(winningAvg - losingAvg) / 400)

	const pa = 1 / (1 + x)
	const k = 32 // magic ;)
	const differenceStrongerWon =  Math.round(k * pa)
	const differenceWeakerWon = Math.round(k * (1 - pa))

	const strongerWon = winningAvg > losingAvg
	const standardRatingChange = strongerWon ? differenceStrongerWon : differenceWeakerWon

	let winningTeamRatingChange = standardRatingChange
	let losingTeamRatingChange = -standardRatingChange

	// correcting for an uneven number of players on each side
	if (winningTeam.length === 1 && losingTeam.length === 2) {
		winningTeamRatingChange *= 2
	} else if (winningTeam.length === 2 && losingTeam.length === 1) {
		const splitRatingChange = standardRatingChange / 2
		const actualRatingChange = Math.round(splitRatingChange)
		winningTeamRatingChange = actualRatingChange
		if (actualRatingChange !== splitRatingChange) {
			losingTeamRatingChange -= 1
		}
	}

	return ({
		winningTeamRatingChange,
		losingTeamRatingChange,
	})
}
