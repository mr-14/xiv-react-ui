import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { hideNotification } from '../../actions/root'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

function Notification({ t, classes, message, hideNotification, anchorOriginHorizontal, anchorOriginVertical }) {
  if (!message || typeof message !== 'string') {
    return null
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    hideNotification()
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: anchorOriginVertical,
        horizontal: anchorOriginHorizontal,
      }}
      open
      autoHideDuration={6000}
      onClose={handleClose}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{t(message)}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

Notification.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  hideNotification: PropTypes.func.isRequired,
  anchorOriginVertical: PropTypes.string,
  anchorOriginHorizontal: PropTypes.string,
}

Notification.defaultProps = {
  anchorOriginVertical: 'top',
  anchorOriginHorizontal: 'center',
}

const mapStateToProps = state => ({
  t: getTranslate(state.locale),
  message: state.root.notification,
})

const mapDispatchToProps = (dispatch) => ({
  hideNotification: () => dispatch(hideNotification()),
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Notification)
)
