import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { validatorsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import validate from '../../validations'

const styles = {
  inputAdornment: {
    alignSelf: 'flex-end',
    height: 32,
  },
  inputIcon: {
    height: 32,
    width: 32,
  }
}

class ComboText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  handleClick = event => {
    const value = this.state.value.trim()
    if (!value) {
      return
    }
    this.props.onClick(value)
  }

  handleChange = event => {
    const value = event.target.value
    this.props.onChange(this.props.id, value)
    this.setState({ value })
  }

  render() {
    const { classes, id, label, icon, value, placeholder, helperText, validators, dirty, disabled, margin, onBlur } = this.props
    const { hasError, message } = validate(value, validators, dirty)
    let errorText = this.props.errorText
    if (hasError) {
      errorText = message
    }

    return (
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        fullWidth
        margin={margin}
        InputLabelProps={{ shrink: disabled && placeholder }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={styles.inputAdornment}>
              <IconButton className={classes.inputIcon} onClick={this.handleClick}>
                {icon}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={this.handleChange}
        onBlur={onBlur}
        error={!!errorText}
        helperText={errorText ? errorText : helperText}
        disabled={disabled}
      />
    )
  }
}

ComboText.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.element.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  validators: validatorsType,
  dirty: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

export default withStyles(styles)(ComboText)
