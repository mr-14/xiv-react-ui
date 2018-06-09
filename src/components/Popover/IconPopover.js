import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'

const styles = theme => ({
  root: {
    display: 'inline'
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  popover: {
    [`@media print`]: {
      display: 'none'
    }
  }
})

class IconPopover extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  }

  handleClick = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const {
      classes,
      color,
      icon,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
    } = this.props
    const { open, anchorEl } = this.state

    return (
      <div className={classes.root}>
        <IconButton
          color={color}
          ref={node => { this.button = node }}
          onClick={this.handleClick}
        >
          {icon}
        </IconButton>
        <Popover
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          onClick={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          {this.props.children}
        </Popover>
      </div>
    )
  }
}

IconPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  anchorOriginVertical: PropTypes.string,
  anchorOriginHorizontal: PropTypes.string,
  transformOriginVertical: PropTypes.string,
  transformOriginHorizontal: PropTypes.string,
  children: PropTypes.node.isRequired,
}

IconPopover.defaultProps = {
  anchorOriginVertical: 'bottom',
  transformOriginVertical: 'top',
}

export default withStyles(styles, { withTheme: true })(IconPopover)
