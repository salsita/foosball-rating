var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.FOOSBOT_TOKEN
});

let channel;

console.log('lez go');

bot.on('start', async () => {
  console.log('Foosbot started');
  channel = await bot.getGroup(process.env.FOOS_CHANNEL_NAME);
  if (!channel) {
    throw `Channel '${process.env.FOOS_CHANNEL_NAME}' not found!`
  }
});

const postResultToSlack = (match) => {
  const { team1, team2, team1Won, ratingChange } = match;
  let winningTeam, losingTeam;
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2];
  } else {
    [winningTeam, losingTeam] = [team2, team1];
  }
  const winningPlayers = winningTeam.map(player => `${player.name} (${player.rating})`)
  const losingPlayers = losingTeam.map(player => `${player.name} (${player.rating})`)

  let isComedyDuo = true;
  if (winningPlayers.length != 2) {
    isComedyDuo = false;
  }
  winningTeam.forEach(player => {
    if (player.name !== 'Pepa' && player.name !== 'Tonda') {
      isComedyDuo = false;
    }
  })

  let prefix = '';
  if (isComedyDuo) {
    prefix = ':tondab: :pepadab: ';
  } else if (ratingChange < 10) {
    prefix = 'Easy. ';
  } else if (ratingChange > 20) {
    prefix = 'HOLY SHIT!';
  }

  let suffix = '';
  if (isComedyDuo) {
    suffix = ':marioluigi:';
  }

  const messageText = `${prefix}${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}. Rating change: ${ratingChange}${suffix}`
  bot.postMessage(channel.id, messageText);
}

module.exports = {
  postResultToSlack
};
