const SlackBot = require('slackbots')

class SingleChannelBot {
  constructor(slackbot, channelName, channelId) {
    this.slackbot = slackbot
    this.channelName = channelName
    this.channelId = channelId
  }

  setGroupPurpose(purpose) {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose })
  }

  postMessage(message, isAsUser = true) {
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

const makeBot = (botToken, channelName) => {
  return new Promise((resolve, reject) => {
    if (!botToken || !channelName) {
      reject('botToken or channelName missing')
    }

    const slackbot = new SlackBot({
      token: botToken
    })

    slackbot.on('error', (error) => reject(error.message))

    slackbot.on('start', async () => {
      let groupId 
      try {
        groupId = await slackbot.getGroupId(channelName)
      } catch (error) {
        reject(error.message)
      }
      resolve(new SingleChannelBot(slackbot, channelName, groupId))
    })
  })
}

module.exports = { makeBot }
