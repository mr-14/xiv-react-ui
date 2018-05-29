import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

class IconMenu extends React.Component {
  state = {
    anchorEl: null,
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuItemClick = item => () => {
    item.onClick()
    this.handleClose()
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { icon, items } = this.props
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton onClick={this.handleMenuClick}>
          {icon}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {items.map((item, index) => (
            <MenuItem key={index} onClick={this.handleMenuItemClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText inset primary={item.label} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

IconMenu.propTypes = {
  icon: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
}

export default IconMenu
