import SlackBot from 'slackbots'

export class SingleChannelBot {
  constructor(
    private readonly slackbot: SlackBot,
    private readonly channelName,
    private readonly channelId
  ) {}

  setGroupPurpose(purpose): Promise<void> {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose })
  }

  postMessage(message, isAsUser = true): Promise<void> {
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

export const makeBot = (botToken, channelName): Promise<SingleChannelBot> => {
  return new Promise((resolve, reject): void => {
    if (!botToken || !channelName) {
      reject(Error('botToken or channelName missing'))
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
