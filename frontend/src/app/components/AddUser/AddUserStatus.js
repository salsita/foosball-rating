import { IN_PROGRESS, SUCCESS, FAILURE } from '../../modules/api/request-status'
import React from 'react'

const getMessageForStatus = (status) => {
    switch (status) {
        case IN_PROGRESS:
            return "Adding..."
        case SUCCESS:
            return "Succesfully added!"
        case FAILURE:
            return "Failed to add the user :("
    }

    return ""
}

export const AddUserStatus = ({ status }) => (
    <div>{getMessageForStatus(status)}</div>
)
