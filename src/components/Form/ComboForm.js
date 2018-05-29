import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { fieldType, columnType } from '../../types'
import Grid from '@material-ui/core/Grid'
import Paper from '../Paper'
import Button from '@material-ui/core/Button'
import validate from '../../validations'
import { ListForm } from '../Form'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  actions: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  }
})

class ComboForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.profile === 'add') {
      this.state = this.initState(props.fields, {}, props.columns, [])
    } else {
      this.state = this.initState(props.fields, props.fieldValues, props.columns, props.columnValues)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fieldValues && nextProps.fieldValues !== this.props.fieldValues) {
      let _value = {}
      for (const field of this.props.fields) {
        _value[field.id] = nextProps.fieldValues[field.id] || (field.default || '')
      }
      this.setState({ ..._value, _dirty: { ...this.state._dirty }, columnValues: nextProps.columnValues })
    }
  }

  initState = (fields, fieldValues, columns, columnValues) => {
    let _value = {}, _dirty = {}

    for (const field of fields) {
      _value[field.id] = (fieldValues && fieldValues[field.id]) || field.default || ''
      _dirty[field.id] = false
    }

    return { ..._value, _dirty, columnValues: columnValues || [] }
  }

  handleFieldChange = onChange => (fieldId, value) => {
    this.setState({ [fieldId]: value })
    if (onChange) {
      const state = onChange(fieldId, value)

      if (state && this.props.onChange) {
        this.props.onChange(state)
      }
    }
  }

  handleRowRemove = row => {
    const columnValues = [...this.state.columnValues]
    const valueToRemove = columnValues.indexOf(row)
    columnValues.splice(valueToRemove, 1)
    this.setState({ columnValues })
  }

  handleRowAdd = (row, onFormSuccess) => {
    if (this.props.onRowAdd) {
      this.props.onRowAdd(row, data => {
        if (onFormSuccess) {
          onFormSuccess(data)
        }
        this.setState({ columnValues: [...this.state.columnValues, data] })
      })
    } else {
      if (onFormSuccess) {
        onFormSuccess(row)
      }
      this.setState({ columnValues: [...this.state.columnValues, row] })
    }
  }

  handleSubmit = action => () => {
    if (this.validateFields()) {
      action.onSubmit(this.state)
      return
    }

    let _dirty = {}
    for (const fieldId of Object.keys(this.state._dirty)) {
      _dirty[fieldId] = true
    }

    this.setState({ _dirty })
  }

  validateFields = () => {
    for (const field of this.props.fields) {
      if (field.profile && !field.profile.includes(this.props.profile)) {
        continue
      }

      const { hasError } = validate(this.state[field.id], field.props.validators, true)
      if (hasError) {
        console.error(field.id, hasError)
        return false
      }
    }
    return true
  }

  renderFields = (fields, fieldValues, errors, readonly, profile) => {
    return (
      <Grid container spacing={24}>
        {fields.map(field => {
          if (field.profile && !field.profile.includes(profile)) {
            return null
          }

          const props = field.props
          props.id = field.id
          props.disabled = (profile === 'show') || field.props.disabled
          props.onChange = this.handleFieldChange(field.props.onChange)
          props.value = this.state[field.id]
          props.dirty = this.state._dirty[field.id]
          props.errorText = errors ? errors[field.id] : ''
          props.margin = 'dense'

          return (
            <Grid key={field.id} item xs={4} sm={4} md={4}>
              <field.component {...props} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  renderList = () => {
    const { columns, profile, emptyLabel, cancelLabel, saveLabel, nestedRow } = this.props
    if (!columns) { return null }

    return (
      <ListForm
        columns={columns}
        values={this.state.columnValues}
        nestedRow={nestedRow}
        onRowAdd={this.handleRowAdd}
        onRowRemove={this.handleRowRemove}
        emptyLabel={emptyLabel}
        cancelLabel={cancelLabel}
        saveLabel={saveLabel}
        profile={profile}
      />
    )
  }

  renderActions = (classes, actions) => (
    <div className={classes.actions}>
      {actions.map((action, index) => (
        <Button
          key={index}
          className={classes.button}
          color={action.color || 'default'}
          onClick={!!action.onSubmit ? this.handleSubmit(action) : action.onClick}
          variant="raised"
        >
          {action.label}
        </Button>
      ))}
    </div>
  )

  render() {
    const { fields, fieldValues, errors, actions, readonly, profile, classes, border } = this.props

    return (
      <form>
        <Paper classes={{ root: classes.content }} border={border} elevation={0}>
          {this.renderFields(fields, fieldValues, errors, readonly, profile)}
        </Paper>

        {this.renderList()}
        {(profile !== 'show') && this.renderActions(classes, actions)}
      </form>
    )
  }
}

ComboForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(fieldType).isRequired,
  fieldValues: PropTypes.object,
  columns: PropTypes.arrayOf(columnType),
  columnValues: PropTypes.array,
  nestedRow: PropTypes.string,
  onRowAdd: PropTypes.func,
  errors: PropTypes.object,
  readonly: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.oneOf(['default', 'primary', 'secondary']),
      onClick: PropTypes.func,
      onSubmit: PropTypes.func,
    })
  ),
  onChange: PropTypes.func,
  border: PropTypes.bool,
  emptyLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  saveLabel: PropTypes.string,
}

ComboForm.defaultProps = {
  border: true,
}

export default withStyles(styles, { withTheme: true })(ComboForm)
