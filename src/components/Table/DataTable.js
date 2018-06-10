import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import Paper from '../Paper'
import TableHead from './components/TableHead'
import TableRow from './components/TableRow'
import EmptyRow from './components/EmptyRow'
import MoreRow from './components/MoreRow'

const styles = () => ({
  table: {
    overflow: 'auto',
  },
  filterBar: {
    '@media print': {
      display: 'none'
    }
  }
})

class DataTable extends React.Component {
  state = {
    filter: '',
  }

  handleFilter = filter => {
    if (!this.props.onFetch) { return }
    
    this.props.onFetch(filter)
    this.setState({ filter })
  }

  handleMore = pageToken => () => {
    if (!this.props.onFetch) { return }
    this.props.onFetch(this.state.filter, pageToken)
  }

  renderRows = (columns, rows, rowActions, profile) => {
    if (!rows || rows.length === 0) {
      return <EmptyRow colSpan={columns.length + (rowActions ? 1 : 0)} />
    }

    return rows.map((row, index) => (
      <TableRow key={`tr-${index}`} columns={columns} row={row} rowActions={rowActions} profile={profile} />
    ))
  }

  renderTable = (classes, columns, rows, rowActions, profile, pageToken) => {
    return (
      <Table className={classes.table}>
        <TableHead columns={columns} editable={!!rowActions} profile={profile} />
        <TableBody>
          {this.renderRows(columns, rows, rowActions, profile)}
        </TableBody>
        {this.renderTableFooter(columns.length + (rowActions ? 1 : 0), pageToken)}
      </Table>
    )
  }

  renderTableFooter = (length, pageToken) => {
    if (!pageToken) {
      return null
    }
    return (
      <MoreRow colSpan={length}>
        <Button onClick={this.handleMore(pageToken)}>MORE</Button>
      </MoreRow>
    )
  }

  render() {
    const { classes, columns, rows, rowActions, border, profile, filter, pageToken } = this.props
    return (
      <Paper border={border} elevation={0}>
        <div className={classes.filterBar}>
          {filter && filter(this.handleFilter)}
        </div>
        {this.renderTable(classes, columns, rows, rowActions, profile, pageToken)}
      </Paper>
    )
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  rowActions: PropTypes.func,
  filter: PropTypes.func,
  onFetch: PropTypes.func,
  pageToken: PropTypes.string,
}

DataTable.defaultProps = {
  border: true,
  profile: 'show'
}

export default withStyles(styles, { withTheme: true })(DataTable)
