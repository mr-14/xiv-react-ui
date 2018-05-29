import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../../types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import validate from '../../../validations'

const styles = theme => ({
  textField: {
    width: '100%',
  },
  editableCell: {
    paddingRight: 0,
  },
  actionCell: {
    width: '1px',
    paddingLeft: 0,
  },
  errorRow: {
    verticalAlign: 'top'
  }
})

class EditableRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.resetRow(props) }
  }

  resetRow = (props) => {
    let values = {}, dirty = {}, error = {}

    for (const column of props.columns) {
      values[column.id] = props.values ? props.values[column.id] : ''
      dirty[column.id] = false
      error[column.id] = props.errors ? props.errors[column.id] : ''
    }

    return { ...values, dirty: { ...dirty }, error: { ...error } }
  }

  handleFieldChange = (fieldId, value) => {
    this.setState({ [fieldId]: value, dirty: { ...this.state.dirty, [fieldId]: true } })
  }

  handleRowAdd = () => {
    if (this.validateFields()) {
      this.props.onRowAdd(this.state)
      this.setState({ ...this.resetRow(this.props) })
    } else {
      let dirty = {}
      for (const fieldId of Object.keys(this.state.dirty)) {
        dirty[fieldId] = true
      }
      this.setState({ dirty })
    }
  }

  validateFields = () => {
    for (const column of this.props.columns) {
      const { hasError } = validate(this.state[column.id], column.props.validators, true)
      if (hasError) {
        return false
      }
    }
    return true
  }

  renderRowCells = columns => {
    const { classes, readonly, profile } = this.props

    return columns.map((column, index) => {
      if (column.profile && !column.profile.includes(profile)) {
        return null
      }

      const props = column.props || {}
      props.id = column.id
      props.key = column.id
      props.disabled = readonly || props.disabled
      props.onChange = this.handleFieldChange
      props.value = this.state[column.id]
      props.dirty = this.state.dirty[column.id]
      props.errorText = this.state.error[column.id]

      return (
        <TableCell key={index} className={classes.editableCell}>
          {<column.component {...props} />}
        </TableCell>
      )
    })
  }

  renderRowAction = () => (
    <TableCell className={this.props.classes.actionCell} numeric>
      <IconButton color="inherit" onClick={this.handleRowAdd}><AddIcon /></IconButton>
    </TableCell>
  )

  render = () => (
    <TableRow>
      {this.renderRowCells(this.props.columns)}
      {this.renderRowAction()}
    </TableRow>
  )
}

EditableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  readonly: PropTypes.bool,
  columns: PropTypes.arrayOf(columnType).isRequired,
  onRowAdd: PropTypes.func.isRequired,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

EditableRow.defaultProps = {
  readonly: false,
}

export default withStyles(styles, { withTheme: true })(EditableRow)
