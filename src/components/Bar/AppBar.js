import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  leftToolbar: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 2,
  }
})

function AppBar({ classes, className, title, position, color, disableGutters, leftToolbar, rightToolbar }) {
  return (
    <MuiAppBar position={position} color={color} className={className}>
      <Toolbar disableGutters={disableGutters}>
        <div className={classes.leftToolbar}>{leftToolbar}</div>
        <Typography variant="title" color="inherit" noWrap>{title}</Typography>
        <div className={classes.rightToolbar}>{rightToolbar}</div>
      </Toolbar>
    </MuiAppBar>
  )
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  leftToolbar: PropTypes.element,
  rightToolbar: PropTypes.element,
  position: PropTypes.string,
  color: PropTypes.string,
  disableGutters: PropTypes.bool,
}

AppBar.defaultProps = {
  disableGutters: true,
}

export default withStyles(styles, { withTheme: true })(AppBar)
