import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { optionsType } from '../../types'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { InputAdornment } from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import validate from '../../validations'

const styles = {
  inputAdornment: {
    alignSelf: 'flex-end',
    height: 32,
    marginLeft: 0,
  },
  inputIcon: {
    height: 32,
    width: 32,
  }
}

class AddableSelect extends React.Component {
  state = {
    open: false,
    value: null,
  }

  handleOpenDialog = () => this.setState({ open: true })

  handleCloseDialog = () => this.setState({ open: false })

  handleSubmit = value => {
    this.setState({ value })
    this.props.dialog.props.onSubmit()
  }

  renderDialog = () => {
    const { dialog } = this.props
    const dialogProps = {
      ...dialog.props,
      onClose: this.handleCloseDialog,
      onSubmit: this.handleSubmit,
    }

    return (
      <dialog.component {...dialogProps} />
    )
  }

  render() {
    const { classes, id, label, icon, value, options, helperText, validators, dirty, focused, disabled, onChange, margin } = this.props
    const { hasError, message } = validate(value, validators, dirty)
    const errorText = hasError ? message : this.props.errorText

    return (
      <React.Fragment>
        <TextField
          id={id}
          select
          fullWidth
          margin={margin}
          autoFocus={focused}
          disabled={disabled}
          label={label}
          InputLabelProps={{ shrink: disabled && value }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={styles.inputAdornment}>
                <IconButton className={classes.inputIcon} onClick={this.handleClick}>
                  {icon}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={value || ''}
          onChange={event => onChange(id, event.target.value)}
          error={!!errorText}
          helperText={errorText ? errorText : helperText}
        >
          {options ? options.map(option => (
            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
          )) :
            [<MenuItem key="empty" value="">NO DATA</MenuItem>]
          }
        </TextField>
        {this.renderDialog()}
      </React.Fragment >
    )
  }
}

AddableSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.element.isRequired,
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
  dialog: PropTypes.shape({
    component: PropTypes.func.isRequired,
    props: PropTypes.object.isRequired,
  })
}

AddableSelect.defaultProps = {
  margin: 'none',
}

export default withStyles(styles)(AddableSelect)
