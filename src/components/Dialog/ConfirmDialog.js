import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { AppBar } from '../Bar'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  dialog: {
    overflow: 'hidden',
    width: '100%',
  },
  dialogContent: {
    flex: '1 1 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

function ConfirmDialog({ classes, title, children, open, onClose, onCloseLabel, onSubmit, onSubmitLabel }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
      fullScreen={false}
      maxWidth={'xs'}
      disableBackdropClick
    >
      <AppBar
        position='absolute'
        color='secondary'
        title={title}
        leftToolbar={
          <IconButton className={classes.closeButton} color='inherit' onClick={onClose} >
            <CloseIcon />
          </IconButton>
        }
      />
      <div className={classes.dialogContent}>
        {children}
      </div>
      <DialogActions>
        <Button onClick={onClose}>{onCloseLabel}</Button>
        <Button onClick={onSubmit} color="primary">{onSubmitLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onCloseLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onSubmitLabel: PropTypes.string,
}

ConfirmDialog.defaultProps = {
  onCloseLabel: 'Cancel',
  onSubmitLabel: 'Ok',
  open: false,
}

export default withStyles(styles, { withTheme: true })(ConfirmDialog)
