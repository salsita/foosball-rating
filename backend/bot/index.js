const SlackBot = require('slackbots')

class SingleChannelBot {
  constructor(botToken, channelName) {
    if (!botToken || !channelName) {
      throw Error('botToken or channelName missing')
    }
    this.slackbot = new SlackBot({
      token: botToken
    })

    this.channelName = channelName

    this.groupIdPromise = new Promise((resolve, reject) => {
      this.slackbot.on('start', async () => {

        let groupId 
        try {
          groupId = await this.slackbot.getGroupId(channelName)
        } catch (error) {
          return reject(error)
        }
        return resolve(groupId)
      })
    })
  }

  async setGroupPurpose(purpose) {
    const groupId = await this.groupIdPromise
    return this.slackbot._api('groups.setPurpose', { channel: groupId, purpose })
  }

  async postMessage(message, isAsUser = true) {
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

module.exports = SingleChannelBot

