import React from 'react'
// import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '../Paper'
import Checkbox from '@material-ui/core/Checkbox'
import SelectableTableHead from './components/SelectableTableHead'
import AdvanceTableFilter from './components/AdvanceTableFilter'
import EmptyRow from './components/EmptyRow'
import { columnType } from '../../types'

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class SelectableTable extends React.Component {
  handleClick = value => {
    this.props.onSelect(value)
  }

  isSelected = row => {
    return this.props.value.id === row.id
  }

  renderRows = (columns, rows) => {
    if (!rows || rows.length === 0) {
      return <EmptyRow colSpan={columns.length + 1} />
    }

    return rows.map((row, index) => {
      const isSelected = this.isSelected(row)
      return (
        <TableRow
          key={row.id}
          onClick={event => this.handleClick(row)}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={-1}
          selected={isSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} />
          </TableCell>
          {this.renderRowCell(columns, row)}
        </TableRow>
      )
    })
  }

  renderRowCell = (columns, row) => (
    columns.map(column => {
      return (
        <TableCell key={column.id}>{row[column.id]}</TableCell>
      )
    })
  )

  render() {
    const { classes, columns, rows } = this.props

    return (
      <Paper className={classes.root}>
        <AdvanceTableFilter columns={columns} />
        <Table className={classes.table}>
          <SelectableTableHead columns={columns} />
          <TableBody>
            {this.renderRows(columns, rows)}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SelectableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default withStyles(styles, { withTheme: true })(SelectableTable)
