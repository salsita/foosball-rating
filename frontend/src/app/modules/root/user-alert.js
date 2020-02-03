export const AlertType = {
  SUCCESS: Symbol('success'),
  ERROR: Symbol('error'),
  INFO: Symbol('info'),
}

export class UserAlert {
  constructor(text, type, dismissed = false) {
    this.text = text
    this.type = type
    this.dismissed = dismissed
  }

  asDismissed = () => new UserAlert(this.text, this.type, true)
}
