import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import MuiTableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  tableRow: {
    backgroundColor: '#eee'
  },
})

function TableHead({ classes, columns, editable, profile }) {
  return (
    <MuiTableHead>
      <TableRow className={classes.tableRow}>
        {columns.map(column => {
          if (column.profile && !column.profile.includes(profile)) {
            return null
          }

          const alignRight = (column.align || 'left') === 'right'
          return <TableCell key={column.id} numeric={!editable && alignRight}>{column.label}</TableCell>
        })}
        {editable && <TableCell styles={{ width: '1%' }} />}
      </TableRow>
    </MuiTableHead>
  )
}

TableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

TableHead.defaultProps = {
  editable: true,
}

export default withStyles(styles, { withTheme: true })(TableHead)
