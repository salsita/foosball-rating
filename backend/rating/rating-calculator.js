const average = (array) => {
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
  * @param {Array<User>} winningTeam Array of at least one element containing players of the winning team.
  * @param {Array<User>} losingTeam Array of at least one element containing players of the losing team.
  * 
  * @returns {number} The rating difference that the winning team should gain and losing team lose.
  */
exports.computeRatingChange = (winningTeam, losingTeam) => {
	const winningAvg = average(winningTeam.map(player => player.rating))
	const losingAvg = average(losingTeam.map(player => player.rating))

	const x = 10 ** (Math.abs(winningAvg - losingAvg) / 400)

	const pa = 1 / (1 + x)
	const k = 32 // magic ;)
	const differenceStrongerWon =  Math.round(k * pa)
	const differenceWeakerWon = Math.round(k * (1 - pa))

	const strongerWon = winningAvg > losingAvg

	return strongerWon ? differenceStrongerWon : differenceWeakerWon
}
