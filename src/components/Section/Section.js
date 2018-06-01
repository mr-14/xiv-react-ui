import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ClassNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
  },
  content: {
    padding: theme.spacing.unit * 2,
  }
})

function Section({ classes, title, children, disablePadding }) {
  return (
    <div className={classes.root}>
      <Typography variant="subheading" gutterBottom>{title}</Typography>
      <Divider />
      <div className={ClassNames(!disablePadding && classes.content)}>
        {children}
      </div>
      <Divider />
    </div>
  )
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  disablePadding: PropTypes.bool,
}

Section.defaultProps = {
  disablePadding: false
}

export default withStyles(styles, { withTheme: true })(Section)
