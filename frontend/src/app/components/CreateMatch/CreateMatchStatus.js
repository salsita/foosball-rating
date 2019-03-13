import { StatusType } from '../../modules/api/request-status'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

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
    <Snackbar open={status.type == StatusType.SUCCESS || status.type == StatusType.FAILURE}
              message={getMessageForStatus(status)} 
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
              }}
              />
)
