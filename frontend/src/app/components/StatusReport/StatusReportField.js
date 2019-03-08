import { IN_PROGRESS, SUCCESS, FAILURE, READY } from '../../modules/api/request-status'
import React from 'react'

const getTextForRequestStatus = (status) => {
    switch (status) {
        case IN_PROGRESS:
            return "Creating..."
        case SUCCESS:
            return "Succesfully created!"
        case FAILURE:
            return "Failed to create the match :("
    }

    return ""
}

export const StatusReportField = ({ status }) => (
    <div>{getTextForRequestStatus(status)}</div>
)
