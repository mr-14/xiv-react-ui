import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import Paper from '../Paper'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import { SimpleDialog } from '../Dialog'
import { SimpleForm } from '../Form'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  toolbarContent: {
    flex: '0 0 auto',
    marginLeft: 'auto',
    margin: theme.spacing.unit,
  },
  table: {
    overflow: 'auto',
  },
  tableRow: {
    backgroundColor: '#eee'
  },
  tableAddRow: {
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    opacity: 0.25
  },
  toggleHandler: {
    width: theme.spacing.unit * 6,
    padding: `4px 0 4px 0`
  },
  nestedRow: {
    backgroundColor: '#fafafa'
  },
  hidden: {
    display: 'none'
  }
})

class ListForm extends React.Component {
  constructor(props) {
    super(props)

    const values = props.values || []
    const expandRows = props.nestedRow ? values.map(() => false) : null

    this.state = {
      open: false,
      values,
      expandRows,
      errors: {},
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.values && (nextProps.values !== this.props.values)) {
      this.setState({ values: nextProps.values })
    }
  }

  handleOpenDialog = () => this.setState({ open: true })

  handleCloseDialog = () => this.setState({ open: false })

  handleRowRemove = row => () => {
    const values = [...this.state.values]
    const valueToRemove = values.indexOf(row)
    values.splice(valueToRemove, 1)
    this.setState({ values })

    this.props.onRowRemove(row)
  }

  handleRowAdd = row => {
    if (this.props.onRowAdd) {
      this.props.onRowAdd(row, (data) => {
        this.setState({ values: [...this.state.values, data] })
        this.handleCloseDialog()
      })
    } else {
      this.setState({ values: [...this.state.values, row] })
      this.handleCloseDialog()
    }
  }

  handleToggleNestedRow = index => () => {
    const expandRows = [...this.state.expandRows]
    expandRows[index] = !expandRows[index]
    this.setState({ expandRows })
  }

  renderTable = (classes, columns, values, onRowAdd, profile) => (
    <Table className={classes.table}>
      {this.renderTableHead(classes, columns, profile)}
      <TableBody>
        {(values && values.length > 0) ? this.renderRow(columns, values, profile) : this.renderEmptyRow(columns.length + 1)}
      </TableBody>
    </Table>
  )

  renderToolbar = (classes, profile) => {
    return (
      <Toolbar className={classes.toolbar} disableGutters>
        <div className={classes.toolbarContent}>
          <IconButton color="primary" onClick={this.handleOpenDialog}><AddIcon /></IconButton>
        </div>
      </Toolbar>
    )
  }

  renderTableHead = (classes, columns, profile) => (
    <TableHead>
      <TableRow className={classes.tableRow}>
        {this.props.nestedRow && <TableCell className={classes.toggleHandler} />}

        {columns.map((column, index) => {
          if (column.profile && !column.profile.includes(profile)) {
            return null
          }

          const key = (column.id) ? column.id : `th-${index}`
          return <TableCell key={key}>{column.props.label}</TableCell>
        })}
        {(profile !== 'show') && <TableCell styles={{ width: '1%' }} />}
      </TableRow>
    </TableHead>
  )

  renderRow = (columns, values, profile) => (
    values.map((row, index) => {
      let toggleHandler
      
      if (this.props.nestedRow) {
        toggleHandler = <TableCell className={this.props.classes.toggleHandler} />

        if (!!row[this.props.nestedRow]) {
          toggleHandler = (
            <TableCell className={this.props.classes.toggleHandler}>
              <IconButton onClick={this.handleToggleNestedRow(index)}>
                {this.state.expandRows[index] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
            </TableCell>
          )
        }
      }

      return (
        <React.Fragment key={index}>
          <TableRow>
            {toggleHandler}
            {this.renderRowCell(columns, row, index)}
            {(profile !== 'show') && this.renderRowAction(row)}
          </TableRow>
          {this.renderNestedRow(index, columns, row[this.props.nestedRow], profile)}
        </React.Fragment>
      )
    })
  )

  renderNestedRow = (index, columns, values, profile) => {
    if (!values || !this.state.expandRows[index]) {
      return
    }

    return values.map((value, subIndex) => (
      <TableRow key={`${index}-nested-${subIndex}`} className={this.props.classes.nestedRow}>
        <TableCell className={this.props.classes.toggleHandler} />
        {this.renderRowCell(columns, value, `${index}-nested-${subIndex}`)}
        {(profile !== 'show') && <TableCell />}
      </TableRow>
    ))
  }

  renderEmptyRow = (colspan, profile) => {
    const { classes, emptyLabel, nestedRow } = this.props
    if (nestedRow) {
      colspan++
    }

    if (profile !== 'show') {
      colspan++
    }

    return (
      <TableRow>
        <TableCell className={classes.empty} colSpan={colspan}>{emptyLabel}</TableCell>
      </TableRow>
    )
  }

  renderRowCell = (columns, row, rowIndex) => (
    columns.map((column, index) => {
      if (column.profile && !column.profile.includes(this.props.profile)) {
        return null
      }

      // if (!column.id) {
      //   const props = column.props
      //   let cellVal

      //   if (props.children) {
      //     cellVal = <column.component {...props}>{props.children}</column.component>
      //   } else {
      //     cellVal = <column.component {...props} />
      //   }

      //   return <TableCell key={`td-${rowIndex}-${index}`}>{cellVal}</TableCell>
      // }

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

  renderDialog = (columns) => {
    const { profile, cancelLabel, saveLabel } = this.props
    const actions = [
      { label: cancelLabel, onClick: this.handleCloseDialog },
      { label: saveLabel, color: 'secondary', onSubmit: this.handleRowAdd }
    ]

    return (
      <SimpleDialog
        open={this.state.open}
        onClose={this.handleCloseDialog}
        size="xs"
      >
        <SimpleForm
          fields={columns}
          // TODO: convert list to object
          // values={this.state.values}
          actions={actions}
          errors={this.state.errors}
          profile={profile}
        />
      </SimpleDialog>
    )
  }

  render() {
    const { classes, columns, onRowAdd, border, profile } = this.props
    const { values } = this.state
    return (
      <React.Fragment>
        <Paper border={border} elevation={0}>
          {(profile !== 'show') && this.renderToolbar(classes, profile)}
          {this.renderTable(classes, columns, values, onRowAdd, profile)}
        </Paper>
        {this.renderDialog(columns)}
      </React.Fragment>
    )
  }
}

ListForm.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  values: PropTypes.array,
  nestedRow: PropTypes.string,
  onRowAdd: PropTypes.func.isRequired,
  onRowRemove: PropTypes.func.isRequired,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  emptyLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  saveLabel: PropTypes.string,
}

ListForm.defaultProps = {
  border: true,
  profile: 'add',
  emptyLabel: 'No Data',
  cancelLabel: 'Cancel',
  saveLabel: 'Save',
}

export default withStyles(styles, { withTheme: true })(ListForm)
