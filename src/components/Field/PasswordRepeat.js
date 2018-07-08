import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import validate from '../../validations'

const PasswordRepeat = ({ className, id, label, value, refValues, placeholder, helperText, errorText, validators, dirty, focused, disabled, onChange, margin }) => {
  const { hasError, message } = validate(value, validators, dirty, refValues)
  if (hasError) {
    errorText = message
  }

  return (
    <TextField
      className={className}
      id={id}
      type="password"
      fullWidth
      margin={margin}
      autoFocus={focused}
      disabled={disabled}
      label={label}
      InputLabelProps={{ shrink: disabled && placeholder }}
      placeholder={placeholder}
      value={value}
      autoComplete="current-password"
      onChange={event => onChange(id, event.target.value)}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    />
  )
}

PasswordRepeat.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  refValues: PropTypes.object,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  validators: validatorsType,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

PasswordRepeat.defaultProps = {
  margin: 'none'
}

export default PasswordRepeat
