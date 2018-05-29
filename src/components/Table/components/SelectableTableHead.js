import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiTableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  tableRow: {
    backgroundColor: '#eee'
  },
  hidden: {
    display: 'none'
  },
})

const SelectableTableHead = ({ classes, columns }) => (
  <MuiTableHead>
    <TableRow className={classes.tableRow}>
      <TableCell styles={{ width: '1%' }}>&nbsp;</TableCell>
      {columns.map((cell, index) => (
        <TableCell key={index}>{cell.label}</TableCell>
      ))}
    </TableRow>
  </MuiTableHead>
)

SelectableTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
}

export default withStyles(styles, { withTheme: true })(SelectableTableHead)
