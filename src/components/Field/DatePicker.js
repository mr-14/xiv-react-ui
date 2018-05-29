import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const DatePicker = ({ id, label, value, placeholder, error, focused, disabled, onChange, margin }) => (
  <TextField
    id={id}
    type='date'
    fullWidth
    margin={margin}
    autoFocus={focused}
    disabled={disabled}
    label={label}
    InputLabelProps={{ shrink: true }}
    placeholder={placeholder}
    value={value}
    onChange={event => onChange(id, event.target.value)}
    error={!!error}
    helperText={error}
  />
)

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

DatePicker.defaultProps = {
  margin: 'none'
}

export default DatePicker
