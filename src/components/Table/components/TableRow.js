import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../../types'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiTableRow from '@material-ui/core/TableRow'
import TableCell from './TableCell'

function TableRow({ columns, row, rowActions, profile }) {
  return (
    <MuiTableRow>
      {columns.map((column, index) => {
        if (column.profile && !column.profile.includes(profile)) {
          return null
        }

        return <TableCell key={`td-${index}`} column={column} row={row} value={row[column.id]} />
      })}
      {rowActions && <MuiTableCell numeric>{rowActions(row)}</MuiTableCell>}
    </MuiTableRow>
  )
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(columnType).isRequired,
  row: PropTypes.object,
  rowActions: PropTypes.func,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

TableRow.defaultProps = {
  border: true,
  profile: 'show',
}

export default TableRow
