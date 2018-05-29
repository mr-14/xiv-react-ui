import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import TableHead from './components/TableHead'
import EditableRow from './components/EditableRow'
import Paper from '../Paper'

const styles = theme => ({
  table: {
    overflow: 'auto',
    marginBottom: '300px',
  },
})

class EditableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = { rows: props.values }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.values !== this.props.values) {
      this.setState({ rows: nextProps.values })
    }
  }

  handleRowRemove = row => () => {
    this.props.onRowRemove(row)
  }

  renderTable = (classes, columns, rows, onRowAdd, profile) => (
    <Table className={classes.table}>
      <TableHead columns={columns} editable profile={profile} />
      <TableBody>
        {rows && this.renderRow(columns, rows)}
        <EditableRow columns={columns} onRowAdd={onRowAdd} profile={profile} />
      </TableBody>
    </Table>
  )

  renderRow = (columns, rows) => (
    rows.map((row, index) => (
      <TableRow key={index}>
        {this.renderRowCell(columns, row)}
        {this.renderRowAction(row)}
      </TableRow>
    ))
  )

  renderRowCell = (columns, row) => (
    columns.map((column, index) => {
      if (column.profile && !column.profile.includes(this.props.profile)) {
        return null
      }

      let cellVal = row[column.id]
      const options = column.props.options

      if (options) {
        for (const option of options) {
          if (String(option.id) === String(cellVal)) {
            cellVal = option.label
            break
          }
        }
      }

      return <TableCell key={column.id}>{cellVal}</TableCell>
    })
  )

  renderRowAction = (row) => {
    return (
      <TableCell numeric>
        <IconButton color="inherit" onClick={this.handleRowRemove(row)}><RemoveIcon /></IconButton>
      </TableCell>
    )
  }

  render() {
    const { classes, columns, onRowAdd, border, profile } = this.props
    const { rows } = this.state
    return <Paper border={border}>{this.renderTable(classes, columns, rows, onRowAdd, profile)}</Paper>
  }
}

EditableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  values: PropTypes.array,
  onRowAdd: PropTypes.func.isRequired,
  onRowRemove: PropTypes.func.isRequired,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

EditableTable.defaultProps = {
  border: true,
}

export default withStyles(styles, { withTheme: true })(EditableTable)
