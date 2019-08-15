const SlackBot = require('slackbots');

class FoosBot extends SlackBot {
  /**
   * Sets the purpose for a private channel
   * @param {string} id - channel ID
   * @param {string} purpose
   * @returns {vow.Promise}
   */
  setGroupPurpose(id, purpose) {
    return this._api('groups.setPurpose', { channel: id, purpose });
  }

}

const bot = new FoosBot({
  token: process.env.FOOSBOT_TOKEN
});

let channel;

bot.on('start', async () => {
  console.log('Foosbot started');
  channel = await bot.getGroup(process.env.FOOS_CHANNEL_NAME);
  if (!channel) {
    throw `Channel '${process.env.FOOS_CHANNEL_NAME}' not found!`
  }
});


const ratingComparator = (a, b) => b.rating - a.rating

const reportMatchOnSlack = async (match, oldUsers, newUsers) => {
  await postMatchResult(match)
  const oldRankings = oldUsers.sort(ratingComparator)
  const newRankings = newUsers.sort(ratingComparator)
  const shouldUpdatePurpose = await postRankingChangeMessage(oldRankings, newRankings)
  if (shouldUpdatePurpose) {
    await updatePurpose(newRankings)
  }
}

const postMatchResult = async (match) => {
  const { team1, team2, team1Won, ratingChange } = match;
  let winningTeam, losingTeam;
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2];
  } else {
    [winningTeam, losingTeam] = [team2, team1];
  }
  const winningPlayers = winningTeam.map(player => `${player.name} (${player.rating})`)
  const losingPlayers = losingTeam.map(player => `${player.name} (${player.rating})`)

  const isComedyDuo = winningPlayers.length == 2 && winningTeam.every(player => player.name === 'Pepa' || player.name === 'Tonda')

  let prefix = '';
  if (isComedyDuo) {
    prefix = ':tondab: :pepadab: ';
  } else if (ratingChange <= 10) {
    prefix = 'Easy. ';
  } else if (ratingChange >= 20) {
    prefix = 'HOLY SHIT! ';
  }

  const suffix = isComedyDuo ? ':marioluigi:' : '';

  const messageText = `${prefix}${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}. Rating change: ${ratingChange}${suffix}`
  await bot.postMessage(channel.id, messageText, { as_user: true });
}

const postRankingChangeMessage = async (oldRankings, newRankings) => {
  let shouldUpdatePurpose = false
  const rankingChanges = []
  oldRankings.forEach((oldPlayer, index) => {
    const newPlayer = newRankings[index]
    if (newPlayer.id !== oldPlayer.id) {
      if (index <= 4) {
        shouldUpdatePurpose = true
      }
      rankingChanges.push({
        name: oldPlayer.name,
        oldRanking: index +1 ,
        newRanking: newRankings.findIndex(p => p.id === oldPlayer.id) + 1
      })
    }
  })
  const messageText = rankingChanges
    .map((c) => (
      `${c.name} ${c.oldRanking}. ⟶ ${c.newRanking}.`)
    )
    .join('\n')
  await bot.postMessage(channel.id, messageText, { as_user: true });

  return shouldUpdatePurpose
}

const updatePurpose = async (rankings) => {
  const purpose = ['TOP PLAYERS:']
  for (let i = 0; i < 5; i++) {
    purpose.push(`${i + 1}. ${rankings[i].name} (${rankings[i].rating})`)
  }
  const purposeText = purpose.join('\n')
  await bot.setGroupPurpose(channel.id, purposeText)
}


module.exports = {
  reportMatchOnSlack
};
