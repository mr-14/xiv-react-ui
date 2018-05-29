import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from './components/TableHead'
import TableRow from './components/TableRow'
import Paper from '../Paper'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

function ViewTable({ classes, columns, rows, border, profile }) {
  return <Paper border={border}>{renderTable(classes, columns, rows, 'show')}</Paper>
}

function renderTable(classes, columns, rows, profile) {
  return (
    <Table className={classes.table}>
      <TableHead columns={columns} editable={false} profile={profile} />
      <TableBody>
        {rows && rows.map((row, index) => (
          <TableRow key={`tr-${index}`} columns={columns} row={row} profile={profile} />
        ))}
      </TableBody>
    </Table>
  )
}

ViewTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

ViewTable.defaultProps = {
  border: true,
  profile: 'show',
}

export default withStyles(styles, { withTheme: true })(ViewTable)
