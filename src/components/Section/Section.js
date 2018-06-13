import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ClassNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 6}px 0`,
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
  noMargin: {
    margin: 0,
  },
  noPadding: {
    padding: 0,
  }
})

function Section({ classes, title, className, children, disablePadding, disableMargin, showDivider }) {
  return (
    <div className={ClassNames(classes.root, disableMargin && classes.noMargin, className )}>
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
  className: PropTypes.string,
  title: PropTypes.string,
  disablePadding: PropTypes.bool,
  disableMargin: PropTypes.bool,
  showDivider: PropTypes.bool,
}

Section.defaultProps = {
  disablePadding: false,
  disableMargin: false,
  showDivider: false,
}

export default withStyles(styles, { withTheme: true })(Section)
