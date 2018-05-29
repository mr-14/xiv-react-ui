import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { AppBar } from '../Bar'

const styles = theme => ({
  dialog: {
    overflow: 'hidden',
    width: '100%',
  },
  dialogContent: {
    flex: '1 1 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  dialogBackground: {
    padding: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class SimpleDialog extends React.Component {
  componentDidMount = () => {
    if (this.props.title) {
      document.title = this.props.title
    }
  }

  renderAppBar = (classes, title, onClose) => {
    if (!title) { return null }
    return (
      <AppBar
        position='absolute'
        title={title}
        leftToolbar={
          <IconButton className={classes.closeButton} color='inherit' onClick={onClose} >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }

  render() {
    const { classes, open, title, size, children, onClose } = this.props
    
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        classes={{ paper: classes.dialog }}
        fullScreen={size === 'full'}
        maxWidth={size === 'full' ? false : size}
        disableBackdropClick
      >
        {this.renderAppBar(classes, title, onClose)}
        <div className={ClassNames(classes.dialogContent, title && classes.title, ['md', 'lg', 'full'].includes(size) && classes.dialogBackground)}>
          {children}
        </div>
      </Dialog>
    )
  }

}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'full']),
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

SimpleDialog.defaultProps = {
  open: false,
  size: 'md',
}

export default withStyles(styles, { withTheme: true })(SimpleDialog)
