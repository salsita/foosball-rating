const botFactory = require('./bot-factory');

const DEFAULT_LEADERBOARD_SIZE = 5;

class MatchReporter {
  constructor(botToken, channelName, matchReportPrefixSuffixConfig, leaderboardSize = DEFAULT_LEADERBOARD_SIZE) {
    this.leaderboardSize = leaderboardSize

    try {
      this.decorations = parseMatchReportDecorations(matchReportPrefixSuffixConfig)
    } catch (e) {
      console.warn(`Parsing matchReportPrefixSuffixConfig failed: ${e.message}`)
    }

    botFactory.makeBot(botToken, channelName)
      .then(bot => {
        this.bot = bot
        console.log('Slackbot initialized!')
      })
      .catch((error) => console.warn('Bot initialization failed:', error.message))
  }

  isInitialized() {
    return !!this.bot
  }

  async reportMatchOnSlack(match, oldUsers, newUsers) {
    const matchResultMessage = createMatchResultMessage(match, this.decorations)

    const oldRankings = oldUsers.sort(ratingComparator)
    const newRankings = newUsers.sort(ratingComparator)

    const rankingChangeMessage = createRankingChangeMessage(oldRankings, newRankings)
    await this.bot.postMessage(`${matchResultMessage}\n${rankingChangeMessage}`)
    const shouldUpdatePurpose = hasLeaderboardChanged(this.leaderboardSize, oldRankings, newRankings)
    if (shouldUpdatePurpose) {
      const purposeMessage = await createPurposeMessage(newRankings.slice(0, this.leaderboardSize))
      await this.bot.setGroupPurpose(purposeMessage)
    }
  }
}

const ratingComparator = (a, b) => b.rating - a.rating

const parseMatchReportDecorations = config => config
  ? config.split(';').map(configPart => {
    const splitConfigPart = configPart.split(',')
    if (splitConfigPart.length !== 4) {
      throw Error(`Could not parse config part "${splitConfigPart}"`)
    }
    return ({
      player1: splitConfigPart[0],
      player2: splitConfigPart[1],
      prefix: splitConfigPart[2],
      suffix: splitConfigPart[3],
    })
  })
  : []

const createMatchResultMessage = (match, decorations) => {
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

  const { prefix, suffix } = decorations && winningTeam.length === 2
    ? getDecorationsForTeam(winningTeam, decorations)
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

const getDecorationsForTeam = (team, decorations) => {
  for (let decoration of decorations) {
    if (team.every(player => player.name === decoration.player1 || player.name === decoration.player2)) {
      return decoration
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
    return ''
  }

  return rankingChanges
    .map((c) => (
      `${c.name} ${c.oldRanking}. ⟶ ${c.newRanking}.`)
    )
    .join('\n')
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
