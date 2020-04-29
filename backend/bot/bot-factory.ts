import SlackBot from 'slackbots'

export class SingleChannelBot {
  constructor(
    private readonly slackbot: SlackBot,
    private readonly channelName: string,
    private readonly channelId: string
  ) {}

  setGroupPurpose(purpose: string): Promise<void> {
    return this.slackbot._api('groups.setPurpose', { channel: this.channelId, purpose })
  }

  postMessage(message: string, isAsUser = true): Promise<void> {
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    return this.slackbot.postTo(this.channelName, message, { as_user: isAsUser })
  }
}

export const makeBot =
(botToken: string | undefined, channelName: string | undefined): Promise<SingleChannelBot> => {
  return new Promise((resolve, reject): void => {
    if (!botToken || !channelName) {
      reject(Error('botToken or channelName missing'))
      return
    }

    const slackbot = new SlackBot({
      token: botToken,
    })

    slackbot.on('error', (error: Error) => reject(error))

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
