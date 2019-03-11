import { StatusType } from '../../modules/api/request-status'
import React from 'react'

const getMessageForStatus = (status) => {
    switch (status.type) {
        case StatusType.IN_PROGRESS:
            return "Creating..."
        case StatusType.SUCCESS:
            return "Succesfully created!"
        case StatusType.FAILURE:
            return `Failed to create match :( - ${status.error}`
    }

    return ""
}

export const CreateMatchStatus = ({ status }) => (
    <div>{getMessageForStatus(status)}</div>
)
