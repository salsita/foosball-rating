import SlackBot from 'slackbots'

class SingleChannelBot {
  constructor(
    private readonly slackbot,
    private readonly channelName,
    private readonly channelId
  ) {}

  setGroupPurpose(purpose) {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose })
  }

  postMessage(message, isAsUser = true) {
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

export const makeBot = (botToken, channelName) => {
  return new Promise((resolve, reject) => {
    if (!botToken || !channelName) {
      return reject(Error('botToken or channelName missing'))
    }

    const slackbot = new SlackBot({
      token: botToken,
    })

    slackbot.on('error', error => reject(error))

    slackbot.on('start', async () => {
      let groupId
      try {
        groupId = await slackbot.getGroupId(channelName)
        resolve(new SingleChannelBot(slackbot, channelName, groupId))
      } catch (error) {
        reject(error)
      }
    })
  })
}
