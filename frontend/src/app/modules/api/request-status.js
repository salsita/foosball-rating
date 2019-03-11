export const StatusType = {
    READY: Symbol('READY'),
    IN_PROGRESS: Symbol('IN_PROGRESS'),
    SUCCESS: Symbol('SUCCESS'),
    FAILURE: Symbol('FAILURE')
}

export class RequestStatus {
    constructor(type, error = null) {
        this.type = type
        this.error = error
    }
}

export const ready = new RequestStatus(StatusType.READY)
export const inProgress = new RequestStatus(StatusType.IN_PROGRESS)
export const success = new RequestStatus(StatusType.SUCCESS)
export const failure = (error) => new RequestStatus(StatusType.FAILURE, error)
