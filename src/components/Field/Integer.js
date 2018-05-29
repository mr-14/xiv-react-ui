import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import validate from '../../validations'

const Integer = ({ id, label, value, placeholder, helperText, errorText, validators, dirty, focused, disabled, onChange, margin }) => {
  if (!value) {
    value = 0
  }
  
  const { hasError, message } = validate(value, validators, dirty)
  if (hasError) {
    errorText = message
  }
  
  return (
    <TextField
      id={id}
      type='number'
      fullWidth
      margin={margin}
      autoFocus={focused}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={event => {
        let val = event.target.value
        val = (!val || isNaN(val)) ? 0 : parseInt(val, 10)
        return onChange(id, val)
      }}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    />
  )
}

Integer.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  dirty: PropTypes.bool,
  validators: validatorsType,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

Integer.defaultProps = {
  margin: 'none'
}

export default Integer
