const parseMatchResultPrefixSuffixConfig = require('./parseMatchResultPrefixSuffixConfig')

class MatchReporter {
  constructor(matchResultPrefixSuffixConfig) {
    try {
      this.prefixSuffixConfig = parseMatchResultPrefixSuffixConfig(matchResultPrefixSuffixConfig)
    } catch (e) {
      console.log(`Parsing matchResultPrefixSuffixConfig failed: ${e.message}`)
    }
  }

  async reportMatchOnSlack(bot, match, oldUsers, newUsers) {
    const matchResultMessage = createMatchResultMessage(match, this.prefixSuffixConfig)

    const oldRankings = oldUsers.sort(ratingComparator)
    const newRankings = newUsers.sort(ratingComparator)

    const rankingChangeMessage = createRankingChangeMessage(oldRankings, newRankings)
    await bot.postMessage(`${matchResultMessage}\n${rankingChangeMessage}`)
    const leaderboardSize = 5
    const shouldUpdatePurpose = hasLeaderboardChanged(leaderboardSize, oldRankings, newRankings)
    if (shouldUpdatePurpose) {
      const purposeMessage = await createPurposeMessage(newRankings.slice(0, leaderboardSize))
      await bot.setGroupPurpose(purposeMessage)
    }
  }
}

const ratingComparator = (a, b) => b.rating - a.rating

const createMatchResultMessage = (match, prefixSuffixConfig) => {
  const { team1, team2, team1Won, winningTeamRatingChange, losingTeamRatingChange } = match
  let winningTeam, losingTeam
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2]
  } else {
    [winningTeam, losingTeam] = [team2, team1]
  }
  const winningPlayers = winningTeam.map(player => `${player.name} (${player.rating})`)
  const losingPlayers = losingTeam.map(player => `${player.name} (${player.rating})`)

  const messageParts = []

  const { prefix, suffix } = prefixSuffixConfig && winningTeam.length === 2
    ? getMatchResultPrefixSuffix(prefixSuffixConfig, winningTeam)
    : {}

  if (prefix) {
    messageParts.push(prefix)
  }

  if (winningTeam.length === losingTeam.length) {
    if (winningTeamRatingChange <= 10) {
      messageParts.push('Easy.')
    } else if (winningTeamRatingChange >= 20) {
      messageParts.push(`HOLY SHIT! L2P, ${losingTeam.length > 1 ? 'noobs' : 'noob'}!`)
    }
  }

  messageParts.push(`${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}.`)
  messageParts.push(`Each winner gets ${winningTeamRatingChange} points, each loser loses ${-losingTeamRatingChange} points.`)

  if (suffix) {
    messageParts.push(suffix)
  }

  return messageParts.join(' ')
}

const getMatchResultPrefixSuffix = (prefixSuffixConfig, winningTeam) => {
  for (config of prefixSuffixConfig) {
    if (winningTeam.every(player => player.name === config.player1 || player.name === config.player2)) {
      return config
    }
  }
  return {}
}

const createRankingChangeMessage = (oldRankings, newRankings) => {
  const rankingChanges = oldRankings
    .map((oldPlayer, index) => ({
      name: oldPlayer.name,
      oldRanking: index + 1,
      newRanking: newRankings.findIndex(p => p.id === oldPlayer.id) + 1
    }))
    .filter(ranking => ranking.oldRanking != ranking.newRanking)

  if (rankingChanges.length === 0) {
    return
  }

  const messageText = rankingChanges
    .map((c) => (
      `${c.name} ${c.oldRanking}. ⟶ ${c.newRanking}.`)
    )
    .join('\n')
  return messageText
}

const hasLeaderboardChanged = (leaderboardSize, oldRankings, newRankings) => (
  oldRankings.findIndex((oldPlayer, index) => oldPlayer.id !== newRankings[index].id) < leaderboardSize
)

const createPurposeMessage = async (rankings) => {
  const rankingsText = rankings
    .map((ranking, i) => `${i + 1}. ${ranking.name} (${ranking.rating})`)
    .join('\n')
  const purpose = 'TOP PLAYERS\n' + rankingsText
  return purpose
}


module.exports = MatchReporter
