import { StatusType } from '../../modules/api/request-status'
import React from 'react'

const getMessageForStatus = (status) => {
    switch (status.type) {
        case StatusType.IN_PROGRESS:
            return "Adding..."
        case StatusType.SUCCESS:
            return "Succesfully added!"
        case StatusType.FAILURE:
            return `Failed to add user :( - ${status.error}`
    }

    return ""
}

export const AddUserStatus = ({ status }) => (
    <div>{getMessageForStatus(status)}</div>
)
