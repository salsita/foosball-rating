export const AlertType = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}

export class UserAlert {
    constructor(text, type, dismissed = false) {
        this.text = text
        this.type = type
        this.dismissed = dismissed
    }

    asDismissed = () => new UserAlert(this.text, this.type, true)
}
