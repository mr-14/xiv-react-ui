import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import validate from '../../validations'

function Text({ className, id, label, value, placeholder, helperText, errorText, validators, dirty, multiline, focused, disabled, onChange, margin }) {
  const { hasError, message } = validate(value, validators, dirty)
  if (hasError) {
    errorText = message
  }
  
  return (
    <TextField
      className={className}
      id={id}
      fullWidth
      margin={margin}
      multiline={multiline}
      autoFocus={focused}
      disabled={disabled}
      label={label}
      InputLabelProps={{ shrink: disabled || !!placeholder || !!value }}
      placeholder={placeholder}
      value={value}
      onChange={event => onChange(id, event.target.value)}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    />
  )
}

Text.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  validators: validatorsType,
  dirty: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

Text.defaultProps = {
  margin: 'none'
}

export default Text
