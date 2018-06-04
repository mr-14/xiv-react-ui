import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ClassNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 8,
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
  noMargin: {
    marginBottom: 0,
  },
  noPadding: {
    padding: 0,
  }
})

function Section({ classes, title, children, disablePadding, disableMargin, showDivider }) {
  return (
    <div className={ClassNames(classes.root, disableMargin && classes.noMargin )}>
      <Typography variant="subheading" gutterBottom>{title}</Typography>
      <Divider />
      <div className={ClassNames(classes.content, disablePadding && classes.noPadding)}>
        {children}
      </div>
      {showDivider && <Divider />}
    </div>
  )
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  disablePadding: PropTypes.bool,
  disableMargin: PropTypes.bool,
  showDivider: PropTypes.bool,
}

Section.defaultProps = {
  disablePadding: false,
  disableMargin: false,
  showDivider: true,
}

export default withStyles(styles, { withTheme: true })(Section)
