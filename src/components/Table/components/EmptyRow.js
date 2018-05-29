import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = {
  empty: {
    textAlign: 'center',
    opacity: 0.25
  }
}

function EmptyRow({ classes, colSpan, message }) {
  return (
    <TableRow>
      <TableCell className={classes.empty} colSpan={colSpan}>{message}</TableCell>
    </TableRow>
  )
}

EmptyRow.propTypes = {
  classes: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  message: PropTypes.string,
}

EmptyRow.defaultProps = {
  message: 'NO DATA'
}

export default withStyles(styles)(EmptyRow)
