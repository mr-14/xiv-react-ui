import React from 'react'
import PropTypes from 'prop-types'
import { optionsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import validate from '../../validations'

const Select = ({ id, label, value, options, helperText, errorText, validators, dirty, focused, disabled, onChange, margin }) => {
  const { hasError, message } = validate(value, validators, dirty)
  if (hasError) {
    errorText = message
  }
  
  return (
    <TextField
      id={id}
      select
      fullWidth
      margin={margin}
      autoFocus={focused}
      disabled={disabled}
      label={label}
      InputLabelProps={{ shrink: disabled || !!value }}
      value={value || ''}
      onChange={event => onChange(id, event.target.value)}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    >
      {(options && options.length > 0) ? options.map(option => (
        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
      )) :
        [<MenuItem key="empty" value="">NO DATA</MenuItem>]
      }
    </TextField>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: optionsType,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  validators: PropTypes.arrayOf(PropTypes.object),
  dirty: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

Select.defaultProps = {
  margin: 'none'
}

export default Select
