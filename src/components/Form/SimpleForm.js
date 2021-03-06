import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { fieldType } from '../../types'
import Paper from '../Paper'
import Button from '@material-ui/core/Button'
import validate from '../../validations'

const styles = theme => ({
  root: {},
  content: {
    padding: theme.spacing.unit * 3,
  },
  actions: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  button: {
    // margin: theme.spacing.unit,
  }
})

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initState(props.fields, props.values, props.errors)
  }

  // static getDerivedStateFromProps(props, state) {
  //   let _value = {}
  //   console.log(props)
  //   for (const field of props.fields) {
  //     if (!field.id) {
  //       continue
  //     }
  //     _value[field.id] = (props.values && props.values[field.id]) || field.default || ''
  //   }
  //   return { ..._value, _dirty: { ...state._dirty } }
  // }

  initState = (fields, values, errors) => {
    let _value = {}, _dirty = {}

    for (const field of fields) {
      if (!field.id) {
        continue
      }
      _value[field.id] = (values && values[field.id]) || field.default || ''
      _dirty[field.id] = false
    }

    return { ..._value, _dirty, _error: errors }
  }

  handleFieldChange = (fieldId, value) => {
    const _dirty = { ...this.state._dirty[fieldId], [fieldId]: true } 
    this.setState({ [fieldId]: value, _dirty })
  }

  handleSubmit = action => () => {
    if (this.validateFields()) {
      action.onSubmit(this.state).then(err => {
        if (err) {
          this.setState({ errors: err })
        }
      })
    } else {
      let _dirty = {}

      for (const fieldId of Object.keys(this.state._dirty)) {
        _dirty[fieldId] = true
      }

      this.setState({ _dirty })
    }
  }

  validateFields = () => {
    for (const field of this.props.fields) {
      if (field.profile && !field.profile.includes(this.props.profile)) {
        continue
      }

      const refFields = this.getRefFields(field)
      const { hasError } = validate(this.state[field.id], field.props.validators, true, refFields)
      if (hasError) {
        return false
      }
    }
    return true
  }

  getRefFields = (field) => {
    if (!field.props.refFields) { return null }

    return field.props.refFields.reduce((list, item) => {
      list[item] = this.state[item]
      return list
    }, {})
  }

  renderFields = (fields, readonly, profile) => {
    return fields.map(field => {
      if (field.profile && !field.profile.includes(profile)) {
        return null
      }

      if (!field.id) {
        return null
      }

      const props = field.props
      props.id = field.id
      props.disabled = readonly || props.disabled
      props.onChange = this.handleFieldChange
      props.value = this.state[field.id]
      props.refValues = this.getRefFields(field)
      props.dirty = this.state._dirty[field.id]
      props.errorText = this.state._error ? this.state._error[field.id] : ''
      props.margin = 'dense'

      return <field.component key={field.id} {...props} />
    })
  }

  renderForm = (classes, fields, actions, readonly, profile) => {
    return (
      <form>
        <div className={classes.content}>
          {this.renderFields(fields, readonly, profile)}
        </div>
        <div className={classes.actions}>
          {actions && actions.map((action, index) => (
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
      </form>
    )
  }

  render() {
    const { fields, actions, readonly, profile, classes, border } = this.props

    return (
      <Paper className={classes.content} border={border}>
        {this.renderForm(classes, fields, actions, readonly, profile)}
      </Paper>
    )
  }
}

SimpleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(fieldType).isRequired,
  values: PropTypes.object,
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
  border: PropTypes.bool,
}

SimpleForm.defaultProps = {
  border: false,
}

export default withStyles(styles, { withTheme: true })(SimpleForm)
