import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import validate from '../../validations'

const Password = ({ className, id, label, value, placeholder, helperText, errorText, validators, dirty, focused, disabled, onChange, margin}) => {
  const { hasError, message } = validate(value, validators, dirty)
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

Password.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  validators: validatorsType,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

Password.defaultProps = {
  margin: 'none'
}

export default Password