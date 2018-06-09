import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import { Manager, Target, Popper } from 'react-popper'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
})

class HoverPopover extends React.Component {
  state = {
    open: false,
  }

  handlePopperOpen = () => {
    this.setState({ open: true })
  }

  handlePopperClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, color, icon, children } = this.props
    const { open } = this.state

    return (
      <Manager>
        <Target>
          <IconButton
            color={color}
            onMouseOver={this.handlePopperOpen}
            onMouseOut={this.handlePopperClose}
          >
            {icon}
          </IconButton>
        </Target>
        <Popper
          placement="bottom-start"
          eventsEnabled={open}
          className={!open ? classes.popperClose : ''}
          onMouseOver={this.handlePopperOpen}
          onMouseOut={this.handlePopperClose}
        >
          <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
            <Paper
              role="tooltip"
              aria-hidden={!open}
              elevation={8}
            >
              {children}
            </Paper>
          </Grow>
        </Popper>
      </Manager>
    )
  }
}

HoverPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(HoverPopover)
