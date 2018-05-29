import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import NavList from './NavList'

const styles = theme => ({
  root: {},
  activeGroup: {},
  activeLink: {
    background: 'linear-gradient(45deg, #9A349B 0%, #A53B94 90%)',
    color: '#fff',
  }
})

function NavItem({ classes, theme, label, icon, onClick, subItems, depth, id, activePath }) {
  const isActive = (activePath && (id === activePath[depth]))
  const itemClass = isActive ? (subItems ? classes.activeGroup : classes.activeLink) : classes.root
  let collapses = null

  if (subItems) {
    collapses = (
      <Collapse component="li" in={isActive} timeout="auto" unmountOnExit>
        <NavList items={subItems} depth={depth + 1} activePath={activePath} />
      </Collapse>
    )
  }

  return (
    <React.Fragment>
      <ListItem
        classes={{ root: itemClass }}
        style={{ paddingLeft: theme.spacing.unit * (depth ? 2 * depth : 2) }}
        button
        onClick={onClick}
      >
        {icon && <ListItemIcon classes={{ root: itemClass }}>{icon}</ListItemIcon>}
        <ListItemText inset={depth > 0} primary={label} classes={{ primary: itemClass }} />
        {subItems && (isActive ? <ExpandLess /> : <ExpandMore />)}
      </ListItem >
      {collapses}
    </React.Fragment>
  )
}

NavItem.propTypes = {
  classes: PropTypes.object.isRequired, 
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  subItems: PropTypes.arrayOf(navItemType),
  depth: PropTypes.number,
  activePath: PropTypes.arrayOf(PropTypes.string),
}

NavItem.defaultProps = {
  isActive: false,
}

export default withStyles(styles, { withTheme: true })(NavItem)
