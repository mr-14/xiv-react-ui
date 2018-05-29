import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiPaper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {},
  flat: {
    border: `1px solid ${theme.palette.divider}`,
  }
})

function Paper({ classes, border, children, elevation, ...other }) {
  if (!border) {
    return <div>{children}</div>
  }

  return (
    <MuiPaper className={ClassNames(classes.root, !elevation && classes.flat)} elevation={elevation} {...other}>
      {children}
    </MuiPaper>
  )
}

Paper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  border: PropTypes.bool,
  elevation: PropTypes.number,
}

Paper.defaultProps = {
  border: true,
  elevation: 2,
}

export default withStyles(styles, { withTheme: true })(Paper)
