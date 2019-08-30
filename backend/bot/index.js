const SlackBot = require('slackbots');

class FoosBot {
  constructor(channelId, slackbot) {
    this.channelId = channelId
    this.slackbot = slackbot
  }

  /**
   * Sets the purpose for a private channel

   * @param {string} purpose
   * @returns {vow.Promise}
   */
  setGroupPurpose(purpose) {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose });
  }

  postMessage(message, isAsUser = true) {
    return this.slackbot.postMessage(this.channelId, message, { as_user: isAsUser })
  }

  reportMatchOnSlack = async (match, oldUsers, newUsers) => {
    let matchResultMessage = createMatchResultMessage(match)
  
    const oldRankings = oldUsers.sort(ratingComparator)
    const newRankings = newUsers.sort(ratingComparator)
  
    const rankingChangeMessage = createRankingChangeMessage(oldRankings, newRankings)
    await this.postMessage(`${matchResultMessage}\n${rankingChangeMessage}`);
  
    const leaderboardSize = 5
    const shouldUpdatePurpose = hasLeaderboardChanged(leaderboardSize, oldRankings, newRankings)
    if (shouldUpdatePurpose) {
      const purposeMessage = await createPurposeMessage(newRankings.slice(0, leaderboardSize))
      await this.setGroupPurpose(purposeMessage)
    }
  }
}

const ratingComparator = (a, b) => b.rating - a.rating

const createMatchResultMessage = (match) => {
  const { team1, team2, team1Won, winningTeamRatingChange, losingTeamRatingChange } = match;
  let winningTeam, losingTeam;
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2];
  } else {
    [winningTeam, losingTeam] = [team2, team1];
  }
  const winningPlayers = winningTeam.map(player => `${player.name} (${player.rating})`)
  const losingPlayers = losingTeam.map(player => `${player.name} (${player.rating})`)

  const isComedyDuo = winningPlayers.length == 2 && winningTeam.every(player => player.name === 'Pepa' || player.name === 'Tonda')

  const messageParts = []

  if (isComedyDuo) {
    messageParts.push(':tondab: :pepadab:')
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

  if (isComedyDuo) {
    messageParts.push(':marioluigi:')
  }

  return messageParts.join(' ')
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


const makeBot = async (foosbotToken, channelName) => {
  return new Promise((resolve, reject) => {
    if (!foosbotToken || !channelName) {
      return reject("Missing env variables!")
    }

    const slackBot = new SlackBot({
      token: foosbotToken
    })
    
    slackBot.on('start', async () => {
      console.log('Foosbot started')
      const channel = await slackBot.getGroup(channelName)
      if (!channel) {
        return reject(Error(`Channel '${channelName}' not found!`))
      }
      return resolve(new FoosBot(channel.id, slackBot))
    })
  })
}

module.exports = {
  makeBot
};
