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
import EmptyRow from './components/EmptyRow'
import { columnType } from '../../types'

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 800,
  },
  filterBar: {
    '@media print': {
      display: 'none'
    }
  }
})

class SelectableTable extends React.Component {
  handleClick = (id, isSelected) => {
    const { primaryKey, values } = this.props

    if (isSelected) {
      this.props.onChange([...values, id])
    } else {
      const list = [...values]
      const idx = list.findIndex(item => (item[primaryKey] === id))
      list.splice(idx, 1)
      return list
    }
  }

  isSelected = row => {
    const { primaryKey, values } = this.props
    return !!values.find(item => (item[primaryKey] === row[primaryKey]))
  }

  renderRows = (columns, rows) => {
    if (!rows || rows.length === 0) {
      return <EmptyRow colSpan={columns.length + 1} />
    }

    return rows.map((row) => {
      const isSelected = this.isSelected(row)
      const primaryId = row[this.props.primaryKey]

      return (
        <TableRow
          key={primaryId}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={-1}
          selected={isSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} onClick={() => this.handleClick(primaryId, isSelected)} />
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
    const { classes, columns, filter, rows } = this.props
    
    return (
      <Paper className={classes.root}>
        <div className={classes.filterBar}>
          {filter && filter(this.handleFilter)}
        </div>
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
  values: PropTypes.array,
  filter: PropTypes.func,
  primaryKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

SelectableTable.defaultProps = {
  primaryKey: 'id',
  values: [],
}

export default withStyles(styles, { withTheme: true })(SelectableTable)
