import { StatusType } from '../../modules/api/request-status'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

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
    <Snackbar open={status.type == StatusType.SUCCESS || status.type == StatusType.FAILURE}
              message={getMessageForStatus(status)} 
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              />
)
