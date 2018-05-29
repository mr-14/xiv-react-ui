import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'

const styles = {
  button: {
    textAlign: 'center',
    // opacity: 0.25
  }
}

function MoreRow({ classes, colSpan, children }) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell className={classes.button} colSpan={colSpan}>
          {children}
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

MoreRow.propTypes = {
  classes: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(styles)(MoreRow)