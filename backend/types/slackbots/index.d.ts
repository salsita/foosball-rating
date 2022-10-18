declare module 'slackbots' {
  interface Config {
    token: string;
  }
  interface ApiConfig {
    channel: string;
    purpose: string;
  }
  interface PostConfig {
    as_user: boolean;
  }

  class Slackbot {
    constructor(config: Config)
    on(eventName: string, cb: Function): void
    _api(apiName: string, config: ApiConfig): Promise<void>
    postTo(channelName: string, message: string, config: PostConfig): Promise<void>
    getGroupId(channelName: string): string
  }

  export = Slackbot
}
