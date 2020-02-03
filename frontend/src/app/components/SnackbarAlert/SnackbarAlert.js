import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { SnackbarAlertContent } from './SnackbarAlertContent'
import { connect } from 'react-redux'
import { RootActions } from '../../modules/root/root-actions'
import { AlertType } from '../../modules/root/user-alert'

const SnackbarAlertComponent = ({ alert, onClose }) => {
  const variant = alert ? alert.type : AlertType.INFO
  const message = alert ? alert.text : ''

  const open = Boolean(alert && !alert.dismissed)

  const autoHideDuration = variant === AlertType.ERROR ? null : 2000

  return <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    onClose={onClose}>
    <SnackbarAlertContent
      variant={variant}
      message={message}
      onClose={onClose} />
  </Snackbar>
}

const mapStateToProps = state => ({
  alert: state.activeAlert,
})

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(RootActions.Creators.dismissAlert())
  },
})

export const SnackbarAlert = connect(mapStateToProps, mapDispatchToProps)(SnackbarAlertComponent)
