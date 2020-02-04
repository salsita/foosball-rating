const SlackBot = require('slackbots')


class SingleChannelBot {
  private readonly slackbot: any;
  private readonly channelName: string;
  private readonly channelId: string;
  constructor(slackbot: any, channelName: string, channelId: string) {
    this.slackbot = slackbot
    this.channelName = channelName
    this.channelId = channelId
  }

  setGroupPurpose(purpose: any) {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose })
  }

  postMessage(message: string, isAsUser = true) {
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

export const makeBot = (botToken: string, channelName: string) => {
  return new Promise((resolve, reject) => {
    if (!botToken || !channelName) {
      return reject(Error('botToken or channelName missing'))
    }

    const slackbot = new SlackBot({
      token: botToken
    })

    slackbot.on('error', (error: any) => reject(error))

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
