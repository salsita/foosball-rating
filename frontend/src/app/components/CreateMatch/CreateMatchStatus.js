import { IN_PROGRESS, SUCCESS, FAILURE } from '../../modules/api/request-status'
import React from 'react'

const getMessageForStatus = (status) => {
    switch (status) {
        case IN_PROGRESS:
            return "Creating..."
        case SUCCESS:
            return "Succesfully created!"
        case FAILURE:
            return "Failed to create match :("
    }

    return ""
}

export const CreateMatchStatus = ({ status }) => (
    <div>{getMessageForStatus(status)}</div>
)
