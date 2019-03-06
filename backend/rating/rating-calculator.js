const average = (array) => {
	const sum = array.reduce((a, b) => a + b)
	return sum / array.length
}

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
