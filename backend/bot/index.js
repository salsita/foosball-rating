var SlackBot = require('slackbots');

var bot = new SlackBot({
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

  const isComedyDuo = winningPlayers.length == 2 && winningTeam.every(player => player.name === 'Pepa' || player.name === 'Tonda')

  let prefix = '';
  if (isComedyDuo) {
    prefix = ':tondab: :pepadab: ';
  } else if (ratingChange <= 10) {
    prefix = 'Easy. ';
  } else if (ratingChange >= 20) {
    prefix = `HOLY SHIT! L2P, ${losingTeam.length > 1 ? 'noobs' : 'noob'}! `;
  }

  const suffix = isComedyDuo?  ':marioluigi:' : '';

  const messageText = `${prefix}${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}. Rating change: ${ratingChange}${suffix}`
  bot.postMessage(channel.id, messageText, {as_user: true});
}

module.exports = {
  postResultToSlack
};
