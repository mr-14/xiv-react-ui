import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import NavItem from './NavItem'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

function NavList({ classes, items, depth, activePath }) {
  return (
    <List className={classes.root} disablePadding={depth > 0}>
      {items.map(item => {
        const element = [
          <NavItem
            id={item.id}
            key={item.id}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
            subItems={item.subItems}
            depth={depth}
            activePath={activePath}
          />
        ]

        if (item.divider) {
          element.push(<Divider key={`nav-divier-${item.id}`} />)
        }

        return element
      })}
    </List>
  )
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(navItemType).isRequired,
  depth: PropTypes.number,
  activePath: PropTypes.arrayOf(PropTypes.string),
}

NavList.defaultProps = {
  depth: 0
}

export default withStyles(styles)(NavList)
